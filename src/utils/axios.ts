/* eslint-disable import/prefer-default-export */
import axios from "axios";

import apiUrl from "./api";

export const ZDVAPI = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
