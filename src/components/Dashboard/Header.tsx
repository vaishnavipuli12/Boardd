import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";

interface IProps {
  items: any
  onLinkClick: (href: string) => void;
  isBoard: boolean;
  isTable: boolean;
  isCalender: boolean;
}
const Header: React.FC<IProps> = (props: IProps) => {
  const { items, onLinkClick,  isBoard, isTable, isCalender } = props;
  
  const location = useLocation();

  const handleLinkClick = (href: string) => {
    onLinkClick(href); // Call the callback function in the parent component with the href value
  };

  const tabItem = isBoard ? "Board" : isTable ? "Table" : isCalender ? "Calender" : "";

  return (
    <nav className="navbar navbar-expand-lg navbarstyle">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {items.map((item: any) => (
              <li
                className={item.href === location.pathname ? "nav-item nav-button current-page" : "nav-item nav-button"}
                key={item.name}
                aria-current={item.href === location.pathname ? "page" : undefined}
              >
                <button 
                  key={item.key}
                  className={`button-style ${
                    item.name === tabItem ? "isActive-btn" : ""
                  }`}
                  onClick={() => handleLinkClick(item.href)}
                  >
                  <i className={item.icon} aria-hidden="true"> </i>
                  &nbsp; {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

