import React from "react";
import { Line } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import LoadingIndicator from "../loading/LoadingIndicator";

defaults.global.defaultFontFamily = "Poppins";

const LineChart = ({ label, labels, data, isLoading }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: "#ffe6e5",
        borderColor: "#ff7675",
        pointBackgroundColor: "#ff7675",
        borderWidth: 1
      }
    ]
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Line
      data={chartData}
      options={{
        legend: {
          display: true,
          position: "bottom"
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }}
    />
  );
};

export default LineChart;
