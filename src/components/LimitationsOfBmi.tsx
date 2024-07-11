import "../style/LimitationsOfBmi.scss";
import SingleLimitationOfBmi from "./SingleLimitationOfBmi";

import IconGender from "../assets/images/icon-gender.svg";
import IconAge from "../assets/images/icon-age.svg";
import IconMuscle from "../assets/images/icon-muscle.svg";
import IconPregnancy from "../assets/images/icon-pregnancy.svg";
import IconRace from "../assets/images/icon-race.svg";

export default function LimitationsOfBmi() {
  return (
    <section className="wrapper limitationsOfBmi">
      <div className="limitationsOfBmiInfoContainer">
        <h2 className="limitationsOfBmiInfoContainer__heading">
          Limitations of BMI
        </h2>
        <p className="limitationsOfBmiInfoContainer__info">
          Although BMI is often a practical indicator of healthy weight, it is
          not suited for every person. Specific groups should carefully consider
          their BMI outcomes, and in certain cases, the measurement may not be
          beneficial to use.
        </p>
      </div>

      <SingleLimitationOfBmi
        name={"gender"}
        headingContent={"Gender"}
        infoContent={
          "The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI."
        }
        iconImage={IconGender}
      />
      <SingleLimitationOfBmi
        name={"age"}
        headingContent={"Age"}
        infoContent={
          "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content."
        }
        iconImage={IconAge}
      />
      <SingleLimitationOfBmi
        name={"muscle"}
        headingContent={"Muscle"}
        infoContent={
          "BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat."
        }
        iconImage={IconMuscle}
      />
      <SingleLimitationOfBmi
        name={"pregnancy"}
        headingContent={"Pregnancy"}
        infoContent={
          "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child."
        }
        iconImage={IconPregnancy}
      />

      <SingleLimitationOfBmi
        name={"race"}
        headingContent={"Race"}
        infoContent={
          "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse."
        }
        iconImage={IconRace}
      />
    </section>
  );
}
