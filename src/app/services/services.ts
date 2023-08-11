import axios from "axios";
import { API_URL } from "../constants";
import { SelectedAttributes } from "./services.interfaces";

export const getRecomendations = async (
  file: File,
  recomendationsNumber: number,
  selectedAttributtes: SelectedAttributes
): Promise<string[]> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("recomendationsNumber", recomendationsNumber.toString());

  const selAttr = Object.fromEntries(
    Object.entries(selectedAttributtes)
      .filter(([id, value]) => value.checked)
      .map(([id]) => [id, true])
  );

  formData.append("selectedAttributtes", JSON.stringify(selAttr));

  const response = await axios.post(`${API_URL}/recommendations`, formData);

  return response.data.images;
};
