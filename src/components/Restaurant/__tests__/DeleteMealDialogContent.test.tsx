import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Providers from "@/app/providers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteMealDialogContent } from "../DeleteMealDialogContent";

describe("Delete Meal Dialog Content", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal", () => {
    render(
      <Providers>
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Meal</DialogTitle>
              <DialogDescription>Test Description</DialogDescription>
            </DialogHeader>
            <DeleteMealDialogContent />
          </DialogContent>
        </Dialog>
      </Providers>
    );

    expect(screen.getByTestId("food-delete-btn")).toBeInTheDocument();
  });
});
