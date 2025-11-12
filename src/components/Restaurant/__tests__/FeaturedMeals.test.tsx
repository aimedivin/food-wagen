import {
  act, render,
  screen,
  waitFor
} from "@testing-library/react";
import FeaturedMeals from "../FeaturedMeals";

import { IMeal } from "@/types";
import api from "@/lib/axios";
import Providers from "@/app/providers";
import { store } from "@/store";
import { resetMeals } from "@/store/slices/mealsSlice";
import userEvent from "@testing-library/user-event";

// Mock meals data
const mockMeals: IMeal[] = [
  {
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
  },
  {
    id: "2",
    name: "Spicy Tofu Bowl",
    price: "12.50",
    rating: 4.2,
    image: "https://example.com/tofu.jpg",
    logo: "https://example.com/logo2.png",
    restaurantName: "Vegan Delight",
    open: false,
    avatar: "https://example.com/tofu.jpg",
    createdAt: new Date("2024-01-02"),
  },
];

// Mock api.get
jest.mock("@/lib/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("FeaturedMeals API Mocking", () => {
  const user = userEvent.setup();
  afterEach(() => {
    jest.clearAllMocks();
    act(() => {
      store.dispatch(resetMeals());
    });
  });

  it("displays 'No items available' when API returns empty array", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    // Wrap render in act to prevent warnings
    await act(async () => {
      render(
        <Providers>
          <FeaturedMeals />
        </Providers>
      );
    });

    const noItemsMessage = await screen.findByText(/no items available/i);
    expect(noItemsMessage).toBeInTheDocument();
  });

  it("fetches and displays meals", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockMeals });

    // Wrap render in act to prevent warnings
    await act(async () => {
      render(
        <Providers>
          <FeaturedMeals />
        </Providers>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Delicious Ramen Bowl")).toBeInTheDocument();
    });

    const menuBtn = screen.getAllByTestId("food-card-menu-btn");

    await user.click(menuBtn[1]);
    await user.click(screen.getByTestId("food-card-delete-btn"));
  });
});
