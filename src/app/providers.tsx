"use client";

import { MutateMealProvider } from "@/context/MutateMealContext";
import { ReduxProvider } from "@/store/ReduxProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <MutateMealProvider>{children}</MutateMealProvider>
    </ReduxProvider>
  );
}
