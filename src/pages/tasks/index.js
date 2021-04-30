import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiFilter,
  FiArrowLeftCircle,
} from "react-icons/fi";
import styles from "./styles.module.scss";
import api from "../../services/api";
import { useRouter } from "next/router";

export default function tasks() {
  const [userTasks, setUserTasks] = useState([]);
  const token = localStorage.getItem("token");
  const router = useRouter();

  useEffect(() => {
    api
      .get("/tasks", {
        headers: {
          Auth: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setUserTasks(response.data);
      });
  }, [token]);

  function handleTasksSorted(e) {
    e.preventDefault();

    useEffect(() => {
      api
        .get("/tasks/sorted", {
          headers: {
            Auth: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response);
          setUserTasks(response.data);
        });
    }, []);
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

  function handleLogout() {
    try {
      localStorage.clear();
      router.push("/landing");
    } catch (error) {
      alert("Erro ao deletar tarefa.");
    }
  }

  return (
    <div className={styles.background}>
      <button className={styles.back} type="button" onClick={handleLogout}>
        <FiArrowLeftCircle size={50} color="#ffff" />
      </button>
      <div className={styles.container}>
        <div className={styles.functions}>
          <Link href={"/newTask"}>
            <button className={styles.upbutton}>
              <FiPlus size={50} color="#5699" alt="Criar Tarefa" />
            </button>
          </Link>

          <button className={styles.upbutton} onClick={handleTasksSorted}>
            <FiFilter size={50} color="#5699" alt="Ordenar tarefas" />
          </button>
        </div>
        <ul>
          <div className={styles.sections}>
            <p>Título</p>
            <p>Descrição</p>
          </div>
          {userTasks.map((task) => {
            return (
              <div key={task._id}>
                <div className={styles.task}>
                  <a className={styles.title} onClick={null}>
                    {task.name}
                  </a>
                  <p className={styles.desc}>{task.description}</p>
                  <div className={styles.sidebuttons}>
                    <button className={styles.upbutton} type="button">
                      <FiEdit2 size={25} />
                    </button>
                    <button
                      className={styles.upbutton}
                      type="button"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      <FiTrash2 size={25} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
