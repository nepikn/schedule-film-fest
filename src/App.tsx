import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import Table from "./Table";

export class FilmInfo {
  name;
  timeStart;
  timeEnd;
  join;

  constructor(
    name = "",
    timeStart = new Date(),
    timeEnd = new Date(),
    join = false
  ) {
    this.name = name;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.join = join;
  }
}

function App() {
  const [filmInfos, setFilmInfos] = useState(new Array(9).fill(new FilmInfo()));
  return (
    <div className="body">
      <div onChange={(e) => setFilmInfos(e)}>
        <Table filmInfos={filmInfos} />
      </div>
      <div className="calendar">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
