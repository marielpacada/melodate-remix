import SwipeCard from "~/shared/components/SwipeCard.client";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};

export default function Swipe() {
  return (
    <div className="full-page my-col center-align even-space-align">
      {typeof document !== "undefined" ? <SwipeCard /> : <Fallback />}
    </div>
  );
}
