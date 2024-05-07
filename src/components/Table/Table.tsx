import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import AddToDoModals from '../Modals/AddToDoModals';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
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
  const dispatch: any = useDispatch();
  const userInfo = getUserInfo();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { getAllTasksData } = useSelector(
    (state: any) => state.AddToDoReducers && state.AddToDoReducers
  );
    
  const { todoData } = useSelector(
    (state: any) => state.AddToDoReducers && state.AddToDoReducers
  );

  console.log("get all tasks data", getAllTasksData, "todo data", todoData);

  const todoItem = (item: any) => {
    console.log("check item 45", item);
    // setSelectedItem(item);
    // setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  }

  // useEffect(() => {
  //   // dispatch(actions.getAllTasks(userInfo?.id));
  //   dispatch(actions.getTodoData(userInfo?.id));
  // }, [])

  const getTaskStatus = (taskStatusId?: number) => {
    switch (taskStatusId) {
      case 1:
        return <span style={{ color: 'blue' }}>Todo</span>;
      case 2:
        return <span style={{ color: 'orange' }}>Doing</span>;
      case 3:
        return <span style={{ color: 'green' }}>Done</span>;
      default:
        return null;
    }
  }

  return (
    <div className="ms-3 me-3">
      <h3>Tasks Table View</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tableHeaderData.map((item, index) => (
              <th key={index} style={{ borderBottom: 'none' }}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            todoData.length === 0 ? (
                <tr>
                  <td colSpan={5}>No tasks were added.</td>
                </tr>
              ) : (
              todoData.map((item: any) =>(
                <tr key={item.key} onClick={() => todoItem(item)}>
                  <td>{item.taskName}</td>
                  <td>{item.taskDescription}</td>
                  <td>{item.lastModified}</td>
                  <td>{item.taskDueDate}</td>
                  <td>{getTaskStatus(item.taskStatusId)}</td>
                  {/* <td className="d-flex justify-content-start fs-5">
                    <i className={'fa fa-pencil-square-o'} aria-hidden="true"> </i> &nbsp; &nbsp;
                    <i className={'fa fa-trash'} aria-hidden="true"> </i>
                  </td> */}
                </tr>
              )))
            }
        </tbody>
      </Table>
      {showModal && <AddToDoModals isOpen={true} item={selectedItem} handleCloseModal={closeModal} />}
    </div>
  );
};

export default TableComponent;