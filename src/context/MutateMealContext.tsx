"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MutateMealContextType = {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  mode: "add" | "edit" | "delete" | undefined;
  setMode: (open: "add" | "edit" | "delete" | undefined) => void;
};

const MutateMealContext = createContext<MutateMealContextType | undefined>(
  undefined
);

export const MutateMealProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit" | "delete" | undefined>(
    undefined
  );

  return (
    <MutateMealContext.Provider
      value={{ isDialogOpen, setIsDialogOpen, mode, setMode }}
    >
      {children}
    </MutateMealContext.Provider>
  );
};

export const useMutateMeal = () => {
  const context = useContext(MutateMealContext);
  if (!context)
    throw new Error("useMutateMeal must be used within a UIProvider");
  return context;
};
