import React, { useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, fetchTasks } from "../slices/TaskSlice";

const Calendar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasks = useSelector(selectTasks);

  // o: remove unused code

  // const [title] = tasks;

  // console.log(tasks)

  let calendarEvents = tasks.map((task) => {
    //  console.log(`These are the calendar events ${task.title} due on ${task.dueDate}`)
    return { title: task.title, date: task.dueDate };
  });

  // console.log(calendarEvents)

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-auto p-6 mt-5 w-3/4 max-h-81 mx-auto rounded-md shadow-darker bg-blue-900 text-white">
      <div className="grid grid-flow-col justify-around w-full h-full">
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next", // will normally be on the left. if RTL, will be on the right
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
          }}
          height={"auto"} // Let FullCalendar auto adjust its height
          events={calendarEvents}
          selectable={true}
          editable={true}
          themeSystem="mint"
        />
      </div>
    </div>
  );
};

export default Calendar;
