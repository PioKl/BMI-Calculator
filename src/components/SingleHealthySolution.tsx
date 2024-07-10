import "../style/SingleHealthySolution.scss";
interface SingleHealthySolutionProps {
  name: string;
  headingContent: string;
  infoContent: string;
  iconImage: string;
}

const SingleHealthySolution: React.FC<SingleHealthySolutionProps> = ({
  name,
  headingContent,
  infoContent,
  iconImage,
}) => {
  return (
    <li className="healthySolutionItem">
      <img
        className="healthySolutionItem__icon"
        src={iconImage}
        alt={`${name}-icon`}
        width={64}
        height={64}
      />
      <div className="healthySolutionItem__solution">
        <h3 className="healthySolutionItem__heading">{headingContent}</h3>
        <p className="healthySolutionItem__info">{infoContent}</p>
      </div>
    </li>
  );
};

export default SingleHealthySolution;
