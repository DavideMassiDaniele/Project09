import axios from "axios";

export default axios.create({
  baseURL: "https://umlens.herokuapp.com",
  /* headers: {
    "Content-type": "application/json"
  } */
});