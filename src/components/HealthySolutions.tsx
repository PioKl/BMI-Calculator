import "../style/HealthySolutions.scss";
import IconEating from "../assets/images/icon-eating.svg";
import IconExercise from "../assets/images/icon-exercise.svg";
import IconSleep from "../assets/images/icon-sleep.svg";
import SingleHealthySolution from "./SingleHealthySolution";

export default function HealthySolutions() {
  return (
    <section className="healthySolutionsContainer">
      <div className="healthySolutionsContainer__background"></div>
      <ul className="wrapper healthySolutionsContainer__itemList">
        <SingleHealthySolution
          name={"eating"}
          headingContent={"Healthy eating"}
          infoContent={
            "Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood."
          }
          iconImage={IconEating}
        />
        <SingleHealthySolution
          name={"exercise"}
          headingContent={"Regular exercise"}
          infoContent={
            "Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity."
          }
          iconImage={IconExercise}
        />
        <SingleHealthySolution
          name={"sleep"}
          headingContent={"Adequate sleep"}
          infoContent={
            "Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation."
          }
          iconImage={IconSleep}
        />
      </ul>
    </section>
  );
}
