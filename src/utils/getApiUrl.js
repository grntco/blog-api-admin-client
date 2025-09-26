const getApiUrl = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return API_BASE_URL;
};

export default getApiUrl;
