import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
// import DateTimePicker from 'react-bootstrap-datetimepicker';
// import 'react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import moment from "moment";
import * as actions from "../../store/UserInfo/actions";
// import CustomStaticDateTime from './CustomStaticDateTime';
// import CustomDateTimePicker from './CustomDateTimePicker';
import "./ModalStyles.css";
const AddToDoModals = (props) => {
    const { item } = props;
    const [inputTodo, setInputToDo] = useState({
        todoName: "",
        descriptions: "",
        startDate: "",
        dueDate: "",
        dueDateRemainder: "",
        attachment: null,
    });
    const [showLoader, setShowLoader] = useState(false);
    const [showDates, setShowDates] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const [showRightSideButtons, setShowRightSideButtons] = useState(true);
    const [errors, setErrors] = useState({
        todoName: "",
        descriptions: "",
        startDate: "",
        dueDate: "",
        tasksDate: ""
    });
    const [apiError, setApiError] = useState("");
    const dispatch = useDispatch();
    const options = {
        "": "Set due date reminder",
        "1": "1 day before",
        "2": "2 days before",
        "3": "3 days before",
        "7": "1 week before",
    };
    const validateForm = () => {
        let isValid = true;
        let errors = { todoName: "", descriptions: "", startDate: "", dueDate: "", tasksDate: "" };
        if (!inputTodo.todoName) {
            isValid = false;
            errors.todoName = "Todo name is required";
        }
        if (!inputTodo.descriptions) {
            isValid = false;
            errors.descriptions = "Descriptions is required";
        }
        if (!inputTodo.startDate && !inputTodo.dueDate) {
            isValid = false;
            errors.tasksDate = 'Start date & Due date is required';
        }
        else if (!inputTodo.startDate) {
            isValid = false;
            errors.startDate = 'Start date is required';
        }
        else if (!inputTodo.dueDate) {
            isValid = false;
            errors.dueDate = 'Due date is required';
        }
        return { isValid, errors };
    };
    const handleRightSideButtonsClick = () => {
        setShowRightSideButtons(true);
        setShowDates(false);
        setShowAttachments(false);
    };
    const handleDatesClick = () => {
        setShowDates(true);
        setShowAttachments(false);
        setShowRightSideButtons(false);
    };
    const handleAttachmentsClick = () => {
        setShowDates(false);
        setShowAttachments(true);
        setShowRightSideButtons(false);
    };
    const handleInputTodo = (evnt) => {
        const { name, value, files } = evnt.target;
        if (name === "attachment") {
            // Get the selected file
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setInputToDo({
                        ...inputTodo,
                        attachment: reader.result,
                    });
                };
                if (!reader.readyState || reader.readyState === 2) {
                    reader.readAsDataURL(file);
                }
            }
            else {
                setInputToDo({
                    ...inputTodo,
                    attachment: null,
                });
            }
        }
        else if (name === "startDate") {
            console.log("check name", name);
            const startDateValue = value ? value : new Date();
            console.log("check startDate", startDateValue, value);
            setInputToDo({ ...inputTodo, startDate: startDateValue });
        }
        else if (name === "dueDateRemainder") {
            const selectedOption = evnt.target.options[evnt.target.selectedIndex].text;
            // setInputToDo({ ...inputTodo, [name]: selectedOption });
            setInputToDo({ ...inputTodo, dueDateRemainder: selectedOption });
        }
        else {
            setInputToDo({ ...inputTodo, [name]: evnt === null || evnt === void 0 ? void 0 : evnt.target.value });
        }
    };
    const handleAddTodo = () => {
        const { isValid, errors } = validateForm();
        if (!isValid) {
            setErrors({ ...errors });
            return;
        }
        // const todoData = {
        //   ...inputTodo,
        //   attachment: inputTodo.attachment,
        //   startDate: moment(inputTodo.startDate).format('DD/MM/YYYY hh:mm A'),
        //   dueDate: moment(inputTodo.dueDate).format('DD/MM/YYYY hh:mm A'),
        //   dueDateRemainder: inputTodo.dueDateRemainder,
        // };
        const todoData = {
            taskName: inputTodo.todoName,
            taskDescription: inputTodo.descriptions,
            // attachment: inputTodo.attachment, 
            taskStatusId: 1,
            // startDate: moment(inputTodo.startDate).format('DD/MM/YYYY hh:mm A'),
            taskDueDate: moment(inputTodo.dueDate).format("YYYY-MM-DD"),
            // dueDateRemainder: inputTodo.dueDateRemainder,
            board: {
                id: parseInt(sessionStorage.getItem("board_id") || ""),
            },
        };
        dispatch(actions.addTodoData(todoData));
        props.handleCloseModal(false);
    };
    const handleSave = () => {
        console.log("save data");
        handleRightSideButtonsClick();
        setInputToDo((prevInputTodo) => ({
            ...prevInputTodo,
            // Add any additional logic here to update the state with the values
        }));
    };
    const handleRemove = () => {
        console.log("remove data");
        handleRightSideButtonsClick();
        setInputToDo((prevInputTodo) => ({
            ...prevInputTodo,
            startDate: "",
            dueDate: "",
            dueDateRemainder: "",
            attachment: null,
        }));
    };
    return (_jsx(_Fragment, { children: _jsxs(Modal, { show: props.isOpen, onHide: props.handleCloseModal, backdrop: "static", dialogClassName: "custom-modal-dialog", contentClassName: "custom-modal-content", children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: _jsxs("div", { className: "left-header", children: [_jsx("h2", { children: "Add Request " }), _jsx("span", { style: { fontSize: "12px" }, children: "in list ToDo " })] }) }) }), _jsx(Modal.Body, { children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-6 left-modal-body", children: _jsxs("form", { children: [_jsxs("div", { className: "mb-3", children: [_jsxs("label", { className: "form-label label-class", children: [_jsx("i", { className: "fa fa-eyedropper", "aria-hidden": "true" }), " ToDo Name"] }), _jsx("input", { type: "text", className: "form-control", id: "todoName", "aria-describedby": "todoName", name: "todoName", placeholder: "Please enter name of the task", value: inputTodo.todoName, onChange: (evnt) => handleInputTodo(evnt), style: { fontSize: "14px", backgroundColor: "#f8f9fa" } }), errors.todoName && (_jsx("p", { className: "errorMessage", children: errors.todoName }))] }), _jsxs("div", { className: "mb-3", children: [_jsxs("label", { className: "form-label  label-class", children: [_jsx("i", { className: "fa fa-commenting-o", "aria-hidden": "true", children: " " }), " ", "Descriptions"] }), _jsx("textarea", { className: "form-control", id: "descriptions", name: "descriptions", rows: 5, placeholder: "Add a more detailed description", value: inputTodo.descriptions, onChange: (evnt) => handleInputTodo(evnt), style: { fontSize: "14px", backgroundColor: "#f8f9fa" } })] }), errors.descriptions && (_jsx("p", { className: "errorMessage", children: errors.descriptions }))] }) }), _jsxs("div", { className: "col-6 right-modal-body", children: [showRightSideButtons && (_jsxs(_Fragment, { children: [_jsx("h3", { children: "Add to Card" }), _jsxs("button", { className: "date-button", onClick: handleDatesClick, children: [_jsx("i", { className: "fa fa-clock-o", "aria-hidden": "true" }), " Dates"] }), _jsxs("button", { className: "attachment-button", onClick: handleAttachmentsClick, children: [_jsx("i", { className: "fa fa-paperclip", "aria-hidden": "true" }), " ", "Attachments"] })] })), showDates && (_jsxs("div", { className: "right-content", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center right-context-header mb-2", children: [_jsx("h3", { children: "Dates" }), _jsx("span", { className: "close-icon", onClick: handleRightSideButtonsClick, children: _jsx("i", { className: "fa fa-times", "aria-hidden": "true" }) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-check-label", children: "Start Date" }), _jsx("input", { type: "datetime-local", className: "form-control", id: "start_date", name: "startDate", value: inputTodo.startDate, onChange: (evnt) => handleInputTodo(evnt), style: { fontSize: "14px" } })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-check-label", children: "Due Date" }), _jsx("input", { type: "datetime-local", className: "form-control", id: "due_date", name: "dueDate", value: inputTodo.dueDate, onChange: (evnt) => handleInputTodo(evnt), style: { fontSize: "14px" } })] }), _jsx("div", { className: "mb-3", children: _jsx("select", { className: "form-select", name: "dueDateRemainder", style: { fontSize: "14px" }, id: "dueDateRemainder", value: inputTodo.dueDateRemainder, onChange: (evnt) => handleInputTodo(evnt), children: Object.entries(options).map(([value, label]) => (_jsx("option", { value: value, children: label }, value))) }) }), _jsxs("div", { className: "right-content-footer", children: [_jsxs("button", { className: "btn btn-primary date-save-btn", onClick: handleSave, children: [" ", "Save"] }), _jsx("button", { className: "btn btn-danger date-remove-btn", onClick: handleRemove, children: "Remove" })] })] })), showAttachments && (_jsxs("div", { className: "right-content", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center right-context-header mb-3", children: [_jsx("h3", { children: "Attachments" }), _jsx("span", { className: "close-icon", onClick: handleRightSideButtonsClick, children: _jsx("i", { className: "fa fa-times", "aria-hidden": "true" }) })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { htmlFor: "formFile", className: "form-label", children: "File Attachment" }), _jsx("input", { type: "file", accept: ".jpg, .jpeg, .png, docx, .pdf, .txt", className: "form-control file_attachment", id: "formFile", name: "attachment", onChange: (evnt) => handleInputTodo(evnt) })] }), inputTodo.attachment && (_jsx("div", { className: "image-preview m-2", children: _jsx("img", { src: inputTodo.attachment, alt: "Preview", width: "125", height: "125" }) })), _jsxs("div", { className: "right-content-footer", children: [_jsx("button", { className: "btn btn-primary date-save-btn", onClick: handleSave, children: "Save" }), _jsx("button", { className: "btn btn-danger date-remove-btn", onClick: handleRemove, children: "Remove" })] })] })), errors.tasksDate && (_jsx("p", { className: "errorMessage", children: errors.tasksDate })), errors.startDate && (_jsx("p", { className: "errorMessage", children: errors.startDate })), errors.dueDate && (_jsx("p", { className: "errorMessage", children: errors.dueDate }))] })] }) }), _jsxs(Modal.Footer, { className: "footer-buttons", children: [_jsx(Button, { className: "close-btn", variant: "secondary", onClick: props.handleCloseModal, children: "Close" }), _jsx(Button, { className: "save-btn", variant: "primary", onClick: handleAddTodo, children: "Save" })] })] }) }));
};
export default AddToDoModals;
