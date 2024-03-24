import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useLoading } from "../Context/LoadingContext";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllProgress = () => {
  const [topics, setTopics] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [loaded, setLoaded] = useState(false);
  const [averageSimilarityScores, setAverageSimilarityScores] = useState([]);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [totalAnswerCount, setTotalAnswerCount] = useState(0);
  const [totalActiveTime, setTotalActiveTime] = useState(0);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchAllProgressData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/getallprogressdata`);
        setTopics(response.data.names);
        setAverageSimilarityScores(response.data.averageSimilarityScores);
        setCompletedRounds(response.data.completedRounds);
        setTotalAnswerCount(response.data.noOfAnswers);
        setTotalActiveTime(response.data.totalActiveTime);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchAllProgressData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalrounds = topics.length;

  const completionRate = (completedRounds / totalrounds) * 100;

  const completionTailwindClass =
    completionRate > 50 ? "text-green-500" : "text-red-500";

  const averageAnswerTimeSeconds = totalActiveTime / totalAnswerCount;
  // Converting average time into minutes and seconds
  const minutes = Math.floor(averageAnswerTimeSeconds / 60);
  const seconds = Math.round(averageAnswerTimeSeconds % 60);
  // Formatting the result as a string "minutes:seconds"
  const formattedAverageTime = `${minutes}m ${seconds}s`;

  const averageTimePerRoundSeconds = totalActiveTime / totalrounds;
  // Converting average time per round into minutes and seconds
  const minutesPerRound = Math.floor(averageTimePerRoundSeconds / 60);
  const secondsPerRound = Math.round(averageTimePerRoundSeconds % 60);
  // Formatting the result as a string "Xm Ys"
  const formattedAverageTimePerRound = `${minutesPerRound}m ${secondsPerRound}s`;

  // Static data for the bar chart
  const data = {
    labels: topics,
    datasets: [
      {
        label: "Marks",
        data: averageSimilarityScores,
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
        beginAtZero: true, // Ensuring that the y-axis starts at 0
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
    if (mark >= 75) return "A";
    if (mark >= 65) return "B";
    if (mark >= 50) return "C";
    return "D";
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
      <div class="mt-12 ml-3">
        <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <img src="book.png" alt="book" />
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Rounds Completed
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {`${completedRounds}/${totalrounds}`}
              </h4>
            </div>
            <div class="border-t border-blue-gray-50 p-4">
              <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                <strong
                  class={completionTailwindClass}
                >{`${completionRate} %`}</strong>
                &nbsp;completion rate
              </p>
            </div>
          </div>
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <img src="time.png" alt="time" />
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Average answer time per <br></br>question
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {formattedAverageTime}
              </h4>
            </div>
            <div class="border-t border-blue-gray-50 p-4">
              <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                Total answers provided: <strong>{totalAnswerCount}</strong>
              </p>
            </div>
          </div>
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <img src="time2.png" alt="time2" />
            </div>
            <div class="p-4 text-right">
              <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Average Time Per Round
              </p>
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {formattedAverageTimePerRound}
              </h4>
            </div>
            <div class="border-t border-blue-gray-50 p-4">
              <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-center">
                Total Rounds: <strong>{totalrounds}</strong>
              </p>
            </div>
          </div>

          <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div class="bg-clip-border mx-4 rounded-xl overflow-hidden shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <img src="trophy.png" alt="trophy" />
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
