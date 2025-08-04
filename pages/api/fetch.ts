import { GameInsert } from "@/types/boardgame";
import axios from "axios";
import Cookies from "js-cookie";

const jwt = Cookies.get("@user_jwt");

const BASE_URL = "http://localhost:3005";

export const getAllGames = async () => {
  const response = await axios.get(`${BASE_URL}/games`, {
    headers: { Authorization: jwt },
  });
  return response;
};

export const getGame = async (id: string) => {
  const response = await axios.get(`http://localhost:3005/games/${id}`, {
    headers: { Authorization: jwt },
  });
  return response;
};

export const insertGame = async (game: GameInsert) => {
  const response = await axios.post("http://localhost:3005/games", game, {
    headers: { Authorization: jwt },
  });

  return response;
};

export const deleteGameById = async (id: string) => {
  const response = await axios.delete(`http://localhost:3005/games/${id}`, {
    headers: { Authorization: jwt },
  });
  return response;
};

export const login = async (loginData: { email: string; password: string }) => {
  const response = await axios.post(
    "http://localhost:3005/users/login",
    loginData
  );
  return response;
};
