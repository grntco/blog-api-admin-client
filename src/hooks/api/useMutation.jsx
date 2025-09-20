import { useState } from "react";

const useMutation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutate = async (url, data, options = {}) => {
    if (!url) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        method: options.method || "POST",
        headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) setError(responseData);

      return responseData;
    } catch (err) {
      setError({
        message: err.message || "An unexpected error occurred.",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, error, loading };
};

export default useMutation;
