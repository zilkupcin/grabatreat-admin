import React from "react";
import { VectorMap } from "react-jvectormap";
import LoadingIndicator from "../loading/LoadingIndicator";

const CountryMap = ({ data, isLoading }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <VectorMap
      map={"world_mill"}
      backgroundColor="#ffffff"
      containerClassName="map"
      series={{
        regions: [
          {
            values: data,
            scale: ["#ffe6e5", "#ff7675"],
            normalizeFunction: "polynomial"
          }
        ]
      }}
      regionStyle={{
        initial: {
          fill: "#ffffff",
          stroke: "#e0e6ed",
          "stroke-width": 1,
          "stroke-opacity": 1
        },
        hover: {
          fill: "#e0e6ed"
        }
      }}
    />
  );
};

export default CountryMap;
