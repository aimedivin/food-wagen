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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSelectedMeal } from "@/store/slices/mealMutationSlice";
import { IMeal } from "@/types";
import { useMutateMeal } from "@/context/MutateMealContext";

export function MealMutationMenu({ meal }: { meal: IMeal }) {
  const { setMode, setIsDialogOpen } = useMutateMeal();

  const dispatch = useAppDispatch();

  const handleMutationAction = () => {
    dispatch(setSelectedMeal(meal));
    setIsDialogOpen(true);
  };

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
              onClick={() => {
                setMode("edit");
                handleMutationAction();
              }}
              className="rounded cursor-pointer outline-none hover:bg-muted px-3 py-1"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setMode("delete");
                handleMutationAction();
              }}
              className="rounded cursor-pointer outline-none hover:bg-muted px-3 py-1 text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
