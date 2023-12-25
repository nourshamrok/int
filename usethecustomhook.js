import "./styles.css";
import useGetTicks, { calc } from "./useTicks";

export default function App() {
  calc();
  const { a } = useGetTicks(3);
  console.log(a);
  return (
    <div className="App">
      <h2>nour</h2>
    </div>
  );
}
