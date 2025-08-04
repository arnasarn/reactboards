import styles from "./loginPage.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import Template from "@/components/Template/Template";

const LoginPage = () => {
  return (
    <Template>
      <div className={styles.main}>
        <h1 className={styles.title}>Boardgame app</h1>
        <LoginForm />
      </div>
    </Template>
  );
};

export default LoginPage;
