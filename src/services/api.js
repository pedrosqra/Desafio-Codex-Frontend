import axios from "axios";

const api = axios.create({
  baseURL: "https://codextrainee.herokuapp.com/",
});

export default api;
