import { useState, useEffect } from "react";
import Link from "next/link";
import UpdateTaskModal from "../../components/UpdateTaskModal";
import { FiTrash2, FiPlus, FiFilter } from "react-icons/fi";
import styles from "./styles.module.scss";
import api from "../../services/api";

export default function tasks() {
  const [userTasks, setUserTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/tasks", {
        headers: {
          Auth: "Bearer " + token,
        },
      })
      .then((response) => {
        setUserTasks(response.data);
      });
  }, [userTasks]);

  function handleTasksSorted(e) {
    e.preventDefault();

    try {
      api
        .get("/tasks/sorted", {
          headers: {
            Auth: "Bearer " + token,
          },
        })
        .then((response) => {
          setUserTasks(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }

  function handleDeleteTask(id) {
    try {
      api.delete(`/task/${id}`, {
        headers: {
          Auth: "Bearer " + token,
        },
      });
      setUserTasks(userTasks.filter((task) => task._id !== id));
    } catch (error) {
      alert("Erro ao deletar tarefa.");
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Link href={"/newTask"}>
          <button className={styles.registerbutton}>
            <FiPlus size={50} color="#FFFF" alt="Criar Tarefa" />
          </button>
        </Link>

        <button onClick={handleTasksSorted}>
          <FiFilter size={50} color="#FFFF" alt="Ordenar tarefas" />
        </button>
        <ul>
          <div>
            <p>Title</p>
            <p>Descrição</p>
            <p>Editar</p>
            <p>Apagar</p>
          </div>
          {userTasks.map((task) => {
            return (
              <li key={task._id}>
                <div className={styles.taskDetails}>
                  <a onClick={null}>{task.name}</a>
                  <p>{task.description}</p>
                  <UpdateTaskModal>{task._id}</UpdateTaskModal>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <FiTrash2 size={50} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <footer>
        <p>Copyright - 2021 - Desafio da Codex - by Igor Franca e Pedro Lima</p>
      </footer>
    </div>
  );
}
