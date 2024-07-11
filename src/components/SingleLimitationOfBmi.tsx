import "../style/SingleLimitationOfBmi.scss";
interface SingleLimitationOfBmiProps {
  name: string;
  headingContent: string;
  infoContent: string;
  iconImage: string;
}

const SingleLimitationOfBmi: React.FC<SingleLimitationOfBmiProps> = ({
  name,
  headingContent,
  infoContent,
  iconImage,
}) => {
  return (
    <div className="limitationOfBmiContainer">
      <div className="limitationOfBmiIconContainer">
        <img
          className="limitationOfBmiIconContainer__icon"
          src={iconImage}
          alt={`${name}-icon`}
          width={32}
          height={32}
        />
        <h4 className="limitationOfBmiIconContainer__heading">
          {headingContent}
        </h4>
      </div>

      <p className="limitationOfBmiContainer__info">{infoContent}</p>
    </div>
  );
};

export default SingleLimitationOfBmi;
