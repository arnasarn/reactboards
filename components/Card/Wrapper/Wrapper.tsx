import { Game } from "@/types/boardgame";
import styles from "./wrapper.module.css";
import Card from "../Card";

type WrapperProps = {
  games: Game[];
};

const Wrapper = ({ games }: WrapperProps) => {
  return (
    <div className={styles.main}>
      {games.map((g) => {
        return (
          <Card
            id={g.id}
            key={g.id}
            title={g.title}
            description={g.description}
            imgUrl={g.imgUrl}
          />
        );
      })}
    </div>
  );
};

export default Wrapper;
