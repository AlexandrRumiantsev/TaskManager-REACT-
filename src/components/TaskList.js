import React, { Component } from "react";
import { TaskItem }  from "./TaskItem";

export class TaskList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      refrash: 0
    }
  }
  render() {
    return (
      <div className="task">
        {this.props.component.state.data.map((item) => (
          <TaskItem 
            item={item} 
            component={this.props.component} 
            list={this}
          />
        ))}
      </div>
    );
  }
}