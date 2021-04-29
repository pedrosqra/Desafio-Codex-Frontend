import React, { useState } from "react";
import Modal from "react-modal";
import { FiLogIn } from "react-icons/fi";
import styles from "./styles.module.scss";

export default function ModalItem() {
  const [isModalOpen, setModalState] = useState(false);
  const [nickname, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await api.post("/login", { email, password });
      console.log(email, password);
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className={styles.registermodal}>
      <div className={styles.exterior}>
        <FiLogIn size={23} color="#FFFF" />

        <button
          className={styles.registerbutton}
          onClick={() => setModalState(true)}
        >
          Criar conta
        </button>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={() => setModalState(false)}
      >
        <h1 className={styles.apptitle}>Criar conta</h1>
        <div className={styles.container}>
          <form className={styles.formcenter} onSubmit={handleRegister}>
            <input
              className={styles.forminput}
              placeholder="nome"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="senha"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className={styles.button} type="submit">
              Entrar
            </button>
          </form>
          <img className={styles.image} src="/girlTask.png" alt="logo" />
        </div>
      </Modal>
    </div>
  );
}
