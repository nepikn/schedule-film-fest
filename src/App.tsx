import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
// import Calendar from "react-calendar";
import Table from "./Table";

export class FilmInfo {
  name;
  timeStart;
  timeEnd;
  join;

  constructor(
    name = "",
    timeStart: string | number = Date.now(),
    timeEnd: typeof timeStart = Date.now(),
    join = "false"
  ) {
    this.name = name;
    this.timeStart = new Date(timeStart);
    this.timeEnd = new Date(timeEnd);
    this.join = join == "true";
  }
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
    rowData.map((row) => new FilmInfo(...row))
  );
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (
      !(e.target instanceof HTMLElement) ||
      e.target.closest("tr")?.dataset.index == undefined
    )
      return;

    const tr = e.target.closest("tr")!;
    const [name, date, start, end, join] = Array.from(tr.children);
    const nextFilmInfos = filmInfos.slice();

    nextFilmInfos[+tr.dataset.index!] = new FilmInfo(
      name.textContent!,
      date.textContent + " " + start.textContent,
      date.textContent + " " + end.textContent,
      "" + join.querySelector("input")!.checked
    );

    setFilmInfos(nextFilmInfos);
  };

  return (
    <div className="body">
      <div onInput={handleInput}>
        <Table rowData={rowData} />
      </div>
      <div>
        <Calendar filmInfos={filmInfos} />
      </div>
    </div>
  );
}

export default App;
