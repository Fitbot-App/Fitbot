import React from "react";
import { setIntensity, setExperience } from "../slices/intensitySlice";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

const Intensity = () => {
  const intensity = useSelector((state) => state.intensity.intensity);
  const experience = useSelector((state) => state.intensity.experience);
  console.log(intensity);
  console.log(experience);
  const dispatch = useDispatch();

  const handleExperienceClick = (e) => {
    dispatch(setExperience(e.target.value));
  };

  const handleIntensityClick = (e) => {
    dispatch(setIntensity(e.target.value));
  };

  return (
    <div className="intensityContainer">
      <div className="experienceDiv">
        <h2 className="experienceTitle">Set Your Experience Level</h2>
        <button
          className={`${
            experience === "Beginner"
              ? "selectedExperience"
              : "experienceBeginner"
          }`}
          value="Beginner"
          onClick={handleExperienceClick}
        >
          Beginner
        </button>
        <button
          className={`${
            experience === "Intermediate"
              ? "selectedExperience"
              : "experienceIntermediate"
          }`}
          value="Intermediate"
          onClick={handleExperienceClick}
        >
          Intermediate
        </button>
        <button
          className={`${
            experience === "Advanced"
              ? "selectedExperience"
              : "experienceAdvanced"
          }`}
          value="Advanced"
          onClick={handleExperienceClick}
        >
          Advanced
        </button>
      </div>
      <div className="intensityDiv">
        <h2 className="intensityTitle">Set Your Desired Intensity</h2>
        <button
          className={`${
            intensity === "Easy" ? "selectedIntensity" : "intensityEasy"
          }`}
          value="Easy"
          onClick={handleIntensityClick}
        >
          Easy
        </button>
        <button
          className={`${
            intensity === "Medium" ? "selectedIntensity" : "intensityMedium"
          }`}
          value="Medium"
          onClick={handleIntensityClick}
        >
          Medium
        </button>
        <button
          className={`${
            intensity === "Hard" ? "selectedIntensity" : "intensityHard"
          }`}
          value="Hard"
          onClick={handleIntensityClick}
        >
          Hard
        </button>
      </div>
      <Link to="/pickExercise">
        <BiRightArrow
          className="rightArrowIntensity"
          color="#A7FF37"
          size="70"
        />
      </Link>
    </div>
  );
};

export default Intensity;
