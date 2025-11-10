import Image from "next/image";
import Link from "next/link";
import { AddEditMealDialog } from "../Restaurant/AddEditMealDialog";

export default function Navbar() {
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

        <AddEditMealDialog />
      </div>
    </header>
  );
}
