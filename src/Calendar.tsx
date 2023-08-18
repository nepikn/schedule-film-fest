import { useState } from "react";
import {
  eachWeekOfInterval,
  eachDayOfInterval,
  previousSunday,
  // addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  format,
} from "date-fns";
// import { AgGridReact } from "ag-grid-react";
import "./Calendar.css";
import { FilmInfo } from "./App";

export default function Calendar({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const [monthStart, setMonthStart] = useState(new Date("2023-4"));
  // const [inputVal, setInputVal] = useState(
  //   time.getFullYear() + "-" + time.getDate()
  // );
  return (
    <div className="calendar">
      <input
        type="text"
        defaultValue={
          monthStart.getFullYear() + "-" + (monthStart.getMonth() + 1)
        }
        // onInput={(e) => setInputVal(e.target.value)}
        onChange={(e) => setMonthStart(new Date(e.target.value))}
      />
      <Month
        firstDayWeek={monthStart.getDay()}
        lastDate={endOfMonth(monthStart)}
        monthStart={monthStart}
        filmInfos={filmInfos}
      />
    </div>
  );
}

function Month({
  // firstDayWeek,
  // lastDate,
  monthStart,
  filmInfos,
}: {
  firstDayWeek: number;
  lastDate: Date;
  monthStart: Date;
  filmInfos: FilmInfo[];
}) {
  const weeks = eachWeekOfInterval({
    start: monthStart.getDay() ? previousSunday(monthStart) : monthStart,
    end: endOfMonth(monthStart),
  }).map((sun) => (
    <li key={sun.getTime()}>
      {
        <ul className="grid week">
          {eachDayOfInterval({ start: sun, end: endOfWeek(sun) }).map(
            (date) => (
              <Day
                key={date.getTime()}
                date={date}
                curMonth={monthStart.getMonth()}
                dayFilmInfos={filmInfos.filter((filmInfo) =>
                  isSameDay(filmInfo.timeStart, date)
                )}
              />
            )
          )}
        </ul>
      }
    </li>
  ));

  return (
    <div className="table">
      <ul className="row grid week">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
      <ul className="grid month">{weeks}</ul>
    </div>
  );
}

function Day({
  date,
  curMonth,
  dayFilmInfos: filmInfos,
}: {
  date: Date;
  curMonth: number;
  dayFilmInfos: FilmInfo[];
}) {
  return (
    <li className="grid cell">
      <div>{date.getMonth() == curMonth ? date.getDate() : ""}</div>
      <div className="infos grid">
        {filmInfos.map((filmInfo) => (
          <div key={filmInfo.id} className="grid">
            <div>
              <div>{filmInfo.name}</div>
              <div>
                {format(filmInfo.timeStart, "HH:mm") +
                  "-" +
                  format(filmInfo.timeEnd, "HH:mm")}
              </div>
            </div>
            <input type="checkbox" />
          </div>
        ))}
      </div>
    </li>
  );
}

/*   let date = previousSunday(monthStart);
  let day = firstDayWeek;
  const weeks = [];
  while (date.getTime() <= lastDate.getTime()) {
    weeks.push(
      <li key={date.getTime()}>
        <ul className="grid week">
          {new Array(7).fill("").map((_, i) => (
            <li key={i} className="cell">
              {date < monthStart ? "" : (date = addDays(date, 1)).getDate()}
            </li>
          ))}
        </ul>
      </li>
    );
  } */
