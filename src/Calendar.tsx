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
  return (
    <div className="calendar">
      <input
        type="text"
        defaultValue={
          monthStart.getFullYear() + "-" + (monthStart.getMonth() + 1)
        }
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
              >
                <Agenda
                  dayFilmInfos={filmInfos.filter((filmInfo) =>
                    isSameDay(filmInfo.timeStart, date)
                  )}
                />
              </Day>
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
  children,
}: {
  date: Date;
  curMonth: number;
  children: JSX.Element;
}) {
  return (
    <li className="grid cell">
      <div>{date.getMonth() == curMonth ? date.getDate() : ""}</div>
      {children}
    </li>
  );
}

function Agenda({ dayFilmInfos: filmInfos }: { dayFilmInfos: FilmInfo[] }) {
  return (
    <div className="agenda grid">
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
