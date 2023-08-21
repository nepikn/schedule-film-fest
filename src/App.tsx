import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import Table, { TableTitle } from "./Table";
import FilmInfo from "./FilmInfo";

const rowData = [
  [
    "夏日殤痕",
    "04/02/2023 14:50",
    "04/02/2023 14:50",
    "false",
    "f6570e76-3012-4e40-a409-c5fd42b3a2f7",
  ],
  [
    "夏日殤痕",
    "04/03/2023 17:10",
    "04/03/2023 17:10",
    "true",
    "7eebb36e-19a1-4ca7-8b25-b81f6cccc613",
  ],
  [
    "我的愛遺留在那片海",
    "04/02/2023 10:40",
    "04/02/2023 10:40",
    "false",
    "3fb1cb20-9b0e-492c-ab94-30d5b288ca75",
  ],
  [
    "我的愛遺留在那片海",
    "04/04/2023 12:30",
    "04/04/2023 12:30",
    "true",
    "9fa2a607-6b20-4f2a-9dae-ab0f183e2684",
  ],
  [
    "血色珍珠",
    "04/02/2023 13:20",
    "04/02/2023 13:20",
    "false",
    "784581bb-a8b9-4028-8955-2663eb3201dc",
  ],
  [
    "血色珍珠",
    "04/03/2023 21:50",
    "04/03/2023 21:50",
    "true",
    "5e9ea1f6-4ffc-487e-9f88-379456e45679",
  ],
  [
    "霓裳魅影",
    "04/02/2023 15:00",
    "04/02/2023 15:00",
    "false",
    "1d22b06b-2c77-4c17-ade8-f3b2b880dd1b",
  ],
  [
    "霓裳魅影",
    "04/03/2023 21:30",
    "04/03/2023 21:30",
    "false",
    "a564edb8-a57b-480d-bbb5-bdf7fa6b2281",
  ],
  [
    "霓裳魅影",
    "04/04/2023 15:40",
    "04/04/2023 15:40",
    "true",
    "492622cf-f264-42e1-b5b7-aa50c405bf75",
  ],
  [
    "霓裳魅影",
    "04/05/2023 19:10",
    "04/05/2023 19:10",
    "false",
    "f6d3b4fc-2abb-4239-a27b-894f87f92cf8",
  ],
].map((row) => new FilmInfo(...row));

function App() {
  const [filmInfos, setFilmInfos] = useState(rowData);

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const targ = e.target;
    if (!(targ instanceof HTMLInputElement)) return;
    // console.log([targ.value]);

    const nextFilmInfos = filmInfos.slice();
    const info = nextFilmInfos.find((info) => info.id == targ.dataset.id);
    if (!info) return;

    const targName = targ.name as TableTitle;
    if (targName != "join") {
      info[targName] = targ.value;
    }

    FilmInfo.handleCheck(info, targ.checked);
    setFilmInfos(nextFilmInfos);
  }

  // console.log(FilmInfo.checkedId);

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
