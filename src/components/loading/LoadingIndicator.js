import React from "react";

const LoadingIndicator = ({ lightMode, fullHeight }) => {
  const getLoaderClasses = () => {
    let classes = ["lds-dual-ring"];

    if (lightMode) {
      classes.push("lds-dual-ring--light");
    }

    return classes.join(" ");
  };

  const getContainerClasses = () => {
    let classes = ["lds-container"];

    if (fullHeight) {
      classes.push("full-height");
    }

    return classes.join(" ");
  };

  return (
    <div className={getContainerClasses()}>
      <div className={getLoaderClasses()} />
    </div>
  );
};

export default LoadingIndicator;
