import React from "react";
import ExistingSessionsSection from "./ExistingSessionsSection";
import NewSessionSection from "./NewSessionSection";

export default function HomeDashboard() {
  return (
    <div>
      <NewSessionSection />
      <ExistingSessionsSection />
    </div>
  );
}
