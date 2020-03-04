import React from "react";
import Section from "../sections/Section";
import ErrorNoData from "../errors/ErrorNoData";

const NotFound = () => {
  return (
    <Section size="full" title="Error">
      <ErrorNoData message="The page you're looking for does not exist" />
    </Section>
  );
};

export default NotFound;
