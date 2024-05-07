// @ts-nocheck
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "./../Constant/ConstantFunction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Dashboard.css";
import { decrypt } from "services/EncryptDecrypt";
import { useSelector } from "react-redux";

interface IProps {
  addTodos: any;
  addInputField: any;
  updateInputFields: any;
  editInputFields: any;
  removeInputFields: any;
  handleInputChange: any;
  navigateToScreen: any;
}
const Sidebar: React.FC<IProps> = (props: IProps) => {
  const userInfo = getUserInfo();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isCollapse, setIsCollapse] = useState(true);

  // const sidebarMenuItemStyles = isEditing ? 'form-control sidebar-button-style btn-primary' : 'form-control sidebar-input-style';
  const tabItem = "My personal Board";

  const handleLinkClick = (boardName: any) => {
    console.log("check bioard", props.addTodos);
  };

  const handleCollpaseSideBar = () => {
    setIsCollapse(!isCollapse);
  };

  const open = Boolean(anchorEl);

  const handleClick = (evnt: any) => {
    setAnchorEl(evnt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: any) => {
    // Handle the click event based on the selected option
    console.log("Selected option:", option);
    // Add your logic for each option here (e.g., navigation or logout)
    if (option === "Logout") {
      sessionStorage.removeItem("userInfo");
      sessionStorage.clear();
      navigate("/login");
    }
    if (option === "change-password") {
      navigate("/change-password");
    }
    handleClose();
  };

  const todoData = useSelector(
    (state: any) => state.AddToDoReducers && state.AddToDoReducers.todoData
  );

  return (
    <>
      <div
        className="side-bar-container"
        // className={
        //   isCollapse
        //     ? "side-bar-container col-auto col-md-3 col-xl-2 px-0 px-sm-2"
        //     : "side-bar-container sidebarcollpase col-auto col-md-3 col-xl-2 px-0"
        // }
      >
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <div className="dropdown pb-0 pt-3 w-100">
            <div className="row">
              <div className="col-sm-8 col-md-8 col-lg-8">
                <div
                  className={
                    isCollapse
                      ? "d-flex align-items-center text-white text-decoration-none"
                      : "align-items-center text-white text-center text-decoration-none"
                  }
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    className="rounded-circle"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(evnt) => handleClick(evnt)}
                  />
                  <h4
                    className={
                      isCollapse
                        ? "d-none d-sm-inline mx-1 userName"
                        : "d-none d-sm-inline mx-1"
                    }
                  >
                    {userInfo?.name ? userInfo?.name : "John"}
                  </h4>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  style={{ fontSize: "20px" }}
                >
                  <MenuItem
                    style={{ fontSize: "16px" }}
                    onClick={() => handleMenuItemClick("Home")}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "16px" }}
                    onClick={() => handleMenuItemClick("Profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "16px" }}
                    onClick={() => handleMenuItemClick("change-password")}
                  >
                    Change password
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "16px" }}
                    onClick={() => handleMenuItemClick("Logout")}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="collapse-left" onClick={handleCollpaseSideBar}>
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <hr className="horizontal-rule" />
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item list-item">
              <div className="row align-all-item">
                <div className="col-sm-8 col-md-8 col-lg-8 main-board-name">
                  <a
                    href="#"
                    className="nav-link align-middle text-center link-area"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Your board"
                  >
                    <i
                      className="fa fa-graduation-cap"
                      style={{ marginTop: "5px" }}
                      aria-hidden="true"
                    ></i>
                    {isCollapse && (
                      <span className="ms-1 d-none d-sm-inline">
                        Your Boards
                      </span>
                    )}
                  </a>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="add-button" onClick={props.addInputField}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="row sidebar-navlinks-section">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  {props.addTodos.map((data: any, index: any) => {
                    let isActive = false;
                    todoData.map((item) => {
                      if (item.board.id === data.id) {
                        console.log("check item id", item.board, "data", data);
                        isActive = true;
                      }
                    });
                    const { boardName, isEditing } = data;
                    const sidebarMenuItemStyles = !isEditing
                      ? "form-control sidebar-button-style btn-primary"
                      : "form-control sidebar-input-style";
                    return (
                      <div className="list-item" key={index}>
                        <div className={`form-group form-area mt-3 ${isActive ? "border-area-link" : ""}`}>
                          {isEditing ? (
                            <input
                              type="text"
                              onChange={(evnt) =>
                                props.handleInputChange(index, evnt)
                              }
                              value={boardName}
                              name="boardName"
                              className={sidebarMenuItemStyles}
                              placeholder="board name"
                            />
                          ) : (
                            // <button
                            //   className="btn btn-outline-primary readOnly-btn"
                            //   onClick={(evnt) => props.navigateToScreen(index, evnt)}
                            // >
                            //   {boardName}
                            // </button>

                            // <li
                            //   className={boardName === location.pathname ? "nav-item nav-button current-page" : "nav-item nav-button"}
                            //   key={boardName}
                            //   aria-current={boardName === location.pathname ? "page" : undefined}
                            // >
                            //   <button
                            //     key={boardName}
                            //     className={`button-style ${boardName === tabItem ? "isActive-btn" : ""}`}
                            //     onClick={() => handleLinkClick(boardName)}
                            //   >
                            //     {/* <i className={item.icon} aria-hidden="true"> </i> &nbsp;  */}
                            //     {boardName}
                            //   </button>

                            // </li>
                            <li
                              onClick={(evnt) =>
                                props.navigateToScreen(index, evnt, data)
                              }
                            >
                              <div id="defnic" className="wrapper stripe">
                                <div className="block-wrapper">
                                  <div
                                    id="defnic"
                                    className="gps-button-wrapper"
                                  >
                                    <a
                                      className={`gps-button subtle button-2 ${
                                        isActive ? "isActive-Sidebar" : ""
                                      }`}
                                      href={`#${data.id}`}
                                    >
                                      {boardName}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}

                          {!isEditing ? (
                            <>
                              <button
                                className="btn btn-outline-primary edit-btn"
                                onClick={(evnt) =>
                                  props.editInputFields(index, evnt, data)
                                }
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                className="btn btn-outline-danger remove-btn"
                                onClick={(evnt) =>
                                  props.removeInputFields(index, evnt)
                                }
                              >
                                <i
                                  className="fa fa-times"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-outline-primary readOnly-btn"
                                onClick={(evnt) =>
                                  props.updateInputFields(index, evnt)
                                }
                              >
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
