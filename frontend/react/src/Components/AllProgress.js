import React from "react";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllProgress = () => {
  // Static data for the bar chart
  const data = {
    labels: ["History", "Economics", "Medicine", "Maths", "Science"],
    datasets: [
      {
        label: "Marks",
        data: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
        ], // Random marks for each subject
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        categoryPercentage: 0.1, // Determines the percentage of the available width each category should be within the sample width.
      },
      y: {
        beginAtZero: true, // Ensures that the y-axis starts at 0
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  const chartContainerStyle = {
    position: "relative",
    height: "80vh",
    width: "60vw",
    margin: "20px auto 0",
  };

  // Render the component
  return (
    <div className="marksChart">
      <div style={chartContainerStyle}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AllProgress;
