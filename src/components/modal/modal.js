import React, { useState } from "react";
import Modal from "react-modal";
import { FiLogIn, FiArrowLeftCircle } from "react-icons/fi";
import styles from "./styles.module.scss";
import api from "../../services/api";

export default function ModalItem() {
  const [isModalOpen, setModalState] = useState(false);
  const [nickname, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await api.post("/register", {
        nickname,
        email,
        password,
      });
      setModalState(false);
      console.log(response.data);
      console.log(response.data.error);
      alert("Conta criada com sucesso!");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-35%",
      transform: "translate(-50%, -50%)",
      background: "rgba(137, 179, 243, 0.95)",
    },
  };

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
        style={customStyles}
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={() => setModalState(false)}
      >
        <h1 className={styles.apptitle}>Bem vindo!</h1>
        <div className={styles.container}>
          <form className={styles.formcenter} onSubmit={handleRegister}>
            <input
              className={styles.forminput}
              placeholder="nickname"
              value={nickname}
              onChange={(e) => setNick(e.target.value)}
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
              type="password"
              value="FakePSW"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className={styles.button} type="submit">
              Criar conta
            </button>
          </form>
          <img className={styles.image} src="/girlTask.png" alt="logo" />
        </div>
        <button
          onClick={() => setModalState(false)}
          className={styles.close}
          type="submit"
        >
          <FiArrowLeftCircle size={40} color="#FFFF" />
        </button>
      </Modal>
    </div>
  );
}
