import { Button } from "../ui/button";
import MealCard from "./MealCard";

const meals = [
  {
    id: "1",
    title: "Beef Lasagna",
    price: "22.99",
    rating: "2.9",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
    open: false,
  },
  {
    id: "2",
    title: "Mixed Avocado Sandwich",
    price: "9.59",
    img: "https://images.unsplash.com/photo-1617093727343-374698b1b08f?q=80&w=1200&auto=format&fit=crop",
    open: false,
  },
  {
    id: "3",
    title: "Pancake",
    price: "3.99",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
    open: true,
  },
  {
    id: "4",
    title: "Cupcake",
    price: "1.99",
    img: "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop",
    open: true,
  },
  {
    id: "5",
    title: "Creamy Stake",
    price: "12.29",
    img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Steak with Potatoes",
    price: "13.59",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    tag: "AFC",
  },
  {
    id: "7",
    title: "Indian Spicy Soup",
    price: "2.90",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    open: false,
  },
  {
    id: "8",
    title: "Stake Omelet",
    price: "11.29",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop",
    open: true,
  },
];

export default function FeaturedMeals() {
  return (
    <section className="w-full px-[5%]">
      <div className="mx-auto max-w-6xl  py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center">
          Featured Meals
        </h2>
        <div className="mt-8 grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15 md:gap-y-12 gap-x-5">
          {meals.map((m) => (
            <MealCard key={m.id} meal={m as any} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button className="food-btn-primary px-5 py-2 text-sm">
            Load more
          </Button>
        </div>
      </div>
    </section>
  );
}
