import { useEffect, useState, useMemo } from "react";
/*const useGetTicks = (num) => {
  const [count, setCount] = useState(num);

  const value = useMemo(() => {
    console.log("enter use memo");
    return count * 1000;
  }, [count]);
  useEffect(() => {
    console.log(count);
    setTimeout(() => {
      setCount(count + 1);
    }, 3000);
  }, [count]);

  console.log(`render ${count}`);
  return { count, value };
};*/

function useGetTicks(num) {
  const [count, setCount] = useState(num);

  const value = useMemo(() => {
    console.log("enter use memo");
    return count * 1000;
  }, [count]);
  
  useEffect(() => {
    console.log(count);
    setTimeout(() => {
      setCount(count + 1);
    }, 3000);
  }, [count]);

  console.log(`render ${count}`);
  return { count, value };
}

export function useFetch(url, type) {
  const [data, setData] = useState([]);
  if (type === "params") {
    console.log("nour");
  } else {
  }

  async function getjson(response) {
    const dt = await response.json();
    //   console.log(dt);
    setData(dt);
  }
  fetch(url).then(function (response) {
    getjson(response);
    //console.log(getjson(response));
    // setData(response.json());
  });

  return { data };
}
export const calc = () => {
  console.log("calc");
};

export default useGetTicks;
