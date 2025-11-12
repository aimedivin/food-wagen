import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddEditMealForm } from "../AddEditMealForm";
import Providers from "@/app/providers";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

// Mock the meal actions
jest.mock("@/store/actions/mealAction", () => ({
  addNewMeal: jest.fn(),
  updateMeal: jest.fn(),
  fetchMeals: jest.fn(),
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/store/actions/mealAction", () => {
  const mockFetchMeals = Object.assign(jest.fn(), {
    pending: "fetch/meals/pending",
    fulfilled: "fetch/meals/fulfilled",
    rejected: "fetch/meals/rejected",
  });

  return {
    addNewMeal: mockFetchMeals,
    updateMeal: mockFetchMeals,
    deleteMeal: mockFetchMeals,
    fetchMeals: mockFetchMeals,
  };
});

describe("AddEditMealForm User Interaction", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with all input fields", () => {
    render(
      <Providers>
        <Dialog open>
          <AddEditMealForm />
        </Dialog>
      </Providers>
    );

    expect(screen.getByLabelText(/food name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/food rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/food price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/food image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/restaurant name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/restaurant logo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/restaurant status/i)).toBeInTheDocument();
  });

  it("allows user to fill in form fields", async () => {
    render(
      <Providers>
        <Dialog open>
          <AddEditMealForm />
        </Dialog>
      </Providers>
    );

    const foodNameInput = screen.getByLabelText(/food name/i);
    const foodRatingInput = screen.getByLabelText(/food rating/i);
    const foodPriceInput = screen.getByLabelText(/food price/i);
    const restaurantNameInput = screen.getByLabelText(/restaurant name/i);

    await user.type(foodNameInput, "Test Ramen");
    await user.type(foodRatingInput, "4");
    await user.type(foodPriceInput, "12.99");
    await user.type(restaurantNameInput, "Test Restaurant");

    expect(foodNameInput).toHaveValue("Test Ramen");
    expect(foodRatingInput).toHaveValue(4);
    expect(foodPriceInput).toHaveValue(12.99);
    expect(restaurantNameInput).toHaveValue("Test Restaurant");
  });

  it("submits form with valid data", async () => {
    await act(async () => {
      render(
        <Providers>
          <Dialog open>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Test Add/Ediit</DialogTitle>
                <DialogDescription>Test Description</DialogDescription>
              </DialogHeader>
              <AddEditMealForm />
            </DialogContent>
          </Dialog>
        </Providers>
      );
    });

    // Fill in the form
    await user.type(screen.getByLabelText(/food name/i), "New Ramen Bowl");

    fireEvent.change(screen.getByLabelText(/food rating/i), {
      target: { value: 4 },
    });
    fireEvent.change(screen.getByLabelText(/food price/i), {
      target: { value: 4 },
    });
    await user.type(
      screen.getByLabelText(/food image/i),
      "https://example.com/image.jpg"
    );
    await user.type(screen.getByLabelText(/restaurant name/i), "Ramen House");
    await user.type(
      screen.getByLabelText(/restaurant logo/i),
      "https://example.com/logo.jpg"
    );

    // Submit the form
    const submitButton = screen.getByTestId("food-add_update-btn");
    await user.click(submitButton);
  });

  it("shows validation errors for invalid input", async () => {
    render(
      <Providers>
        <Dialog open>
          <AddEditMealForm />
        </Dialog>
      </Providers>
    );

    // Clear field with default values
    await user.clear(screen.getByLabelText(/food rating/i));
    await user.clear(screen.getByLabelText(/food price/i));

    // Try to submit empty form
    const submitButton = screen.getByTestId("food-add_update-btn");
    await user.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      // Form validation should prevent submission
      expect(screen.getByLabelText(/food name/i)).toBeInvalid();
    });
  });
});
