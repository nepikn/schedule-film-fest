import { format } from "date-fns";
import { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import Calendar from "./Calendar";
import Table from "./Table";

type FilmInfoKey = keyof FilmInfo;
export class FilmInfo {
  name;
  timeStart;
  timeEnd;
  join;
  id;

  // constructor(name: string, timeStart: string, timeEnd: string, join: string);
  // constructor({
  //   name,
  //   timeStart,
  //   timeEnd,
  //   join,
  // }: FilmInfoKey);
  constructor(
    name = "" /* : string | FilmInfoKey */,
    timeStart = "",
    timeEnd = "",
    join = "false"
  ) {
    this.name = name;
    this.timeStart = timeStart ? new Date(timeStart) : new Date();
    this.timeEnd = timeEnd ? new Date(timeEnd) : new Date();
    this.join = join == "true";
    this.id = v4();
  }

  get date() {
    return format(this.timeStart, "MM-dd");
  }
  set date(val: string) {
    const [month, day] = val.split("-");
    this.timeStart.setMonth(+month - 1);
    this.timeStart.setDate(+day);
  }

  get start() {
    return format(this.timeStart, "HH:mm");
  }
  set start(val: string) {
    const [hour, minute] = val.split(":");
    this.timeStart.setHours(+hour);
    this.timeStart.setMinutes(+minute);
  }

  get end() {
    return format(this.timeEnd, "HH:mm");
  }
  set end(val: string) {
    const [hour, minute] = val.split(":");
    this.timeEnd.setHours(+hour);
    this.timeEnd.setMinutes(+minute);
  }

  // update(name: keyof FilmInfo) {
  //   switch (name) {
  //     case "date":

  //   }
  // }
}

function App() {
  const rowData = [
    ["夏日殤痕", "04/10/2023 14:50", "04/10/2023 14:50", "false"],
    ["夏日殤痕", "04/14/2023 17:10", "04/14/2023 17:10", "true"],
    ["謎樣的你", "04/10/2023 15:30", "04/10/2023 15:30", "true"],
    ["我的愛遺留在那片海", "04/09/2023 10:40", "04/09/2023 10:40", "false"],
    ["我的愛遺留在那片海", "04/16/2023 12:30", "04/16/2023 12:30", "true"],
    ["熊霸天下", "04/14/2023 19:30", "04/14/2023 19:30", "true"],
    ["窒愛媽咪", "04/12/2023 18:50", "04/12/2023 18:50", "true"],
    ["維京計畫", "04/14/2023 14:50", "04/14/2023 14:50", "true"],
    ["血色珍珠", "04/13/2023 13:20", "04/13/2023 13:20", "false"],
    ["血色珍珠", "04/16/2023 21:50", "04/16/2023 21:50", "true"],
    ["衝殺小天使", "04/16/2023 15:00", "04/16/2023 15:00", "true"],
    ["霓裳魅影", "04/08/2023 15:00", "04/08/2023 15:00", "false"],
    ["霓裳魅影", "04/10/2023 21:30", "04/10/2023 21:30", "false"],
    ["霓裳魅影", "04/12/2023 15:40", "04/12/2023 15:40", "true"],
    ["霓裳魅影", "04/15/2023 19:10", "04/15/2023 19:10", "false"],
    ["心靈角落", "04/12/2023 20:30", "04/12/2023 20:30", "true"],
    ["雙手的溫柔", "04/12/2023 16:10", "04/12/2023 16:10", "false"],
    ["爸佔你的心", "04/10/2023 21:40", "04/10/2023 21:40", "false"],
    ["超感啟示路", "04/12/2023 21:00", "04/12/2023 21:00", "false"],
    ["超感啟示路", "04/13/2023 11:00", "04/13/2023 11:00", "false"],
  ];
  const [filmInfos, setFilmInfos] = useState(
    rowData.map((row) => new FilmInfo(...(row as [string])))
  );

  function handleTableChange(e: React.FormEvent<HTMLInputElement>) {
    if (!(e.target instanceof HTMLElement)) return;

    const nextFilmInfos = filmInfos.slice();
    const index = filmInfos.findIndex(
      (info) =>
        info.id ==
        (e.currentTarget.closest("li[data-id]")! as HTMLLIElement).dataset.id
    );
    nextFilmInfos[index][e.currentTarget.name] = e.currentTarget.value;
    setFilmInfos(nextFilmInfos);
  }

  return (
    <main>
      <div>
        <Table filmInfos={filmInfos} handleChange={handleTableChange} />
      </div>
      <div>
        <Calendar filmInfos={filmInfos} />
      </div>
    </main>
  );
}

export default App;
