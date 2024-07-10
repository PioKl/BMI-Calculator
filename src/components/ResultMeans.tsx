import "../style/ResultMeans.scss";
import ImgManEating from "../assets/images/image-man-eating.webp";

export default function ResultMeans() {
  return (
    <section className="resultMeansContainer">
      <div className="resultMeansImageContainer">
        <img
          className="resultMeansImageContainer__img"
          src={ImgManEating}
          alt="man-eating"
        />
      </div>
      <div className="resultMeansInfoContainer">
        <h2 className="resultMeansInfoContainer__heading">
          What your BMI result means
        </h2>
        <p className="resultMeansInfoContainer__info">
          A BMI range of 18.5 to 24.9 is considered a 'healthy weight.'
          Maintaining a healthy weight may lower your chances of experiencing
          health issues later on, such as obesity and type 2 diabetes. Aim for a
          nutritious diet with reduced fat and sugar content, incorporating
          ample fruits and vegetables. Additionally, strive for regular physical
          activity, ideally about 30 minutes daily for five days a week.
        </p>
      </div>
    </section>
  );
}
