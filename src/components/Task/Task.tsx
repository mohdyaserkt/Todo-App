import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.css";
import {
  faCheck,
  faPenToSquare,
  faRotateLeft,
  faSquareCheck,
  faSquareMinus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../Tooltip/Tooltip";

interface TaskProps {
  task: {
    id: string;
    title: string;
    done: boolean;
  };
  dispatch: React.Dispatch<any>; // Change the type accordingly
  index: number;
  error: {
    show: boolean;
    message: string;
  };
  setError: React.Dispatch<React.SetStateAction<{
    show: boolean;
    message: string;
  }>>;
}

const Task: React.FC<TaskProps> = ({ task, dispatch, index, error, setError }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [deleted, setDeleted] = useState(false);

  const newRef = useRef<HTMLLIElement>(null);

  const isValid = editedTitle.length >= 3 && editedTitle.length <= 255;
  const handleEditConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      dispatch({ type: "edit", payload: { title: editedTitle, id: task.id } });
      setEditMode(false);
    }
    if (editedTitle.length < 3) {
      setError({ show: true, message: "input_must_be_at_least_3_characters" });
    } else if (editedTitle.length > 250) {
      setError({
        show: true,
        message: "input_cant_be_more_than_250_characters",
      });
    } else {
      setError({ ...error, show: false });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (newRef.current && !newRef.current.contains(e.target as Node)) {
        setEditMode(false);
        setError({ ...error, show: false });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [error, setError]);

  const handleUndoEdit = () => {
    setEditedTitle(task.title);
    setError({ ...error, show: false });
  };

  const handleTaskDelete = () => {
    setDeleted(true);
    setTimeout(() => {
      dispatch({ type: "delete", payload: { id: task.id } });
    }, 300);
  };

  return (
    <li
      className={
        styles.task +
        " " +
        (task.done ? styles.taskDone : "") +
        " " +
        (deleted ? styles.taskDeleted : "")
      }
      ref={newRef}
    >
      {editMode === false ? (
        <>
          <div className={styles.title} onClick={() => setEditMode(true)}>
            <span>{index}.</span>
            <p>{task?.title}</p>
          </div>
          <div className={styles.actions}>
            <button
              onClick={() =>
                dispatch({ type: "toggle", payload: { id: task.id } })
              }
            >
              {task.done === false ? (
                <FontAwesomeIcon icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon icon={faSquareMinus} />
              )}
              <Tooltip text={task.done ? "undone" : "done"} />
            </button>
            <button onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
              <Tooltip text="edit" />
            </button>
            <button onClick={handleTaskDelete}>
              <FontAwesomeIcon icon={faTrash} />
              <Tooltip text="delete" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>
            <span>{index}.</span>
            <form onSubmit={handleEditConfirm} className={styles.editingForm}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              {editedTitle !== task.title && (
                <button
                  type="button"
                  className={styles.undoButton}
                  onClick={handleUndoEdit}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
              )}
            </form>
          </div>
          <div className={styles.actions + " " + styles.editingButtons}>
            <button type="submit" onClick={handleEditConfirm}>
              <FontAwesomeIcon icon={faCheck} />
              <Tooltip text="confirm" />
            </button>
            <button onClick={() => setEditMode(false)}>
              <FontAwesomeIcon icon={faXmark} />
              <Tooltip text="cancel" />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
