import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
  baseURL: process.env.BASE_URL
});
api.defaults.headers.authorization = `Basic ${process.env.KEYFBITS}`;

export default api;