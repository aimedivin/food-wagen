"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useMutateMeal } from "@/context/MutateMealContext";

export default function Navbar() {
  const { setIsDialogOpen, setMode } = useMutateMeal();
  return (
    <header className="w-full sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="food-wagen-logo"
            width={140}
            height={40}
          />
        </Link>

        <Button
          onClick={() => {
            setMode("add");
            setIsDialogOpen(true);
          }}
          className="food-btn-primary "
        >
          Add Meal
        </Button>
      </div>
    </header>
  );
}
