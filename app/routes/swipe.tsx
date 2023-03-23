import SwipeCard from "~/shared/components/SwipeCard.client";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};

export default function Swipe() {
  return typeof document !== "undefined" ? <SwipeCard /> : <Fallback />;
}
