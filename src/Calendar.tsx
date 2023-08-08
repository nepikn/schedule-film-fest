import { useState } from "react";
import {
  eachWeekOfInterval,
  eachDayOfInterval,
  previousSunday,
  // addDays,
  endOfMonth,
  endOfWeek,
} from "date-fns";
import "./Calendar.css";

export default function Calendar() {
  const [monthStart, setMonthStart] = useState(new Date());
  // const [inputVal, setInputVal] = useState(
  //   time.getFullYear() + "-" + time.getDate()
  // );
  return (
    <div className="calendar">
      <input
        type="text"
        defaultValue={monthStart.getFullYear() + "-" + monthStart.getDate()}
        // onInput={(e) => setInputVal(e.target.value)}
        onChange={(e) => setMonthStart(new Date(e.target.value))}
      />
      <Month
        firstDayWeek={monthStart.getDay()}
        lastDate={endOfMonth(monthStart)}
        monthStart={monthStart}
      />
    </div>
  );
}

function Month({
  // firstDayWeek,
  // lastDate,
  monthStart,
}: {
  firstDayWeek: number;
  lastDate: Date;
  monthStart: Date;
}) {
  // let date = previousSunday(monthStart);
  // let day = firstDayWeek;
  // const weeks = [];
  // while (date.getTime() <= lastDate.getTime()) {
  //   weeks.push(
  //     <li key={date.getTime()}>
  //       <ul className="grid week">
  //         {new Array(7).fill("").map((_, i) => (
  //           <li key={i} className="cell">
  //             {date < monthStart ? "" : (date = addDays(date, 1)).getDate()}
  //           </li>
  //         ))}
  //       </ul>
  //     </li>
  //   );
  // }

  const weeks = eachWeekOfInterval({
    start: monthStart.getDay() ? previousSunday(monthStart) : monthStart,
    end: endOfMonth(monthStart),
  }).map((sun, i) => (
    <li key={i}>
      {
        <ul className="grid week">
          {eachDayOfInterval({ start: sun, end: endOfWeek(sun) }).map(
            (date, i) => (
              <li key={i} className="cell">
                <div>
                  {date.getMonth() == monthStart.getMonth()
                    ? date.getDate()
                    : ""}
                </div>
              </li>
            )
          )}
        </ul>
      }
    </li>
  ));

  return (
    <div className="table">
      <ul className="row grid week">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul className="grid month">{weeks}</ul>
    </div>
  );
}
