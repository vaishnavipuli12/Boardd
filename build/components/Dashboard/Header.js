import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
const Header = (props) => {
    const { items, onLinkClick, isBoard, isTable, isCalender } = props;
    const location = useLocation();
    const handleLinkClick = (href) => {
        onLinkClick(href); // Call the callback function in the parent component with the href value
    };
    const tabItem = isBoard ? "Board" : isTable ? "Table" : isCalender ? "Calender" : "";
    return (_jsx("nav", { className: "navbar navbar-expand-lg navbarstyle", children: _jsx("div", { className: "container-fluid", children: _jsx("div", { className: "collapse navbar-collapse", children: _jsx("ul", { className: "navbar-nav ms-auto", children: items.map((item) => (_jsx("li", { className: item.href === location.pathname ? "nav-item nav-button current-page" : "nav-item nav-button", "aria-current": item.href === location.pathname ? "page" : undefined, children: _jsxs("button", { className: `button-style ${item.name === tabItem ? "isActive-btn" : ""}`, onClick: () => handleLinkClick(item.href), children: [_jsx("i", { className: item.icon, "aria-hidden": "true", children: " " }), "\u00A0 ", item.name] }, item.key) }, item.name))) }) }) }) }));
};
export default Header;
