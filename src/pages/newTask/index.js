import { useState } from "react";
import styles from "./styles.module.scss";
import api from "../../services/api";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useRouter } from "next/router";

export default function NewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("baixa");
  const router = useRouter();
  const token = "undefined";
  if (typeof window !== "undefined") {
    localStorage.setItem("token");
  }

  async function handleCreateTask(e) {
    e.preventDefault();
    console.log(priority);

    try {
      const response = await api.post(
        "/task",
        { name, priority, description },
        { headers: { Auth: "Bearer " + token } }
      );
      router.push("/tasks");
    } catch (err) {
      alert(err);
    }
  }

  function handleLogout() {
    router.push("/tasks");
  }

  return (
    <div>
      <div className={styles.logon}>
        <button className={styles.back} type="button" onClick={handleLogout}>
          <FiArrowLeftCircle size={50} color="#ffff" />
        </button>
        <section className={styles.sec}>
          <h1 className={styles.apptitle}>Nova Tarefa</h1>
          <form className={styles.formcenter} onSubmit={handleCreateTask}>
            <input
              className={styles.forminput}
              placeholder="Titulo"
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
              Criar Tarefa
            </button>
          </form>
        </section>
        <img className={styles.image1} src="/newTask.png" alt="Nova Tarefa  " />
      </div>
    </div>
  );
}
