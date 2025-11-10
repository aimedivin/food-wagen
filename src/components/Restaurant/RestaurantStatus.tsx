const RestaurantStatus = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`${
        open ? "text-green-600 bg-green-600/20" : " bg-primary/20 text-primary"
      } text-sm font-bold w-fit px-3 h-7 flex items-center rounded-md`}
    >
      {open ? "Open" : "Closed"}
    </div>
  );
};

export default RestaurantStatus;
