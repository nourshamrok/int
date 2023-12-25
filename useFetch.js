import { useState, useEffect } from "react";

const useFetch = (endpoint, queryParams = {}, queryType = "json") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let url = endpoint;

        if (queryType === "json") {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          setData(result);
        } else if (queryType === "queryString") {
          const queryString = Object.entries(queryParams)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");

          url = `${endpoint}?${queryString}`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          setData(result);
        } else {
          throw new Error(
            'Invalid query type. Supported types are "json" and "queryString".'
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, queryParams, queryType]);

  return { data, loading, error };
};

export default useFetch;
