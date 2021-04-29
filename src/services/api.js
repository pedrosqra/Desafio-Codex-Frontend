import axios from "axios";

const api = axios.create({
  baseURL: "codextrainee.herokuapp.com",
});

export default api;
