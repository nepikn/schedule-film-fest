import { useState } from "react";
import { startOfMonth, getDaysInMonth } from "date-fns";
import "./Calendar.css";

export default function Calendar() {
  const [time, setTime] = useState(new Date());
  // const [inputVal, setInputVal] = useState(
  //   time.getFullYear() + "-" + time.getDate()
  // );
  return (
    <div className="calendar">
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
    </div>
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
    <div className="table">
      <ul className="grid week">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul className="grid">
        {[...Array(Math.ceil((firstDayWeek + lastDay) / 7) * 7)].map((_, i) => (
          <li key={i} className="cell">
            <div>{i < firstDayWeek ? "" : day < lastDay ? day++ : ""}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
