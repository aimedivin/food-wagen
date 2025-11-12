import { act, fireEvent, render, screen } from "@testing-library/react";
import MealCard from "../MealCard";
import { IMeal } from "@/types";
import Providers from "@/app/providers";
import userEvent from "@testing-library/user-event";

// Mock the image validation function
jest.mock("@/lib/image", () => ({
  isImageUrl: jest.fn().mockResolvedValue(true),
}));

describe.only("MealCard Component Rendering", () => {
  const mockMeal: IMeal = {
    id: "1",
    name: "Delicious Ramen Bowl",
    price: "15.99",
    rating: 4.5,
    image: "https://example.com/ramen.jpg",
    logo: "https://example.com/logo.png",
    restaurantName: "Ramen House",
    open: true,
    avatar: "https://example.com/ramen.jpg",
    createdAt: new Date("2024-01-01"),
  };

  const user = userEvent.setup();

  it("renders meal card with all expected props", async () => {
    await act(async () => {
      render(
        <Providers>
          <MealCard meal={mockMeal} />
        </Providers>
      );
    });

    // Verify food name is displayed
    expect(screen.getByText("Delicious Ramen Bowl")).toBeInTheDocument();

    // Verify price is displayed
    expect(screen.getByText("$15.99")).toBeInTheDocument();

    // Verify rating is displayed
    expect(screen.getByText("4.5")).toBeInTheDocument();

    // We can verify the images alt text contains the restaurant name and meal name
    const images = screen.getAllByTestId("food-card-img");
    expect(images).toHaveLength(2);
  });

  it("renders meal card with edit and delete button", async () => {
    await act(async () => {
      render(
        <Providers>
          <MealCard meal={mockMeal} />
        </Providers>
      );
    });

    await user.click(screen.getByTestId("food-card-menu-btn"));

    fireEvent.click(screen.getByTestId("food-card-delete-btn"));

    const images = screen.getAllByTestId("food-card-img");
    expect(images).toHaveLength(2);
  });

  it("renders meal card with price from alternative field like Price staring with capital letter", async () => {
    const mealWithAltPrice = {
      ...mockMeal,
      price: undefined,
      Price: "12.50",
    };

    await act(async () => {
      render(
        <Providers>
          <MealCard meal={mealWithAltPrice as unknown as IMeal} />
        </Providers>
      );
    });

    // Should display price from alternative field
    expect(screen.getByText("$12.50")).toBeInTheDocument();
  });

  it("displays restaurant status correctly", async () => {
    const { rerender } = render(
      <Providers>
        <MealCard meal={mockMeal} />
      </Providers>
    );

    // Check for open status (capitalized "Open")
    expect(screen.getByText("Open")).toBeInTheDocument();

    // Test with closed restaurant
    const closedMeal: IMeal = {
      ...mockMeal,
      open: false,
    };
    await act(async () => {
      rerender(
        <Providers>
          <MealCard meal={closedMeal} />
        </Providers>
      );
    });

    // Check for closed status (capitalized "Closed")
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });
});
