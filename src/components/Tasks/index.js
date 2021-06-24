import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import pencilSvg from "../../assets/img/edit.svg";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import "./style.scss";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  withoutEmpty,
  onCompleteTask,
  onEditTask
  
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle); //изменяем состояние
      //отправляем запрос
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={pencilSvg} alt="Edit icon" />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутсвуют</h2>}
        {list.tasks &&
          list.tasks.map((task, index) => (
            <Task
              key={index}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete = {onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
