import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DEL } from "../constants/Api";

export function TaskItem(that) {

  const handleDeleteElement = (id , that ) => {
      that.component.state.data.filter( ( item, index ) => {
        if(item.id == id) that.component.state.data.splice(index, 1);
      });
      
      that.component.props.store.dispatch({
        type: DEL,
        data: {
          'Component' : this ,
          'id': id ,
          'callback': function(){
             console.log('END DEL');
          }
        }
      });
      that.component.setState(
          { data: that.component.state.data }
      )
  };
  return (
    <div>
      <span className="task__title">
        <Link className="task__item" to={"/task/" + that.item.id}>
          Задача №{that.item.id}
        </Link>
      </span>
      <span className="task__discr">{that.item.title}</span>
      <div className="task__btn-block">
        <button
          className="task__item-del"
          onClick={
                    () => { 
                      handleDeleteElement
                        (
                          that.item.id , 
                          that
                        )
                    }
                  }
        ></button>
        <button
          className="task__item-edit"
          onClick={
            that.component.edit.bind(
              that.component,
              that.item.id,
              that.item.title,
              that.list
            )
          }
        ></button>
      </div>
    </div>
  );
}