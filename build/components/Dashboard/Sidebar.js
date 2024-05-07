import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./../Constant/ConstantFunction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Dashboard.css";
import { useSelector } from "react-redux";
const Sidebar = (props) => {
    const userInfo = getUserInfo();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isCollapse, setIsCollapse] = useState(true);
    // const sidebarMenuItemStyles = isEditing ? 'form-control sidebar-button-style btn-primary' : 'form-control sidebar-input-style';
    const tabItem = "My personal Board";
    const handleLinkClick = (boardName) => {
        console.log("check bioard", props.addTodos);
    };
    const handleCollpaseSideBar = () => {
        setIsCollapse(!isCollapse);
    };
    const open = Boolean(anchorEl);
    const handleClick = (evnt) => {
        setAnchorEl(evnt.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (option) => {
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
    const todoData = useSelector((state) => state.AddToDoReducers && state.AddToDoReducers.todoData);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "side-bar-container", children: _jsxs("div", { className: "d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100", children: [_jsx("div", { className: "dropdown pb-0 pt-3 w-100", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-sm-8 col-md-8 col-lg-8", children: [_jsxs("div", { className: isCollapse
                                                ? "d-flex align-items-center text-white text-decoration-none"
                                                : "align-items-center text-white text-center text-decoration-none", "aria-expanded": "false", children: [_jsx("img", { src: "https://github.com/mdo.png", alt: "hugenerd", width: "30", height: "30", className: "rounded-circle", "aria-controls": open ? "basic-menu" : undefined, "aria-haspopup": "true", "aria-expanded": open ? "true" : undefined, onClick: (evnt) => handleClick(evnt) }), _jsx("h4", { className: isCollapse
                                                        ? "d-none d-sm-inline mx-1 userName"
                                                        : "d-none d-sm-inline mx-1", children: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.name) ? userInfo === null || userInfo === void 0 ? void 0 : userInfo.name : "John" })] }), _jsxs(Menu, { id: "basic-menu", anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                                                "aria-labelledby": "basic-button",
                                            }, style: { fontSize: "20px" }, children: [_jsx(MenuItem, { style: { fontSize: "16px" }, onClick: () => handleMenuItemClick("Home"), children: "Home" }), _jsx(MenuItem, { style: { fontSize: "16px" }, onClick: () => handleMenuItemClick("Profile"), children: "Profile" }), _jsx(MenuItem, { style: { fontSize: "16px" }, onClick: () => handleMenuItemClick("change-password"), children: "Change password" }), _jsx(MenuItem, { style: { fontSize: "16px" }, onClick: () => handleMenuItemClick("Logout"), children: "Logout" })] })] }), _jsx("div", { className: "col-sm-4 col-md-4 col-lg-4", children: _jsx("div", { className: "collapse-left", onClick: handleCollpaseSideBar, children: _jsx("i", { className: "fa fa-angle-left", "aria-hidden": "true" }) }) })] }) }), _jsx("hr", { className: "horizontal-rule" }), _jsx("ul", { className: "nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start", id: "menu", children: _jsxs("li", { className: "nav-item list-item", children: [_jsxs("div", { className: "row align-all-item", children: [_jsx("div", { className: "col-sm-8 col-md-8 col-lg-8 main-board-name", children: _jsxs("a", { href: "#", className: "nav-link align-middle text-center link-area", "data-toggle": "tooltip", "data-placement": "top", title: "Your board", children: [_jsx("i", { className: "fa fa-graduation-cap", style: { marginTop: "5px" }, "aria-hidden": "true" }), isCollapse && (_jsx("span", { className: "ms-1 d-none d-sm-inline", children: "Your Boards" }))] }) }), _jsx("div", { className: "col-sm-4 col-md-4 col-lg-4", children: _jsx("div", { className: "add-button", onClick: props.addInputField, children: _jsx("i", { className: "fa fa-plus", "aria-hidden": "true" }) }) })] }), _jsx("div", { className: "row sidebar-navlinks-section", children: _jsx("div", { className: "col-sm-12 col-md-12 col-lg-12", children: props.addTodos.map((data, index) => {
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
                                            return (_jsx("div", { className: "list-item", children: _jsxs("div", { className: `form-group form-area mt-3 ${isActive ? "border-area-link" : ""}`, children: [isEditing ? (_jsx("input", { type: "text", onChange: (evnt) => props.handleInputChange(index, evnt), value: boardName, name: "boardName", className: sidebarMenuItemStyles, placeholder: "board name" })) : (
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
                                                        _jsx("li", { onClick: (evnt) => props.navigateToScreen(index, evnt, data), children: _jsx("div", { id: "defnic", className: "wrapper stripe", children: _jsx("div", { className: "block-wrapper", children: _jsx("div", { id: "defnic", className: "gps-button-wrapper", children: _jsx("a", { className: `gps-button subtle button-2 ${isActive ? "isActive-Sidebar" : ""}`, href: `#${data.id}`, children: boardName }) }) }) }) })), !isEditing ? (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn btn-outline-primary edit-btn", onClick: (evnt) => props.editInputFields(index, evnt, data), children: _jsx("i", { className: "fa fa-pencil", "aria-hidden": "true" }) }), _jsx("button", { className: "btn btn-outline-danger remove-btn", onClick: (evnt) => props.removeInputFields(index, evnt), children: _jsx("i", { className: "fa fa-times", "aria-hidden": "true" }) })] })) : (_jsx(_Fragment, { children: _jsx("button", { className: "btn btn-outline-primary readOnly-btn", onClick: (evnt) => props.updateInputFields(index, evnt), children: _jsx("i", { className: "fa fa-check", "aria-hidden": "true" }) }) }))] }) }, index));
                                        }) }) })] }) })] }) }) }));
};
export default Sidebar;
