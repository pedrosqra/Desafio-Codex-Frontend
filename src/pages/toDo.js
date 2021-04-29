import React, { useState, useEffect } from "react";
import { EditLogo, DeleteLogo } from "react-icons/fi";
import styles from "../styles/pages/toDo.module.scss";

import api from "../services/api";

export default function toDo() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  useEffect(() => {
    api
      .get("/tasks", {
        headers: {
          authorization: "Bearer" + token,
        },
      })
      .then((response) => {
        setTasks(response.data);
      });
  }, [userId]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <div className={styles.taskDetails}>
                  <a onClick={toggleModal}>{task.name}</a>
                  <p>{task.description}</p>
                  <button type="button" onClick={toggleModal}>
                    <EditLogo size={50} />
                  </button>
                  <button type="button" onClick={toggleModal}>
                    <DeleteLogo size={50} />
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
