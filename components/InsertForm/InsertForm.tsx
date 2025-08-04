import { useState } from "react";
import styles from "./insertForm.module.css";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import RangeSelector from "../RangeSelector/RangeSelector";
import { insertGame } from "@/pages/api/fetch";

const InsertForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [releaseYear, setReleaseYear] = useState(""); // or whatever default you want
  const [playTimeMin, setPlayTimeMin] = useState("");
  const [bestStartPlayAtAge, setBestStartPlayAtAge] = useState("");
  const [rating, setRating] = useState("");
  const [dificulty, setDificulty] = useState("");
  const [boxSize, setBoxSize] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [canPlayPersons, setCanPlayPersons] = useState([1, 5]);
  const [bestPlayPersons, setBestPlayPersons] = useState([1, 5]);
  const [isMissingData, setIsMissingData] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onInsertBoardgame = async () => {
    try {
      if (
        !title ||
        !description ||
        !imgUrl ||
        !releaseYear ||
        !playTimeMin ||
        !bestStartPlayAtAge ||
        !rating ||
        !dificulty ||
        !boxSize ||
        !ratingCount
      ) {
        setIsMissingData(true);
        return;
      }

      const game = {
        title: title,
        description: description,
        imgUrl: imgUrl,
        releaseYear: +releaseYear,
        playTimeMin: +playTimeMin,
        bestStartPlayAtAge: +bestStartPlayAtAge,
        rating: +rating,
        dificulty: +dificulty,
        boxSize: boxSize,
        ratingCount: +ratingCount,
        canPlayPersons: canPlayPersons,
        bestPlayPersons: bestPlayPersons,
      };

      const response = await insertGame(game);
      if (response.status === 201) {
        setIsSuccess(true);
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.status === 400) {
        setIsMissingData(false);
        setIsError(true);
        return;
      }
    }
  };

  return (
    <>
      {isSuccess && (
        <div className={`${styles.banner} ${styles.moveIn}`}>
          Successfully added boardgame.
        </div>
      )}
      <div className={styles.main}>
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Image URL"
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <input
          placeholder="Release Year"
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <input
          placeholder="Play Time (Minutes)"
          type="number"
          value={playTimeMin}
          onChange={(e) => setPlayTimeMin(e.target.value)}
        />

        <input
          placeholder="Best Start Play At Age"
          type="number"
          value={bestStartPlayAtAge}
          onChange={(e) => setBestStartPlayAtAge(e.target.value)}
        />

        <input
          placeholder="Rating"
          type="number"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input
          placeholder="Difficulty"
          type="number"
          step="0.1"
          value={dificulty}
          onChange={(e) => setDificulty(e.target.value)}
        />

        <input
          placeholder="Box Size"
          type="text"
          value={boxSize}
          onChange={(e) => setBoxSize(e.target.value)}
        />

        <input
          placeholder="Rating Count"
          type="number"
          value={ratingCount}
          onChange={(e) => setRatingCount(e.target.value)}
        />

        <RangeSelector
          values={canPlayPersons}
          setValues={setCanPlayPersons}
          label={"Can play persons"}
        />

        <RangeSelector
          values={bestPlayPersons}
          setValues={setBestPlayPersons}
          label={"Best play persons"}
        />

        <button onClick={onInsertBoardgame}>Insert</button>
        {isMissingData && (
          <p className={styles.error}>Please input all the fields</p>
        )}
        {isError && <p className={styles.error}>Please input correct data</p>}
      </div>
    </>
  );
};

export default InsertForm;
