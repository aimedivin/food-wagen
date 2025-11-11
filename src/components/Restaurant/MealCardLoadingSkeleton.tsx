import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MealCardLoadingSkeleton = () => {
  return (
    <div className="flex max-w-80 h-65 md:h-70 size-full flex-col space-y-3">
      <div className="flex-1 h-65 md:h-70">
        <Skeleton
          baseColor="#e6e6e6"
          highlightColor="#fdfdfd"
          containerClassName="h-full w-full "
          width="100%"
          height="100%"
          className="h-full"
        />
      </div>
      <div className="flex gap-4">
        <div>
          <Skeleton
            baseColor="#e6e6e6"
            highlightColor="#fdfdfd"
            containerClassName="h-full w-full "
            circle
            width={55}
            height={55}
          />
        </div>
        <div className="flex-1">
          <Skeleton
            baseColor="#e6e6e6"
            highlightColor="#fdfdfd"
            containerClassName="h-full w-full "
            width="100%"
            height={30}
          />
          <Skeleton
            baseColor="#e6e6e6"
            highlightColor="#fdfdfd"
            containerClassName="h-full w-full "
            width="100%"
            height={15}
          />
        </div>
      </div>
      <div>
        <Skeleton
          baseColor="#e6e6e6"
          highlightColor="#fdfdfd"
          width="100%"
          height={30}
        />
      </div>
    </div>
  );
};

export default MealCardLoadingSkeleton;
