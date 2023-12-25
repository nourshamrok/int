import "./styles.css";
import useGetTicks, { useFetch, calc } from "./useTicks";

export default function App() {
  calc();
  const { count, value } = useGetTicks(3);

  const { data } = useFetch(
    "https://api.github.com/users/hadley/orgs",
    "params"
  );
  console.log(count);
  return (
    <div className="App">
      <h2>nour</h2>
      <h1>{count}</h1>
      <h1>{value}</h1>
      <h1>from server</h1>
      {data.map(function (dt) {
        console.log("robi");
        return <h1>{dt.login}</h1>;
      })}
    </div>
  );
}
