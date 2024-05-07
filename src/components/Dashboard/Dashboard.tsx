import React, { useState, useEffect } from "react";
import { defaultPingInterval, defaultMaxFileSize } from "../App/Config";
import { userLogout } from "../../utils/globalUtility";
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
  const dispatch: any = useDispatch();
  const userInfo = getUserInfo();

  const [addTodos, setAddTodos] = useState<any>([]);
  const [boardName, setBoardName] = useState<any>("");
  const [isBoard, setIsBoard] = useState<any>(true);
  const [isTable, setIsTable] = useState<any>(false);
  const [isCalender, setIsCalender] = useState<any>(false);
  const [sidebarMenu, setSidebarMenu] = useState<any>("");

  const { boardData } = useSelector(
    (state: any) => state.AddToDoReducers && state.AddToDoReducers
  );

  const defaultBoardName = () => {
    const addedname = {
      boardName: boardName,
      user: {
        id: userInfo?.id,
      },
    };
    dispatch(actions.addBoardName(addedname));
  };

  useEffect(() => {
    if ((boardData.length = 0)) {
      defaultBoardName();
    }
    dispatch(actions.getBoardName(userInfo?.id));
  }, []);

  useEffect(() => {
    if (boardData) {
      if (
        sessionStorage.getItem("board_data") === null ||
        sessionStorage.getItem("board_data") === "" ||
        sessionStorage.getItem("board_data") === undefined
      ) {
        sessionStorage.setItem("board_data", JSON.stringify(boardData?.[0]));
      }
      setAddTodos(boardData);
      dispatch(actions.getTodoData(userInfo?.id));
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

  const updateInputFields = (index: any, evnt: any) => {
    const rows = [...addTodos];
    rows[index].isEditing = false;
    const addedname = {
      boardName: boardName,
      id:rows[index].id,
      user: {
        id: userInfo?.id,
      },
    };
    dispatch(actions.addBoardName(addedname));
    setAddTodos(rows);
  };

  const editInputFields = (index: any, evnt: any, data: any) => {
    const rows = [...addTodos];
    rows[index].isEditing = true;
    setAddTodos(rows);
    // if(data?.id){
    //   console.log("edit",data)
    // }
  };

  const removeInputFields = (index: any, evnt: any) => {
    const rows = [...addTodos];
    dispatch(actions.removeBoard(rows[index].id))
    window.location.reload();
  };

  const navigateToScreen = (index: any, evnt: any, data: any) => {
    evnt.preventDefault();
    sessionStorage.setItem("board_id", data.id);
    sessionStorage.setItem("board_data", JSON.stringify(data));
    dispatch(actions.getTodoDataBoardId(data?.id, userInfo?.id));
  };

  const handleInputChange = (index: any, evnt: any) => {
    const { name, value } = evnt.target;
    const list: any = [...addTodos];
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

  return (
    <>
      <div className="dashboard-con row flex-nowrap">
        <Sidebar
          addTodos={addTodos}
          addInputField={addInputField}
          updateInputFields={updateInputFields}
          editInputFields={editInputFields}
          removeInputFields={removeInputFields}
          handleInputChange={handleInputChange}
          navigateToScreen={navigateToScreen}
        />

        <div className="col container-data">
          <Header
            items={items}
            onLinkClick={(href) => {
              if (href === "/board") {
                handleOpenBoard();
              } else if (href === "/table") {
                handleOpenTable();
              } else if (href === "/calender") {
                handleOpenCalender();
              }
            }}
            isBoard={isBoard}
            isTable={isTable}
            isCalender={isCalender}
          />
          {}
          <div className="content-container">
            {isBoard && <Board />}
            {isTable && <TableComponent />}
            {isCalender && <CalenderData />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
