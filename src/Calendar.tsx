import { useState } from "react";
import { startOfMonth, getDaysInMonth } from "date-fns";
import "./Calendar.css";

export default function Calendar() {
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
    <ul role="table" className="month">
      {[...Array(firstDayWeek + lastDay)].map((_, i) => (
        <li key={i} role="cell">
          <div>{i < firstDayWeek ? "" : day++}</div>
        </li>
      ))}
    </ul>
  );
}
