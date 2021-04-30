import api from "../../src/services/api";
import styles from "./styles.module.scss";

export default Header = async () => {
  const [nickname, setNickname] = useState();
  useEffect(() => {
    api
      .get("/login", {
        headers: {
          authorization: "Bearer" + token,
        },
      })
      .then((response) => {
        setNickname(response.data);
      });
  }, []);

  return (
    <header className={styles.headerContainer}>
      <h1>ToDo</h1>
      <p>O melhor para você ouvir, sempre.</p>
    </header>
  );
};
