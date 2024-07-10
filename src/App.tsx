import "./style/App.scss";
import Hero from "./components/Hero";
import ResultMeans from "./components/ResultMeans";
import HealthySolutions from "./components/HealthySolutions";
import LimitationsOfBmi from "./components/LimitationsOfBmi";

function App() {
  return (
    <>
      <Hero />
      <ResultMeans />
      <HealthySolutions />
      <LimitationsOfBmi />
    </>
  );
}

export default App;
