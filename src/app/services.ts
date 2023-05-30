import axios from "axios";
import { API_URL } from "./constants";

export const getRecomendations = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/recomendations`, formData);

  console.log(response);
};
