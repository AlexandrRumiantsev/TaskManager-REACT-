import React, { Component } from "react";
import { TaskItem }  from "./TaskItem";

export class TaskList extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div className="task">
        {this.props.component.state.data.map((item) => (
          <TaskItem item={item} component={this.props.component} />
        ))}
      </div>
    );
  }
}