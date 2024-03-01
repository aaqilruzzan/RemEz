import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
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
  // A simple function to determine the grade based on the mark
  const getGrade = (mark) => {
    if (mark >= 90) return "A";
    if (mark >= 80) return "B";
    if (mark >= 70) return "C";
    if (mark >= 60) return "D";
    return "F";
  };

  //  a plugin to draw the text on the chart
  const gradePlugin = {
    id: "gradePlugin",
    afterDatasetDraw: (chart, args) => {
      const { ctx, data } = chart;
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.textBaseline = "bottom";
      data.datasets.forEach((dataset, i) => {
        dataset.data.forEach((value, j) => {
          const grade = getGrade(value);
          const model = chart.getDatasetMeta(i).data[j];
          ctx.fillText(grade, model.x, model.y - 5);
        });
      });
    },
  };

  // Adding the plugin to Chart's global plugins
  Chart.register(gradePlugin);

  return (
    <>
      <div class="mt-12 ml-10">
        <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Rounds Completed
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                3/5
              </h4>
            </div>
            <div class="border-t border-blue-gray-50 p-4">
              <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                <strong class="text-green-500">60%</strong>&nbsp;completion rate
              </p>
            </div>
          </div>
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Average answer time per question
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                23m 45s
              </h4>
            </div>
            <div class="border-t border-blue-gray-50 p-4">
              <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong class="text-green-500">+3%</strong>&nbsp;than the
                previous round
              </p>
            </div>
          </div>

          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-6 h-6 text-white"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
              </svg>
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                New Achievements
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                2
              </h4>
            </div>
            <div class="border-t border-blue-gray-50 p-4">
              <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong class="text-green-500">+5%</strong>&nbsp;than the
                previous round
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="marksChart">
        <div style={chartContainerStyle}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default AllProgress;
