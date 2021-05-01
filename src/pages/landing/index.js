import { useState } from "react";
import Modal from "../../components/RegisterModal/modal";
import styles from "./styles.module.scss";
import api from "../../services/api";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const router = useRouter();
  Cookie.set("token", "");

  async function handleLogin(e) {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await api.post("/login", { email, password });
      Cookie.set("token", response.data.token);
      router.push("/tasks");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div>
      <div className={styles.logon}>
        <section className={styles.sec}>
          <h1 className={styles.apptitle}>To-Do</h1>
          <form className={styles.formcenter} onSubmit={handleLogin}>
            <input
              className={styles.forminput}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="senha"
              type="password"
              value="FakePSW"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className={styles.button} type="submit">
              Entrar
            </button>
          </form>
          <Modal />
        </section>
        <img className={styles.image1} src="/taskPencil.png" alt="logo" />
      </div>
    </div>
  );
}
