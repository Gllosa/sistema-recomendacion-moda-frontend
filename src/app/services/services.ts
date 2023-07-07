import axios from "axios";
import { API_URL } from "../constants";
import { SelectedAttributtes } from "./services.interfaces";

export const getRecomendations = async (
  file: File,
  recomendationsNumber: number,
  selectedAttributtes: SelectedAttributtes = {
    135: false,
    136: false,
    146: false,
    115: false,
    317: false,
  }
): Promise<string[]> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("recomendationsNumber", recomendationsNumber.toString());

  formData.append("selectedAttributtes", JSON.stringify(selectedAttributtes))

  const response = await axios.post(`${API_URL}/recommendations`, formData);

  return response.data.urls;
};
