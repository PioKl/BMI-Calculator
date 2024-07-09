import { useState, useMemo, useCallback } from "react";
import "../style/BmiCalculator.scss";

export default function BmiCalculator() {
  const [selectedBmiOption, setSelectedBmiOption] = useState<string>("metric"); // domyślna wartość wybranej opcji, bazowana na id inputa typu radio
  const [metricHeightValue, setMetricHeightValue] = useState<number>(0);
  const [metricWeightValue, setMetricWeightValue] = useState<number>(0);
  const [imperialHeightFeetValue, setImperialHeightFeetValue] =
    useState<number>(0);
  const [imperialHeightInchesValue, setImperialHeightInchesValue] =
    useState<number>(0);
  const [imperialWeightStoneValue, setImperialWeightStoneValue] =
    useState<number>(0);
  const [imperialWeightPoundsValue, setImperialWeightPoundsValue] =
    useState<number>(0);

  const handleMetricImperialOptionClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    setSelectedBmiOption(event.currentTarget.id);
    setMetricHeightValue(0);
    setMetricWeightValue(0);
    setImperialHeightFeetValue(0);
    setImperialHeightInchesValue(0);
    setImperialWeightStoneValue(0);
    setImperialWeightPoundsValue(0);
  };

  const handleMetricImperialInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { id, value } = event.target;
    const newValue = parseInt(value) || 0;

    if (id === "metricHeight") {
      setMetricHeightValue(newValue);
    } else if (id === "metricWeight") {
      setMetricWeightValue(newValue);
    } else if (id === "imperialFeet") {
      setImperialHeightFeetValue(newValue);
    } else if (id === "imperialInches") {
      setImperialHeightInchesValue(newValue);
    } else if (id === "imperialStone") {
      setImperialWeightStoneValue(newValue);
    } else if (id === "imperialPounds") {
      setImperialWeightPoundsValue(newValue);
    }
  };

  const calculateMetricBmi = useCallback(
    (height: number, weight: number): string => {
      if (height <= 0 || weight <= 0) {
        return "";
      }
      const heightInMeters = height / 100; // przeliczenie na metry
      const bmi = weight / heightInMeters ** 2;
      return isNaN(bmi) || !isFinite(bmi) ? "" : bmi.toFixed(1);
    },
    []
  );

  const calculateImperialBmi = useCallback(
    (
      heightFeet: number,
      heightInches: number,
      weightStone: number,
      weightPounds: number
    ): string => {
      if (
        heightFeet <= 0 ||
        heightInches <= 0 ||
        weightStone <= 0 ||
        weightPounds <= 0
      ) {
        return "";
      }
      const height = heightFeet * 12 + heightInches; // przeliczenie stóp na cale i dodanie pozostałych cali
      const weight = weightStone * 14 + weightPounds; // przeliczenie stone na funty i dodanie pozostałych funtów
      const bmi = 703 * (weight / Math.pow(height, 2));
      return isNaN(bmi) || !isFinite(bmi) ? "" : bmi.toFixed(1);
    },
    []
  );

  //Optymalna waga (w metric) dla danego wzrostu
  const metricOptimalWeight = useMemo(() => {
    if (metricHeightValue > 0) {
      const heightInMeters = metricHeightValue / 100;
      const minOptimalWeight = Number((18.5 * heightInMeters ** 2).toFixed(1)); //minimalna optymalna waga w kg
      const maxOptimalWeight = Number((24.9 * heightInMeters ** 2).toFixed(1)); //maksymalna optymalna waga w kg
      return [minOptimalWeight, maxOptimalWeight];
    }
    return [];
  }, [metricHeightValue]);

  //Optymalna waga (w imperial) dla danego wzrostu
  const imperialOptimalWeight = useMemo(() => {
    if (imperialHeightFeetValue > 0 || imperialHeightInchesValue > 0) {
      const height = imperialHeightFeetValue * 12 + imperialHeightInchesValue;
      const minWeightPounds = (18.5 * Math.pow(height, 2)) / 703; // minimalna optymalna waga w funtach dla danego wzrostu
      const maxWeightPounds = (24.9 * Math.pow(height, 2)) / 703; // maksymalna optymalna waga w funtach dla danego wzrostu

      const poundsToModuleAndToStone = (weightInPounds: number) => {
        const stone = Math.floor(weightInPounds / 14); //przeliczanie z pounds na stone
        const moduloPounds = Math.floor(weightInPounds % 14);
        return { stone, pounds: moduloPounds };
      };

      const minWeight = poundsToModuleAndToStone(minWeightPounds); //przeliczanie z pounds na stone dla maksymalnej wagi
      const maxWeight = poundsToModuleAndToStone(maxWeightPounds); //przeliczanie z pounds na stone dla minimalnej wagi

      return [
        minWeight.stone,
        maxWeight.stone,
        minWeight.pounds,
        maxWeight.pounds,
      ];
    }
    return [];
  }, [imperialHeightFeetValue, imperialHeightInchesValue]);

  const bmiValue = useMemo(() => {
    return selectedBmiOption === "metric"
      ? calculateMetricBmi(metricHeightValue, metricWeightValue)
      : calculateImperialBmi(
          imperialHeightFeetValue,
          imperialHeightInchesValue,
          imperialWeightStoneValue,
          imperialWeightPoundsValue
        );
  }, [
    selectedBmiOption,
    metricHeightValue,
    metricWeightValue,
    imperialHeightFeetValue,
    imperialHeightInchesValue,
    imperialWeightStoneValue,
    imperialWeightPoundsValue,
    calculateMetricBmi,
    calculateImperialBmi,
  ]);

  const bmiResult = useMemo((): string => {
    if (isNaN(parseFloat(bmiValue)) || !isFinite(parseFloat(bmiValue))) {
      return "";
    } else if (parseFloat(bmiValue) < 18.5) {
      return "underweight";
    } else if (parseFloat(bmiValue) < 25) {
      return "healthy weight";
    } else if (parseFloat(bmiValue) < 30) {
      return "overweight";
    } else {
      return "obese";
    }
  }, [bmiValue]);

  return (
    <div className="bmi">
      <h3 className="bmi__heading">Enter your details below</h3>
      <div className="bmi__calculator">
        <div className="bmi__radioInputsContainer">
          <label
            className="bmi__radioInputContainer --metric"
            id="metricInputLabel"
            data-label="Metric"
          >
            <input
              type="radio"
              id="metric"
              name="toggle"
              defaultChecked={true}
              onClick={handleMetricImperialOptionClick}
            />
            <span className="customRadioInput"></span>
          </label>
          <label
            className="bmi__radioInputContainer --imperial"
            id="imperialInputLabel"
            data-label="Imperial"
          >
            <input
              type="radio"
              id="imperial"
              name="toggle"
              onClick={handleMetricImperialOptionClick}
            />
            <span className="customRadioInput"></span>
          </label>
        </div>

        <div className="bmiInputsContainer bmiInputsContainer1">
          <span className="bmiInputsContainer__category">Height</span>
          <label className="bmiInputsContainer__inputLabel --cm">
            <input
              type="number"
              className="bmiInputsContainer__input"
              placeholder={metricHeightValue === 0 ? "0" : ""}
              id="metricHeight"
              value={metricHeightValue === 0 ? "" : metricHeightValue}
              onChange={handleMetricImperialInputChange}
            />
          </label>

          <span className="bmiInputsContainer__category">Weight</span>
          <label className="bmiInputsContainer__inputLabel --kg">
            <input
              type="number"
              className="bmiInputsContainer__input"
              placeholder={metricWeightValue === 0 ? "0" : ""}
              id="metricWeight"
              value={metricWeightValue === 0 ? "" : metricWeightValue}
              onChange={handleMetricImperialInputChange}
            />
          </label>
        </div>
        <div className="bmiInputsContainer bmiInputsContainer2">
          <span className="bmiInputsContainer__category --imperial">
            Height
          </span>
          <label className="bmiInputsContainer__inputLabel --feet">
            <input
              type="number"
              className="bmiInputsContainer__input"
              placeholder={imperialHeightFeetValue === 0 ? "0" : ""}
              id="imperialFeet"
              value={
                imperialHeightFeetValue === 0 ? "" : imperialHeightFeetValue
              }
              onChange={handleMetricImperialInputChange}
            />
          </label>
          <label className="bmiInputsContainer__inputLabel --inches">
            <input
              type="number"
              className="bmiInputsContainer__input"
              placeholder={imperialHeightInchesValue === 0 ? "0" : ""}
              id="imperialInches"
              value={
                imperialHeightInchesValue === 0 ? "" : imperialHeightInchesValue
              }
              onChange={handleMetricImperialInputChange}
            />
          </label>
          <span className="bmiInputsContainer__category --imperial">
            Weight
          </span>
          <label className="bmiInputsContainer__inputLabel --stone">
            <input
              type="number"
              className="bmiInputsContainer__input"
              placeholder={imperialWeightStoneValue === 0 ? "0" : ""}
              id="imperialStone"
              value={
                imperialWeightStoneValue === 0 ? "" : imperialWeightStoneValue
              }
              onChange={handleMetricImperialInputChange}
            />
          </label>
          <label className="bmiInputsContainer__inputLabel --pounds">
            <input
              type="number"
              className="bmiInputsContainer__input"
              placeholder={imperialWeightPoundsValue === 0 ? "0" : ""}
              id="imperialPounds"
              value={
                imperialWeightPoundsValue === 0 ? "" : imperialWeightPoundsValue
              }
              onChange={handleMetricImperialInputChange}
            />
          </label>
        </div>

        <div className="bmi__resultContainer">
          {bmiValue ? (
            <>
              <div className="bmi__valueContainer">
                <span className="bmi__valueTitle">Your BMI is...</span>
                <span className="bmi__value">{bmiValue}</span>
              </div>
              <div className="bmi__idealWeightContainer">
                <span className="bmi__idealWeightResult">
                  Your BMI suggests you’re a {bmiResult}. Your ideal weight is
                  between{" "}
                  {imperialOptimalWeight.length > 0 && (
                    <span className="bmi__idealWeightInfo">
                      {imperialOptimalWeight[0]}st {imperialOptimalWeight[2]}lbs
                      - {imperialOptimalWeight[1]}st {imperialOptimalWeight[3]}
                      lbs
                    </span>
                  )}
                  {metricOptimalWeight.length > 0 && (
                    <span className="bmi__idealWeightInfo">
                      {metricOptimalWeight[0]}kgs - {metricOptimalWeight[1]}kgs
                    </span>
                  )}
                  .
                </span>
              </div>
            </>
          ) : (
            <div className="bmi__welcomeContainer">
              <span className="bmi__welcomeTitle">Welcome!</span>
              <span className="bmi__welcomeInfo">
                Enter your height and weight and you’ll see your BMI result
                here.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
