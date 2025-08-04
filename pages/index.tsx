import { useEffect, useState } from "react";
import { Game } from "@/types/boardgame";
import Wrapper from "@/components/Card/Wrapper/Wrapper";
import { useRouter } from "next/router";
import Template from "@/components/Template/Template";
import { getAllGames } from "./api/fetch";
import axios from "axios";

const MainPage = () => {
  const [games, setGames] = useState<Array<Game>>([]);

  const router = useRouter();

  const fetchGames = async () => {
    try {
      const response = await getAllGames();
      setGames(response.data.games);
    } catch (err) {
      if (axios.isAxiosError(err) && err?.status === 401) {
        router.push("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <Template>
      <Wrapper games={games} />
    </Template>
  );
};

export default MainPage;
