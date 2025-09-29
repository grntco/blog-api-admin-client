import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (response.status === 429) {
          const errorData = await response.json();
          navigate("/", {
            state: {
              message: errorData.message || "Too many requests.",
              type: "error",
            },
          });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setError(data);
        }

        setData(data);
      } catch (err) {
        setError(err.message || "Error: Something unexpected happened.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
