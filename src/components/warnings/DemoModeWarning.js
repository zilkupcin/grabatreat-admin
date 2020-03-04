import React from "react";
import Section from "../sections/Section";

const DemoModeWarning = () => {
  return (
    // <Section size="full" title="Demo mode">
    <div className="warning">
      <p className="warning__demo">
        <span>Demo mode! </span>
        Authentication is disabled in demo mode. All data in this website is
        read-only and random.
      </p>
    </div>
    // </Section>
  );
};

export default DemoModeWarning;
