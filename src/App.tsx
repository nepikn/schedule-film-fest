import { format } from "date-fns";
import { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import Calendar from "./Calendar";
import Table, { TableTitle } from "./Table";

export class FilmInfo {
  name;
  timeStart;
  timeEnd;
  join;
  id;

  constructor(name = "", timeStart = "", timeEnd = "", join = "false") {
    this.name = name;
    this.timeStart = timeStart ? new Date(timeStart) : new Date();
    this.timeEnd = timeEnd ? new Date(timeEnd) : new Date();
    this.join = join;
    this.id = v4();

    if (!this.checked) return;
    FilmInfo.checkedId[this.name] = this.id;
  }

  get checked() {
    return this.join == "true";
  }

  get date() {
    return format(this.timeStart, "M-d");
  }
  set date(val) {
    const [month, day] = val.split("-");
    this.timeStart.setMonth(+month - 1);
    this.timeStart.setDate(+day);
  }

  get start() {
    return format(this.timeStart, "HH:mm");
  }
  set start(val) {
    const [hour, minute] = val.split(":");
    this.timeStart.setHours(+hour);
    this.timeStart.setMinutes(+minute);
  }

  get end() {
    return format(this.timeEnd, "HH:mm");
  }
  set end(val) {
    const [hour, minute] = val.split(":");
    this.timeEnd.setHours(+hour);
    this.timeEnd.setMinutes(+minute);
  }

  get interval() {
    return (
      format(this.timeStart, "HH:mm") + "-" + format(this.timeEnd, "HH:mm")
    );
  }

  static checkedId: { [index: string]: string } = {};
  static isForsaken(info: FilmInfo) {
    return this.checkedId[info.name] && info.id != this.checkedId[info.name];
  }
}

function App() {
  const rowData = [
    ["夏日殤痕", "04/02/2023 14:50", "04/02/2023 14:50", "false"],
    ["夏日殤痕", "04/03/2023 17:10", "04/03/2023 17:10", "true"],
    ["我的愛遺留在那片海", "04/02/2023 10:40", "04/02/2023 10:40", "false"],
    ["我的愛遺留在那片海", "04/04/2023 12:30", "04/04/2023 12:30", "true"],
    ["血色珍珠", "04/02/2023 13:20", "04/02/2023 13:20", "false"],
    ["血色珍珠", "04/03/2023 21:50", "04/03/2023 21:50", "true"],
    ["霓裳魅影", "04/02/2023 15:00", "04/02/2023 15:00", "false"],
    ["霓裳魅影", "04/03/2023 21:30", "04/03/2023 21:30", "false"],
    ["霓裳魅影", "04/04/2023 15:40", "04/04/2023 15:40", "true"],
    ["霓裳魅影", "04/05/2023 19:10", "04/05/2023 19:10", "false"],
  ];
  const [filmInfos, setFilmInfos] = useState(
    rowData.map((row) => new FilmInfo(...row))
  );

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const targ = e.target;
    if (!(targ instanceof HTMLInputElement)) return;

    const nextFilmInfos = filmInfos.slice();
    const info = nextFilmInfos.find((info) => info.id == targ.dataset.id)!;
    if (targ.type == "checkbox" && targ.checked) {
      FilmInfo.checkedId[info.name] = info.id;
    }

    info[targ.name as TableTitle] =
      targ.type == "checkbox" ? "" + targ.checked : targ.value;

    setFilmInfos(nextFilmInfos);
  }

  console.log(FilmInfo.checkedId);

  return (
    <main onChange={handleInputChange}>
      <div>
        <Calendar filmInfos={filmInfos} />
      </div>
      <div>
        <Table filmInfos={filmInfos} />
      </div>
    </main>
  );
}

export default App;
