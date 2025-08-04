import { Game } from "@/types/boardgame";
import React, { useState } from "react";
import styles from "./detailedGame.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useRouter } from "next/router";
import { deleteGameById } from "@/pages/api/fetch";

type DetailedGameProps = {
  game: Game;
};

const DetailedGame = ({ game }: DetailedGameProps) => {
  const [isDeleteInitiated, setDeleteInitiated] = useState(false);
  const [isDeleteSuccess, setDeleteSuccess] = useState(false);
  const router = useRouter();

  const deleteGame = async (id: string) => {
    const response = await deleteGameById(id);

    if (response.status === 200) {
      setDeleteInitiated(false);
      setDeleteSuccess(true);
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <>
      {isDeleteSuccess && (
        <div className={`${styles.banner} ${styles.moveIn}`}>
          Successfully deleted boardgame.
        </div>
      )}
      <div className={styles.main}>
        <div className={styles.imgWrapper}>
          <img src={game.imgUrl} />
        </div>
        <div className={styles.textContent}>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
          <h5>{game.rating}</h5>
          <h5>{game.releaseYear}</h5>
          <h5>{game.dificulty}</h5>
        </div>

        <button onClick={() => setDeleteInitiated(true)}>Delete</button>
      </div>
      {isDeleteInitiated && (
        <ConfirmModal
          title="Do you really want to delete?"
          onCancel={() => setDeleteInitiated(false)}
          onConfirm={() => deleteGame(game.id)}
        />
      )}
    </>
  );
};

export default DetailedGame;
