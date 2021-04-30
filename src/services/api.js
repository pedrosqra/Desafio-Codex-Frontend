import axios from "axios";

const api = axios.create({
  baseURL: "https://codextrainee.herokuapp.com/login",
});

export default api;
