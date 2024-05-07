import React, { useState } from "react";
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

interface IProps {
  isOpen: boolean;
  handleCloseModal: any;
  item?: any;
}

const AddToDoModals: React.FC<IProps> = (props: IProps) => {
  const { item } = props;
  const [inputTodo, setInputToDo] = useState<any>({
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
  const dispatch: any = useDispatch();

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
    } else if (!inputTodo.startDate) {
      isValid = false;
      errors.startDate = 'Start date is required';
    } else if (!inputTodo.dueDate) {
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

  const handleInputTodo = (evnt: any) => {
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
      } else {
        setInputToDo({
          ...inputTodo,
          attachment: null,
        });
      }
    } else if (name === "startDate") {
      console.log("check name", name);
      const startDateValue = value ? value : new Date();
      console.log("check startDate", startDateValue, value);
      setInputToDo({ ...inputTodo, startDate: startDateValue });
    } else if (name === "dueDateRemainder") {
      const selectedOption =
        evnt.target.options[evnt.target.selectedIndex].text;
      // setInputToDo({ ...inputTodo, [name]: selectedOption });
      setInputToDo({ ...inputTodo, dueDateRemainder: selectedOption });
    } else {
      setInputToDo({ ...inputTodo, [name]: evnt?.target.value });
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
    setInputToDo((prevInputTodo: any) => ({
      ...prevInputTodo,
      // Add any additional logic here to update the state with the values
    }));
  };

  const handleRemove = () => {
    console.log("remove data");
    handleRightSideButtonsClick();
    setInputToDo((prevInputTodo: any) => ({
      ...prevInputTodo,
      startDate: "",
      dueDate: "",
      dueDateRemainder: "",
      attachment: null,
    }));
  };

  return (
    <>
      <Modal
        show={props.isOpen}
        onHide={props.handleCloseModal}
        backdrop="static"
        dialogClassName="custom-modal-dialog"
        contentClassName="custom-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="left-header">
              <h2>Add Request </h2>
              <span style={{ fontSize: "12px" }}>in list ToDo </span>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-6 left-modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label label-class">
                    <i className="fa fa-eyedropper" aria-hidden="true"></i> ToDo
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="todoName"
                    aria-describedby="todoName"
                    name="todoName"
                    placeholder="Please enter name of the task"
                    value={inputTodo.todoName}
                    onChange={(evnt) => handleInputTodo(evnt)}
                    style={{ fontSize: "14px", backgroundColor: "#f8f9fa" }}
                  />
                  {errors.todoName && (
                    <p className="errorMessage">{errors.todoName}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label  label-class">
                    <i className="fa fa-commenting-o" aria-hidden="true">
                      {" "}
                    </i>{" "}
                    Descriptions
                  </label>
                  <textarea
                    className="form-control"
                    id="descriptions"
                    name="descriptions"
                    rows={5}
                    placeholder="Add a more detailed description"
                    value={inputTodo.descriptions}
                    onChange={(evnt) => handleInputTodo(evnt)}
                    style={{ fontSize: "14px", backgroundColor: "#f8f9fa" }}
                  ></textarea>
                </div>
                {errors.descriptions && (
                    <p className="errorMessage">{errors.descriptions}</p>
                )}
              </form>
            </div>
            <div className="col-6 right-modal-body">
              {showRightSideButtons && (
                <>
                  <h3>Add to Card</h3>
                  <button className="date-button" onClick={handleDatesClick}>
                    <i className="fa fa-clock-o" aria-hidden="true"></i> Dates
                  </button>
                  <button
                    className="attachment-button"
                    onClick={handleAttachmentsClick}
                  >
                    <i className="fa fa-paperclip" aria-hidden="true"></i>{" "}
                    Attachments
                  </button>
                </>
              )}

              {showDates && (
                <div className="right-content">
                  <div className="d-flex justify-content-between align-items-center right-context-header mb-2">
                    <h3>Dates</h3>
                    <span
                      className="close-icon"
                      onClick={handleRightSideButtonsClick}
                    >
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-check-label">Start Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="start_date"
                      name="startDate"
                      value={inputTodo.startDate}
                      onChange={(evnt) => handleInputTodo(evnt)}
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-check-label">Due Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="due_date"
                      name="dueDate"
                      value={inputTodo.dueDate}
                      onChange={(evnt) => handleInputTodo(evnt)}
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <div className="mb-3">
                    {/* <select 
                    className="form-select" 
                    name = "dueDateRemainder" 
                    style={{fontSize: '14px'}} 
                    id="dueDateRemainder"
                    value={inputTodo.dueDateRemainder}
                    onChange={(evnt) => handleInputTodo(evnt)}
                    >
                    <option value="">Set due date reminder</option>
                    <option value="1">1 day before</option>
                    <option value="2">2 days before</option>
                    <option value="3">3 days before</option>
                    <option value="7">1 week before</option>
                  </select> */}
                    <select
                      className="form-select"
                      name="dueDateRemainder"
                      style={{ fontSize: "14px" }}
                      id="dueDateRemainder"
                      value={inputTodo.dueDateRemainder}
                      onChange={(evnt) => handleInputTodo(evnt)}
                    >
                      {Object.entries(options).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="right-content-footer">
                    <button
                      className="btn btn-primary date-save-btn"
                      onClick={handleSave}
                    >
                      {" "}
                      Save
                    </button>
                    <button
                      className="btn btn-danger date-remove-btn"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              
              {showAttachments && (
                <div className="right-content">
                  <div className="d-flex justify-content-between align-items-center right-context-header mb-3">
                    <h3>Attachments</h3>
                    <span
                      className="close-icon"
                      onClick={handleRightSideButtonsClick}
                    >
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      File Attachment
                    </label>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png, docx, .pdf, .txt"
                      className="form-control file_attachment"
                      id="formFile"
                      name="attachment"
                      onChange={(evnt) => handleInputTodo(evnt)}
                    />
                  </div>
                  {inputTodo.attachment && (
                    <div className="image-preview m-2">
                      <img
                        src={inputTodo.attachment}
                        alt="Preview"
                        width="125"
                        height="125"
                      />
                    </div>
                  )}
                  <div className="right-content-footer">
                    <button
                      className="btn btn-primary date-save-btn"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger date-remove-btn"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              {errors.tasksDate && (
                <p className="errorMessage">{errors.tasksDate}</p>
              )}
              {errors.startDate && (
                <p className="errorMessage">{errors.startDate}</p>
              )}
              {errors.dueDate && (
                <p className="errorMessage">{errors.dueDate}</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer-buttons">
          <Button
            className="close-btn"
            variant="secondary"
            onClick={props.handleCloseModal}
          >
            Close
          </Button>
          <Button
            className="save-btn"
            variant="primary"
            onClick={handleAddTodo}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToDoModals;
