import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

export function DeleteMealDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-135 px-[5%] py-[6%] md:py-[3%]"
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">
              Delete Meal
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="grid gap-5 text-muted-foreground">
            <p>
              Are you sure you want to delete this meal? Actions cannot be
              reversed.
            </p>
          </div>
          <DialogFooter className="mt-3">
            <Button
              type="submit"
              className="flex-1 food-btn-primary text-base! h-10.5!"
            >
              Yes
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-primary text-base! h-10.5! hover:bg-primary/10!"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
