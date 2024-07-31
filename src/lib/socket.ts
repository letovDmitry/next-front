import { io } from "socket.io-client";

export const socket = io("https://anyboost.ru", {path: '/api/socket.io'});
// export const socket = io("https://anyboost.ru/api");
