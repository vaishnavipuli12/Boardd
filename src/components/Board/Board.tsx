import React, { useState } from "react";
import "./Board.css";
import AddToDoModals from "components/Modals/AddToDoModals";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";

const Board = () => {
  const dispatch: any = useDispatch();

  const [toDoList, setToDoList] = useState([]);
  const [isOpenAddToDo, setIsOpenAddToDo] = useState(false);
  const [itemStatusChanged, setItemStatusChanged] = useState<any>({
    todo: null,
    index: null,
  });

  // const todoData: any = []
  const todoData = useSelector(
    (state: any) => state.AddToDoReducers && state.AddToDoReducers.todoData
  );

  const handleAddACardToDo = () => {
    setIsOpenAddToDo(true);
  };

  const handleCloseAddTodoModal = () => {
    setIsOpenAddToDo(false);
  };

  const changeItemToDoing = (todo: any, index: any) => {
    let newData = todo;
    if (todo.taskStatusId === 1) {
      newData["taskStatusId"] = 2;
    } else if (todo.taskStatusId === 2) {
      newData["taskStatusId"] = 3;
    }
    const requestPayload = {
      id: todo?.id,
      board: {
        id: todo?.board?.id,
      },
      taskStatusId: newData["taskStatusId"],
    };
    console.log(requestPayload);
    dispatch(actions.updateTodoStatus(requestPayload));
    setItemStatusChanged({ todo: todo, index: index });
  };

  return (
    <>
      {isOpenAddToDo && (
        <AddToDoModals
          isOpen={isOpenAddToDo}
          handleCloseModal={handleCloseAddTodoModal}
          // itemStatusChanged={itemStatusChanged}
        />
      )}
      <div className="board-area">
        <div className="row gy-3">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="board-todo">
              <div className="row">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <h3>ToDo</h3>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <span className="icon-area">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
              <div className="card-items-section">
                <div className="row m-0">
                  {todoData &&
                    todoData?.map((todo: any, index: any) => {
                      if (todo.taskStatusId === 1) {
                        return (
                          <div
                            className="card mt-3"
                            key={index}
                            style={{ background: "#f2f2f2" }}
                          >
                            <div className="card-body">
                              <h4 className="card-title">{todo.taskName}</h4>
                              <p className="card-text">
                                {todo.taskDescription}
                              </p>
                              <div className="card-footer-styles">
                                <div className="row">
                                  <div className="col-10 dueDateText">
                                    <p>
                                      Due date -{" "}
                                      {new Date(
                                        todo.taskDueDate
                                      ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                          todo.taskDueDate
                                        ).toLocaleTimeString()}
                                    </p>
                                    <p>
                                      Last Modified date -{" "}
                                      {new Date(
                                        todo.lastModified
                                      ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                          todo.lastModified
                                        ).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <div
                                    className="col-2"
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <div className="icons-footer">
                                      {/* <span
                                    className="icons-footer-item"
                                    style={{
                                      fontSize: "18px",
                                      margin: "0px 10px",
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span> */}
                                      <span
                                        className="icons-footer-item"
                                        style={{
                                          fontSize: "15px",
                                          background: "#D3D3D3",
                                          padding: "10px",
                                          borderRadius: "25px",
                                        }}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title={
                                          todo.taskStatusId === 1
                                            ? "the task status is TODO you can move next"
                                            : ""
                                        }
                                        onClick={() =>
                                          changeItemToDoing(todo, index)
                                        }
                                      >
                                        <i
                                          className="fa fa-hand-o-right"
                                          aria-hidden="true"
                                          style={{ width: "18px" }}
                                        ></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <button
                    className="add_card-btn"
                    onClick={() => handleAddACardToDo()}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add a card
                  </button>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <span className="icon-area">
                    <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="board-doing">
              <div className="row">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <h3>Doing</h3>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <span className="icon-area">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
              <div className="card-items-section">
                <div className="row m-0">
                  {todoData &&
                    todoData?.map((todo: any, index: any) => {
                      if (todo.taskStatusId === 2) {
                        return (
                          <div
                            className="card mt-3"
                            key={index}
                            style={{ background: "#ADD8E6" }}
                          >
                            <div className="card-body">
                              <h4 className="card-title">{todo.taskName}</h4>
                              <p className="card-text">
                                {todo.taskDescription}
                              </p>
                              <div className="card-footer-styles">
                                <div className="row">
                                  <div className="col-10 dueDateText">
                                    <p>
                                      Due date -{" "}
                                      {new Date(
                                        todo.taskDueDate
                                      ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                          todo.taskDueDate
                                        ).toLocaleTimeString()}
                                    </p>
                                    <p>
                                      Last Modified date -{" "}
                                      {new Date(
                                        todo.lastModified
                                      ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                          todo.lastModified
                                        ).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <div
                                    className="col-2"
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <div className="icons-footer">
                                      {/* <span
                                    className="icons-footer-item"
                                    style={{
                                      fontSize: "18px",
                                      margin: "0px 10px",
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span> */}
                                      <span
                                        className="icons-footer-item"
                                        style={{
                                          fontSize: "15px",
                                          background: "#0000FF",
                                          padding: "10px",
                                          borderRadius: "25px",
                                          color: "#fff",
                                        }}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title={
                                          todo.taskStatusId === 2
                                            ? "the task status is Doing you can move next done"
                                            : ""
                                        }
                                        onClick={() =>
                                          changeItemToDoing(todo, index)
                                        }
                                      >
                                        <i
                                          className="fa fa-hand-o-right"
                                          aria-hidden="true"
                                          style={{ width: "18px" }}
                                        ></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              {/* <div className="row mt-5">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <button className="add_card-btn">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Add a card
                  </button>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <span className="icon-area">
                    <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <div className="board-done">
              <div className="row">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <h3>Done</h3>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <span className="icon-area">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
              <div className="card-items-section">
                <div className="row m-0">
                  {todoData &&
                    todoData?.map((todo: any, index: any) => {
                      if (todo.taskStatusId === 3) {
                        return (
                          <div
                            className="card mt-3"
                            key={index}
                            style={{ background: "#90EE90" }}
                          >
                            <div className="card-body">
                              <h4 className="card-title">{todo.taskName}</h4>
                              <p className="card-text">
                                {todo.taskDescription}
                              </p>
                              <div className="card-footer-styles">
                                <div className="row">
                                  <div className="col-10 dueDateText">
                                    <p>
                                      Due date -{" "}
                                      {new Date(
                                        todo.taskDueDate
                                      ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                          todo.taskDueDate
                                        ).toLocaleTimeString()}
                                    </p>
                                    <p>
                                      Last Modified date -{" "}
                                      {new Date(
                                        todo.lastModified
                                      ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                          todo.lastModified
                                        ).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <div
                                    className="col-2"
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <div className="icons-footer">
                                      {/* <span
                                    className="icons-footer-item"
                                    style={{
                                      fontSize: "18px",
                                      margin: "0px 10px",
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span> */}
                                      <span
                                        className="icons-footer-item"
                                        style={{
                                          fontSize: "15px",
                                          background: "#008000",
                                          padding: "10px",
                                          borderRadius: "25px",
                                          color: "#fff",
                                        }}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title={
                                          todo.taskStatusId === 3
                                            ? "the task status is Done you can not move next"
                                            : ""
                                        }
                                        onClick={() =>
                                          changeItemToDoing(todo, index)
                                        }
                                      >
                                        <i
                                          className={`${
                                            todo.taskStatusId === 3
                                              ? "fa fa-hand-o-up"
                                              : "fa fa-hand-o-right"
                                          }`}
                                          aria-hidden="true"
                                          style={{ width: "18px" }}
                                        ></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              {/* <div className="row mt-5">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <button className="add_card-btn">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Add a card
                  </button>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <span className="icon-area">
                    <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
