import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
      <Image
        src="/Logo.png"
        alt="Food Wagen Logo"
        width={200}
        height={200}
        priority
      />
      <Button className="food-btn-primary">Add Food</Button>
      <Button className="food-btn-find">Find Meal</Button>
      <p className="font-">test</p>
    </div>
  );
}
