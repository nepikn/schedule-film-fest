import { useState } from "react";
import {
  eachWeekOfInterval,
  eachDayOfInterval,
  previousSunday,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSunday,
  format,
} from "date-fns";
import "./Calendar.css";
import FilmInfo from "./FilmInfo";
import { Input } from "./Table";

export default function Calendar({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const [monthStart, setMonthStart] = useState(new Date("2023-04"));
  const sortInfos = filmInfos
    .slice()
    .sort((a, b) =>
      a.isSkipped == b.isSkipped
        ? +a.timeStart - +b.timeStart
        : a.isSkipped
        ? 1
        : -1
    );

  return (
    <div className="calendar">
      <label>
        <input
          type="month"
          defaultValue={format(monthStart, "yyyy-MM")}
          onChange={(e) => setMonthStart(new Date(e.target.value))}
        />
      </label>
      <Month monthStart={monthStart} filmInfos={sortInfos} />
    </div>
  );
}

function Month({
  monthStart,
  filmInfos,
}: {
  monthStart: Date;
  filmInfos: FilmInfo[];
}) {
  const weeks = eachWeekOfInterval({
    start: isSunday(monthStart) ? monthStart : previousSunday(monthStart),
    end: endOfMonth(monthStart),
  }).map((sun) => (
    <li key={sun.getTime()}>
      <ul className="grid week">
        {eachDayOfInterval({ start: sun, end: endOfWeek(sun) }).map((date) => (
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
        ))}
      </ul>
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
  children: React.ReactElement;
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
    <div className="agenda">
      {filmInfos.map((info) => (
        <label key={info.id} className={"grid" + info.isSkippedClass}>
          <div>{info.name}</div>
          <div>{info.interval}</div>
          <Input name="join" info={info} />
        </label>
      ))}
    </div>
  );
}