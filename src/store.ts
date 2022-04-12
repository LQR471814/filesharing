import { APIClient } from "./api/ApiServiceClientPb";

// const APILocation = `${window.location.origin}/api`
export const APILocation = `http://192.168.1.173:3000`;
export const api = new APIClient(APILocation)
