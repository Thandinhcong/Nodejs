import axios from "axios";
const insntace = axios.create({
    baseURL: "http://localhost:8080/api"
})
export default insntace;