import { useState } from "react";
import Modal from "react-modal";
import { FiEdit2, FiArrowLeftCircle } from "react-icons/fi";
import styles from "./styles.module.scss";
import api from "../../services/api";
import { useRouter } from "next/router";

export default function ModalItem(props) {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const taskId = props.children;
  const [isModalOpen, setModalState] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("baixa");

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await api.put(
        `/task/${taskId}`,
        {
          name,
          description,
          priority,
        },
        {
          headers: {
            Auth: "Bearer " + token,
          },
        }
      );
      setModalState(false);
      router.push("/tasks");
    } catch (err) {
      alert(err);
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
        <button
          className={styles.editbutton}
          type="button"
          onClick={() => setModalState(true)}
        >
          <FiEdit2 size={25} />
        </button>
      </div>
      <Modal
        style={customStyles}
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={() => setModalState(false)}
      >
        <h1 className={styles.apptitle}>Atualizar Tarefa</h1>
        <div className={styles.container}>
          <form className={styles.formcenter} onSubmit={handleUpdate}>
            <input
              className={styles.forminput}
              placeholder="Título"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className={styles.select}
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
            >
              <option value="baixa">Prioridade: Baixa</option>
              <option value="alta">Prioridade: Alta</option>
            </select>
            <button className={styles.button} type="submit">
              Atualizar Tarefa
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
