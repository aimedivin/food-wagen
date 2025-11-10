"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { DeleteMealDialog } from "./DeleteMealDialog";
import { useState } from "react";
import { AddEditMealDialog } from "./AddEditMealDialog";

export function MealManagementMenu() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="o" asChild>
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            className="w-fit h-fit rounded py-1 mr-0.5"
          >
            <HiDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-20 w-25 rounded -mt-1">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="rounded cursor-pointer outline-none hover:bg-muted px-3 py-1"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteOpen(true)}
              className="rounded cursor-pointer outline-none hover:bg-muted px-3 py-1 text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className=" absolute">
        <AddEditMealDialog
          mode="edit"
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        />
        <DeleteMealDialog isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} />
      </div>
    </>
  );
}
