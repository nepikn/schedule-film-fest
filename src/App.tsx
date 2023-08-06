import { useState } from "react";
import { startOfMonth, getDaysInMonth } from "date-fns";
// import Calendar from "react-calendar";
import "./App.css";
import Table from "./Table";

export class FilmInfo {
  // name;
  timeStart;
  timeEnd;
  join;

  constructor(
    /* name = "",  */ timeStart = new Date(),
    timeEnd = new Date(),
    join = false
  ) {
    // this.name = name;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.join = join;
  }
}

function App() {
  const [filmInfos, setFilmInfos] = useState(
    Object.fromEntries([...Array(9)].map(() => ["", new FilmInfo()]))
  );
  return (
    <div className="body">
      <div onChange={(e) => setFilmInfos(e)}>
        <Table filmInfo={filmInfos} />
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
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
      {[...Array(firstDayWeek + lastDay)].map((_, i) => (
        <div key={i}>{i < firstDayWeek ? "" : day++}</div>
      ))}
    </div>
  );
}

export default App;
