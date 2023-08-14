import { Outlet } from "@remix-run/react";
import CustomButton from "~/shared/components/CustomButton";

export default function Match() {
  return (
    <div className="full-page match-page my-col start-center-align">
      <div className="full-width-div match-option-container my-row center-align">
        <CustomButton
          buttonClass="match-button"
          colorClass="pink-button"
          text="artists"
          isSubmit={false}
          route="/match/artist"
        />
        <CustomButton
          buttonClass="match-button"
          colorClass="pink-button"
          text="tracks"
          isSubmit={false}
          route="/match/track"
        />
      </div>
      <Outlet />
    </div>
  );
}
