import { jsx as _jsx } from "react/jsx-runtime";
// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const events = [];
// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021, 6, 0),
//         end: new Date(2021, 6, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2021, 6, 7),
//         end: new Date(2021, 6, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 6, 20),
//         end: new Date(2021, 6, 23),
//     },
// ];
const CalenderData = () => {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const todoData = useSelector((state) => state.AddToDoReducers && state.AddToDoReducers.todoData);
    useEffect(() => {
        if (todoData && todoData.length > 0) {
            const events = todoData.map((item) => ({
                title: item.taskName,
                start: new Date(item.taskStatusModifiedDate),
                end: new Date(item.taskDueDate),
            }));
            setAllEvents(events);
        }
    }, [todoData]);
    console.log("todoItems calender <<<>>>>", todoData, "all Tasks");
    function handleAddEvent() {
        for (let i = 0; i < allEvents.length; i++) {
            const d1 = new Date(allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
            /*
                console.log(d1 <= d2);
                console.log(d2 <= d3);
                console.log(d1 <= d4);
                console.log(d4 <= d3);
                  */
            if (((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
                (d4 <= d3))) {
                alert("CLASH");
                break;
            }
        }
        setAllEvents([...allEvents, newEvent]);
    }
    console.log("check allEvents", allEvents);
    return (_jsx("div", { className: "App", children: _jsx(Calendar, { className: "calender-container-styles", localizer: localizer, events: allEvents, startAccessor: "start", endAccessor: "end" }) }));
};
export default CalenderData;
