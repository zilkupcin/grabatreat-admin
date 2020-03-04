import React from "react";

const Section = ({
  title,
  size,
  children,
  additionalClasses,
  contentClass,
  pageAction
}) => {
  const getSectionClasses = () => {
    let classes = [];

    if (size === "full") {
      classes.push("section section--full-width");
    } else if (size === "half") {
      classes.push("section section--half");
    } else if (size === "third") {
      classes.push("section section--third");
    } else {
      classes.push("section section--full-width");
    }

    if (additionalClasses) {
      classes = [...classes, ...additionalClasses];
    }

    return classes.join(" ");
  };

  const getContentClasses = () => {
    if (contentClass) {
      return `section__content ${contentClass}`;
    } else {
      return "section__content";
    }
  };

  return (
    <div className={getSectionClasses()}>
      <div className="section__container">
        <div className="section__header">
          <h3 className="section__title">{title}</h3>
          {pageAction && pageAction()}
        </div>
        <div className={getContentClasses()}>{children}</div>
      </div>
    </div>
  );
};

export default Section;
