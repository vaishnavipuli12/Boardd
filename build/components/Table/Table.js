import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import AddToDoModals from '../Modals/AddToDoModals';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "components/Constant/ConstantFunction";
const tableHeaderData = ['Title', 'Description', 'Last Modified', 'Due Date', 'Status'];
const TableData = [
    {
        key: 1,
        taskItem: "portfolio",
        status: "Todo",
        attachment: "img.jpg",
        labels: "practice"
    },
    {
        key: 2,
        taskItem: "preparation",
        status: "Doing",
        attachment: "-",
        labels: "study"
    },
    {
        key: 3,
        taskItem: "requirements",
        status: "Done",
        attachment: "tasks.docx",
        labels: "-"
    },
    {
        key: 4,
        taskItem: "Review Feedback",
        status: "Doing",
        attachment: "-",
        labels: "Urgent"
    },
    {
        key: 5,
        taskItem: "Meeting with Client",
        status: "Todo",
        attachment: "-",
        labels: "Important"
    },
];
const TableComponent = () => {
    const dispatch = useDispatch();
    const userInfo = getUserInfo();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { getAllTasksData } = useSelector((state) => state.AddToDoReducers && state.AddToDoReducers);
    const { todoData } = useSelector((state) => state.AddToDoReducers && state.AddToDoReducers);
    console.log("get all tasks data", getAllTasksData, "todo data", todoData);
    const todoItem = (item) => {
        console.log("check item 45", item);
        // setSelectedItem(item);
        // setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };
    // useEffect(() => {
    //   // dispatch(actions.getAllTasks(userInfo?.id));
    //   dispatch(actions.getTodoData(userInfo?.id));
    // }, [])
    const getTaskStatus = (taskStatusId) => {
        switch (taskStatusId) {
            case 1:
                return _jsx("span", { style: { color: 'blue' }, children: "Todo" });
            case 2:
                return _jsx("span", { style: { color: 'orange' }, children: "Doing" });
            case 3:
                return _jsx("span", { style: { color: 'green' }, children: "Done" });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "ms-3 me-3", children: [_jsx("h3", { children: "Tasks Table View" }), _jsxs(Table, { striped: true, bordered: true, hover: true, children: [_jsx("thead", { children: _jsx("tr", { children: tableHeaderData.map((item, index) => (_jsx("th", { style: { borderBottom: 'none' }, children: item }, index))) }) }), _jsx("tbody", { children: todoData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, children: "No tasks were added." }) })) : (todoData.map((item) => (_jsxs("tr", { onClick: () => todoItem(item), children: [_jsx("td", { children: item.taskName }), _jsx("td", { children: item.taskDescription }), _jsx("td", { children: item.lastModified }), _jsx("td", { children: item.taskDueDate }), _jsx("td", { children: getTaskStatus(item.taskStatusId) })] }, item.key)))) })] }), showModal && _jsx(AddToDoModals, { isOpen: true, item: selectedItem, handleCloseModal: closeModal })] }));
};
export default TableComponent;
