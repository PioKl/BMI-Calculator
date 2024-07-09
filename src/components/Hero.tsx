import "../style/Hero.scss";
import Logo from "../assets/images/logo.svg";
import BmiCalculator from "./BmiCalculator";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__background"></div>
      <div className="wrapper hero__container">
        <div className="hero__openingInfo">
          <img
            className="hero__logo"
            width={36.72}
            height={36.72}
            src={Logo}
            alt="logo"
          />
          <h1 className="hero__heading">Body Mass Index Calculator</h1>
          <p className="hero__info">
            Better understand your weight in relation to your height using our
            body mass index (BM) calculator. While BMI is not the sole
            determinant of a healthy weight, it offers a valuable starting point
            to evaluate your overall health and well-being.
          </p>
        </div>

        <BmiCalculator />
      </div>
    </section>
  );
}
