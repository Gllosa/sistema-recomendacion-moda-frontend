import axios from "axios";
import { API_URL } from "./constants";

export const getRecomendations = async (
  file: File,
  recomendationsNumber: number
): Promise<string[]> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("recomendationsNumber", recomendationsNumber.toString());

  const response = await axios.post(`${API_URL}/recomendations`, formData);

  return response.data.urls;
};
