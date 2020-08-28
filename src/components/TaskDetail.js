import React, { Component } from "react";

export function TaskDetail(props) {
  return (
    <div>
      <h1>Задача</h1>
      <div className="detail-task">
        <p>Краткое описание</p>
        <p>
          <input type="text" />
        </p>
        <p class="popupp__error"></p>
        <button class="popupp__send">Создать</button>
      </div>
      <Link to="/">На главную</Link>
    </div>
  );
}