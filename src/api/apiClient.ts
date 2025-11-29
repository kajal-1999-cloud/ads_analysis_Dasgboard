import axios from "axios";

export const api = axios.create({
  baseURL: "https://mixo-fe-backend-task.vercel.app/",
  timeout: 10000,
});
