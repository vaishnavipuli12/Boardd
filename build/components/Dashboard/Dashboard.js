import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Board from "../Board/Board";
import TableComponent from "../Table/Table";
import CalenderData from "../Calender/Calender";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
import { getUserInfo } from "components/Constant/ConstantFunction";
const items = [
    {
        name: "Board",
        href: "/board",
        key: "board",
        icon: "fa fa-tasks",
    },
    {
        name: "Table",
        href: "/table",
        key: "table",
        icon: "fa fa-table",
    },
    {
        name: "Calender",
        href: "/calender",
        key: "calender",
        icon: "fa fa-calendar",
    },
];
const Dashboard = () => {
    const dispatch = useDispatch();
    const userInfo = getUserInfo();
    const [addTodos, setAddTodos] = useState([]);
    const [boardName, setBoardName] = useState("");
    const [isBoard, setIsBoard] = useState(true);
    const [isTable, setIsTable] = useState(false);
    const [isCalender, setIsCalender] = useState(false);
    const [sidebarMenu, setSidebarMenu] = useState("");
    const { boardData } = useSelector((state) => state.AddToDoReducers && state.AddToDoReducers);
    const defaultBoardName = () => {
        const addedname = {
            boardName: boardName,
            user: {
                id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id,
            },
        };
        dispatch(actions.addBoardName(addedname));
    };
    useEffect(() => {
        if ((boardData.length = 0)) {
            defaultBoardName();
        }
        dispatch(actions.getBoardName(userInfo === null || userInfo === void 0 ? void 0 : userInfo.id));
    }, []);
    useEffect(() => {
        if (boardData) {
            if (sessionStorage.getItem("board_data") === null ||
                sessionStorage.getItem("board_data") === "" ||
                sessionStorage.getItem("board_data") === undefined) {
                sessionStorage.setItem("board_data", JSON.stringify(boardData === null || boardData === void 0 ? void 0 : boardData[0]));
            }
            setAddTodos(boardData);
            dispatch(actions.getTodoData(userInfo === null || userInfo === void 0 ? void 0 : userInfo.id));
        }
    }, [boardData]);
    const addInputField = () => {
        const count = addTodos.length + 1;
        const defaultBoardName = `boardName${count}`;
        setAddTodos([
            ...addTodos,
            {
                boardName: defaultBoardName,
                isEditing: false,
            },
        ]);
    };
    const updateInputFields = (index, evnt) => {
        const rows = [...addTodos];
        rows[index].isEditing = false;
        const addedname = {
            boardName: boardName,
            id: rows[index].id,
            user: {
                id: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id,
            },
        };
        dispatch(actions.addBoardName(addedname));
        setAddTodos(rows);
    };
    const editInputFields = (index, evnt, data) => {
        const rows = [...addTodos];
        rows[index].isEditing = true;
        setAddTodos(rows);
        // if(data?.id){
        //   console.log("edit",data)
        // }
    };
    const removeInputFields = (index, evnt) => {
        const rows = [...addTodos];
        dispatch(actions.removeBoard(rows[index].id));
        window.location.reload();
    };
    const navigateToScreen = (index, evnt, data) => {
        evnt.preventDefault();
        sessionStorage.setItem("board_id", data.id);
        sessionStorage.setItem("board_data", JSON.stringify(data));
        dispatch(actions.getTodoDataBoardId(data === null || data === void 0 ? void 0 : data.id, userInfo === null || userInfo === void 0 ? void 0 : userInfo.id));
    };
    const handleInputChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...addTodos];
        list[index][name] = value;
        setAddTodos(list);
        setBoardName(value);
    };
    const handleOpenBoard = () => {
        setIsBoard(true);
        setIsTable(false);
        setIsCalender(false);
    };
    const handleOpenTable = () => {
        setIsBoard(false);
        setIsTable(true);
        setIsCalender(false);
    };
    const handleOpenCalender = () => {
        setIsBoard(false);
        setIsTable(false);
        setIsCalender(true);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "dashboard-con row flex-nowrap", children: [_jsx(Sidebar, { addTodos: addTodos, addInputField: addInputField, updateInputFields: updateInputFields, editInputFields: editInputFields, removeInputFields: removeInputFields, handleInputChange: handleInputChange, navigateToScreen: navigateToScreen }), _jsxs("div", { className: "col container-data", children: [_jsx(Header, { items: items, onLinkClick: (href) => {
                                if (href === "/board") {
                                    handleOpenBoard();
                                }
                                else if (href === "/table") {
                                    handleOpenTable();
                                }
                                else if (href === "/calender") {
                                    handleOpenCalender();
                                }
                            }, isBoard: isBoard, isTable: isTable, isCalender: isCalender }), _jsxs("div", { className: "content-container", children: [isBoard && _jsx(Board, {}), isTable && _jsx(TableComponent, {}), isCalender && _jsx(CalenderData, {})] })] })] }) }));
};
export default Dashboard;
