import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>Boardgame app</div>
      <nav>
        <ul>
          <li>
            <Link href="#">Liked</Link>
          </li>
          <li>
            <Link href="/insert">Insert</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
