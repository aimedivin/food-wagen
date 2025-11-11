import { FaTag } from "react-icons/fa";

const MealPriceTag = ({
  currency = "$",
  value,
  className,
}: {
  currency?: string;
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={`h-8 flex items-center gap-1 bg-primary text-primary-foreground rounded-sm px-3 ${className}`}
    >
      <FaTag className="size-3.5" />
      <span className="text-base font-bold">
        {currency}
        {value}
      </span>
    </div>
  );
};

export default MealPriceTag;
