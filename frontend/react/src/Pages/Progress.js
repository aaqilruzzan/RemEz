import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import QuestionProgress from "../Components/questionProgress";

export default function progressTracker() {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="relative w-full lg:max-w-sm m-4">
          <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option>History</option>
            <option>Economics</option>
            <option>Medicine</option>
            <option selected disabled>
              Select topic to view progress
            </option>
          </select>
        </div>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Progress
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-wrap">
        <div className="w-32 my-7">
          <CircularProgressbar value={40} text={`${40}%`} />
        </div>

        <span className="text-lg font-bold text-green-400 ">Passed</span>
        <span className="text-lg font-bold text-gray-600">S</span>
        <hr className="w-full my-5 border-2 border-gray-300" />
        <QuestionProgress
          count={1}
          question={
            "In the depths of a moonlit night, what secrets does the darkness hold? Describe the whispers of the wind as it dances through the branches. Can you feel the weight of the past in the touch of a weathered stone?"
          }
        />
        <QuestionProgress
          count={2}
          question={
            "In the depths of a moonlit night, what secrets does the darkness hold? Describe the whispers of the wind as it dances through the branches. Can you feel the weight of the past in the touch of a weathered stone?"
          }
        />
        <QuestionProgress
          count={3}
          question={
            "In the depths of a moonlit night, what secrets does the darkness hold? Describe the whispers of the wind as it dances through the branches. Can you feel the weight of the past in the touch of a weathered stone?"
          }
        />
        <QuestionProgress
          count={4}
          question={
            "In the depths of a moonlit night, what secrets does the darkness hold? Describe the whispers of the wind as it dances through the branches. Can you feel the weight of the past in the touch of a weathered stone?"
          }
        />
        <QuestionProgress
          count={5}
          question={
            "In the depths of a moonlit night, what secrets does the darkness hold? Describe the whispers of the wind as it dances through the branches. Can you feel the weight of the past in the touch of a weathered stone?"
          }
        />
      </div>
    </>
  );
}
