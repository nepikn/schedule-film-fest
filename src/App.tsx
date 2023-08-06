import { useState } from "react";
import { startOfMonth, getDaysInMonth } from "date-fns";
// import Calendar from "react-calendar";
import "./App.css";

function App() {
  return <Calendar />;
}

function Calendar() {
  const [time, setTime] = useState(new Date());
  // const [inputVal, setInputVal] = useState(
  //   time.getFullYear() + "-" + time.getDate()
  // );
  return (
    <>
      <input
        type="text"
        defaultValue={time.getFullYear() + "-" + time.getDate()}
        // onInput={(e) => setInputVal(e.target.value)}
        onChange={(e) => setTime(new Date(e.target.value))}
      />
      <Month
        firstDayWeek={startOfMonth(time).getDay()}
        lastDay={getDaysInMonth(time)}
      />
    </>
  );
}

function Month({
  firstDayWeek,
  lastDay,
}: {
  firstDayWeek: number;
  lastDay: number;
}) {
  let day = 1;
  return (
    <div className="month">
      {new Array(firstDayWeek + lastDay).fill("").map((_, i) => (
        <div key={i}>{i < firstDayWeek ? "" : day++}</div>
      ))}
    </div>
  );
}

export default App;
