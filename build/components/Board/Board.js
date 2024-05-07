import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import "./Board.css";
import AddToDoModals from "components/Modals/AddToDoModals";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
const Board = () => {
    const dispatch = useDispatch();
    const [toDoList, setToDoList] = useState([]);
    const [isOpenAddToDo, setIsOpenAddToDo] = useState(false);
    const [itemStatusChanged, setItemStatusChanged] = useState({
        todo: null,
        index: null,
    });
    // const todoData: any = []
    const todoData = useSelector((state) => state.AddToDoReducers && state.AddToDoReducers.todoData);
    const handleAddACardToDo = () => {
        setIsOpenAddToDo(true);
    };
    const handleCloseAddTodoModal = () => {
        setIsOpenAddToDo(false);
    };
    const changeItemToDoing = (todo, index) => {
        var _a;
        let newData = todo;
        if (todo.taskStatusId === 1) {
            newData["taskStatusId"] = 2;
        }
        else if (todo.taskStatusId === 2) {
            newData["taskStatusId"] = 3;
        }
        const requestPayload = {
            id: todo === null || todo === void 0 ? void 0 : todo.id,
            board: {
                id: (_a = todo === null || todo === void 0 ? void 0 : todo.board) === null || _a === void 0 ? void 0 : _a.id,
            },
            taskStatusId: newData["taskStatusId"],
        };
        console.log(requestPayload);
        dispatch(actions.updateTodoStatus(requestPayload));
        setItemStatusChanged({ todo: todo, index: index });
    };
    return (_jsxs(_Fragment, { children: [isOpenAddToDo && (_jsx(AddToDoModals, { isOpen: isOpenAddToDo, handleCloseModal: handleCloseAddTodoModal })), _jsx("div", { className: "board-area", children: _jsxs("div", { className: "row gy-3", children: [_jsx("div", { className: "col-sm-12 col-md-4 col-lg-4", children: _jsxs("div", { className: "board-todo", children: [_jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-8 col-md-8 col-lg-8", children: _jsx("h3", { children: "ToDo" }) }), _jsx("div", { className: "col-sm-4 col-md-4 col-lg-4", children: _jsx("span", { className: "icon-area", children: _jsx("i", { className: "fa fa-ellipsis-h", "aria-hidden": "true" }) }) })] }), _jsx("div", { className: "card-items-section", children: _jsx("div", { className: "row m-0", children: todoData &&
                                                (todoData === null || todoData === void 0 ? void 0 : todoData.map((todo, index) => {
                                                    if (todo.taskStatusId === 1) {
                                                        return (_jsx("div", { className: "card mt-3", style: { background: "#f2f2f2" }, children: _jsxs("div", { className: "card-body", children: [_jsx("h4", { className: "card-title", children: todo.taskName }), _jsx("p", { className: "card-text", children: todo.taskDescription }), _jsx("div", { className: "card-footer-styles", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-10 dueDateText", children: [_jsxs("p", { children: ["Due date -", " ", new Date(todo.taskDueDate).toLocaleDateString() +
                                                                                                    " " +
                                                                                                    new Date(todo.taskDueDate).toLocaleTimeString()] }), _jsxs("p", { children: ["Last Modified date -", " ", new Date(todo.lastModified).toLocaleDateString() +
                                                                                                    " " +
                                                                                                    new Date(todo.lastModified).toLocaleTimeString()] })] }), _jsx("div", { className: "col-2", style: {
                                                                                        alignItems: "center",
                                                                                        display: "flex",
                                                                                    }, children: _jsx("div", { className: "icons-footer", children: _jsx("span", { className: "icons-footer-item", style: {
                                                                                                fontSize: "15px",
                                                                                                background: "#D3D3D3",
                                                                                                padding: "10px",
                                                                                                borderRadius: "25px",
                                                                                            }, "data-toggle": "tooltip", "data-placement": "top", title: todo.taskStatusId === 1
                                                                                                ? "the task status is TODO you can move next"
                                                                                                : "", onClick: () => changeItemToDoing(todo, index), children: _jsx("i", { className: "fa fa-hand-o-right", "aria-hidden": "true", style: { width: "18px" } }) }) }) })] }) })] }) }, index));
                                                    }
                                                })) }) }), _jsxs("div", { className: "row mt-5", children: [_jsx("div", { className: "col-sm-8 col-md-8 col-lg-8", children: _jsxs("button", { className: "add_card-btn", onClick: () => handleAddACardToDo(), children: [_jsx("i", { className: "fa fa-plus", "aria-hidden": "true" }), " Add a card"] }) }), _jsx("div", { className: "col-sm-4 col-md-4 col-lg-4", children: _jsx("span", { className: "icon-area", children: _jsx("i", { className: "fa fa-calendar-plus-o", "aria-hidden": "true" }) }) })] })] }) }), _jsx("div", { className: "col-sm-12 col-md-4 col-lg-4", children: _jsxs("div", { className: "board-doing", children: [_jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-8 col-md-8 col-lg-8", children: _jsx("h3", { children: "Doing" }) }), _jsx("div", { className: "col-sm-4 col-md-4 col-lg-4", children: _jsx("span", { className: "icon-area", children: _jsx("i", { className: "fa fa-ellipsis-h", "aria-hidden": "true" }) }) })] }), _jsx("div", { className: "card-items-section", children: _jsx("div", { className: "row m-0", children: todoData &&
                                                (todoData === null || todoData === void 0 ? void 0 : todoData.map((todo, index) => {
                                                    if (todo.taskStatusId === 2) {
                                                        return (_jsx("div", { className: "card mt-3", style: { background: "#ADD8E6" }, children: _jsxs("div", { className: "card-body", children: [_jsx("h4", { className: "card-title", children: todo.taskName }), _jsx("p", { className: "card-text", children: todo.taskDescription }), _jsx("div", { className: "card-footer-styles", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-10 dueDateText", children: [_jsxs("p", { children: ["Due date -", " ", new Date(todo.taskDueDate).toLocaleDateString() +
                                                                                                    " " +
                                                                                                    new Date(todo.taskDueDate).toLocaleTimeString()] }), _jsxs("p", { children: ["Last Modified date -", " ", new Date(todo.lastModified).toLocaleDateString() +
                                                                                                    " " +
                                                                                                    new Date(todo.lastModified).toLocaleTimeString()] })] }), _jsx("div", { className: "col-2", style: {
                                                                                        alignItems: "center",
                                                                                        display: "flex",
                                                                                    }, children: _jsx("div", { className: "icons-footer", children: _jsx("span", { className: "icons-footer-item", style: {
                                                                                                fontSize: "15px",
                                                                                                background: "#0000FF",
                                                                                                padding: "10px",
                                                                                                borderRadius: "25px",
                                                                                                color: "#fff",
                                                                                            }, "data-toggle": "tooltip", "data-placement": "top", title: todo.taskStatusId === 2
                                                                                                ? "the task status is Doing you can move next done"
                                                                                                : "", onClick: () => changeItemToDoing(todo, index), children: _jsx("i", { className: "fa fa-hand-o-right", "aria-hidden": "true", style: { width: "18px" } }) }) }) })] }) })] }) }, index));
                                                    }
                                                })) }) })] }) }), _jsx("div", { className: "col-sm-12 col-md-4 col-lg-4", children: _jsxs("div", { className: "board-done", children: [_jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-8 col-md-8 col-lg-8", children: _jsx("h3", { children: "Done" }) }), _jsx("div", { className: "col-sm-4 col-md-4 col-lg-4", children: _jsx("span", { className: "icon-area", children: _jsx("i", { className: "fa fa-ellipsis-h", "aria-hidden": "true" }) }) })] }), _jsx("div", { className: "card-items-section", children: _jsx("div", { className: "row m-0", children: todoData &&
                                                (todoData === null || todoData === void 0 ? void 0 : todoData.map((todo, index) => {
                                                    if (todo.taskStatusId === 3) {
                                                        return (_jsx("div", { className: "card mt-3", style: { background: "#90EE90" }, children: _jsxs("div", { className: "card-body", children: [_jsx("h4", { className: "card-title", children: todo.taskName }), _jsx("p", { className: "card-text", children: todo.taskDescription }), _jsx("div", { className: "card-footer-styles", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-10 dueDateText", children: [_jsxs("p", { children: ["Due date -", " ", new Date(todo.taskDueDate).toLocaleDateString() +
                                                                                                    " " +
                                                                                                    new Date(todo.taskDueDate).toLocaleTimeString()] }), _jsxs("p", { children: ["Last Modified date -", " ", new Date(todo.lastModified).toLocaleDateString() +
                                                                                                    " " +
                                                                                                    new Date(todo.lastModified).toLocaleTimeString()] })] }), _jsx("div", { className: "col-2", style: {
                                                                                        alignItems: "center",
                                                                                        display: "flex",
                                                                                    }, children: _jsx("div", { className: "icons-footer", children: _jsx("span", { className: "icons-footer-item", style: {
                                                                                                fontSize: "15px",
                                                                                                background: "#008000",
                                                                                                padding: "10px",
                                                                                                borderRadius: "25px",
                                                                                                color: "#fff",
                                                                                            }, "data-toggle": "tooltip", "data-placement": "top", title: todo.taskStatusId === 3
                                                                                                ? "the task status is Done you can not move next"
                                                                                                : "", onClick: () => changeItemToDoing(todo, index), children: _jsx("i", { className: `${todo.taskStatusId === 3
                                                                                                    ? "fa fa-hand-o-up"
                                                                                                    : "fa fa-hand-o-right"}`, "aria-hidden": "true", style: { width: "18px" } }) }) }) })] }) })] }) }, index));
                                                    }
                                                })) }) })] }) })] }) })] }));
};
export default Board;
