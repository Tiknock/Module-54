import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.tvmaze.com/",
});

const search = async (query) => {
  const response = await api.get(`/search/shows?q=${query}`);
  return response.data;
};

export default search;

