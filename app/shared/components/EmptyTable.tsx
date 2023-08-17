import TextButton from "./TextButton";

export default function EmptyTable() {
  // /auth/spotify redirects to /swipe and thus calls swipe loader again
  return (
    <div className="empty-table-message">
      <p>i guess you didn't like any of those huh (◡︵◡)</p>
      <TextButton text="swipe on new artists" route="/auth/spotify" />
    </div>
  );
}
