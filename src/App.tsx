import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import Table from "./Table";

export class FilmInfo {
  name;
  timeStart;
  timeEnd;
  join;
  id;

  constructor(
    id: string,
    name = "",
    timeStart: string | number = Date.now(),
    timeEnd: typeof timeStart = Date.now(),
    join = "false"
  ) {
    this.name = name;
    this.timeStart = new Date(timeStart);
    this.timeEnd = new Date(timeEnd);
    this.join = join == "true";
    this.id = id;
  }
}

function App() {
  const rowData = [
    [
      "a703c9be-a6f5-404a-8fe7-9db29d0688f5",
      "夏日殤痕",
      "04/10/2023 14:50",
      "04/10/2023 14:50",
      "false",
    ],
    [
      "3b93bff0-2009-4734-b976-a497b40c22c1",
      "夏日殤痕",
      "04/14/2023 17:10",
      "04/14/2023 17:10",
      "true",
    ],
    [
      "b2e6ea3b-5f40-4cbc-944e-ca1004ba3588",
      "謎樣的你",
      "04/10/2023 15:30",
      "04/10/2023 15:30",
      "true",
    ],
    [
      "bc5ea713-3f32-4f5a-acf8-f617888e5226",
      "我的愛遺留在那片海",
      "04/09/2023 10:40",
      "04/09/2023 10:40",
      "false",
    ],
    [
      "15ba6928-c4a9-4c5e-b3da-c1568f1706b1",
      "我的愛遺留在那片海",
      "04/16/2023 12:30",
      "04/16/2023 12:30",
      "true",
    ],
    [
      "27708429-7309-43bf-8ffe-098150d1cb14",
      "熊霸天下",
      "04/14/2023 19:30",
      "04/14/2023 19:30",
      "true",
    ],
    [
      "043c351a-7fe6-49f2-a2a0-8d52a50fda76",
      "窒愛媽咪",
      "04/12/2023 18:50",
      "04/12/2023 18:50",
      "true",
    ],
    [
      "98412f21-516d-4bcb-9a52-516a8a140d43",
      "維京計畫",
      "04/14/2023 14:50",
      "04/14/2023 14:50",
      "true",
    ],
    [
      "a88354c4-5ee0-4b4e-b1d6-0f0efe4f2ca2",
      "血色珍珠",
      "04/13/2023 13:20",
      "04/13/2023 13:20",
      "false",
    ],
    [
      "3519f5a6-957c-411b-94fd-495cb59baec4",
      "血色珍珠",
      "04/16/2023 21:50",
      "04/16/2023 21:50",
      "true",
    ],
    [
      "811d923c-cdc6-4af7-ac87-ce5a88bba24f",
      "衝殺小天使",
      "04/16/2023 15:00",
      "04/16/2023 15:00",
      "true",
    ],
    [
      "20796027-9456-4f71-8294-17483a53fb28",
      "霓裳魅影",
      "04/08/2023 15:00",
      "04/08/2023 15:00",
      "false",
    ],
    [
      "04cfcda3-6233-46c1-bf59-4dec93130a87",
      "霓裳魅影",
      "04/10/2023 21:30",
      "04/10/2023 21:30",
      "false",
    ],
    [
      "735d4071-bfd6-4fa6-bb07-a738a671c459",
      "霓裳魅影",
      "04/12/2023 15:40",
      "04/12/2023 15:40",
      "true",
    ],
    [
      "d226d02f-21b0-493c-b0bd-62b00a32626a",
      "霓裳魅影",
      "04/15/2023 19:10",
      "04/15/2023 19:10",
      "false",
    ],
    [
      "6c9b6b21-2579-4915-b503-85049562a6d3",
      "心靈角落",
      "04/12/2023 20:30",
      "04/12/2023 20:30",
      "true",
    ],
    [
      "04f3c1ce-62b0-4b56-833b-16f091e01e6d",
      "雙手的溫柔",
      "04/12/2023 16:10",
      "04/12/2023 16:10",
      "false",
    ],
    [
      "9bc4c1a4-c469-41d6-8391-5f5eec2c0efc",
      "爸佔你的心",
      "04/10/2023 21:40",
      "04/10/2023 21:40",
      "false",
    ],
    [
      "676f2704-75cf-4b2a-8b8a-598b58ac195d",
      "超感啟示路",
      "04/12/2023 21:00",
      "04/12/2023 21:00",
      "false",
    ],
    [
      "89a892ad-b167-4063-9f22-4bcac509000e",
      "超感啟示路",
      "04/13/2023 11:00",
      "04/13/2023 11:00",
      "false",
    ],
  ];
  const [filmInfos, setFilmInfos] = useState(
    rowData.map((row) => new FilmInfo(...(row as [string])))
  );

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLElement) || !e.target.closest("li[data-id]"))
      return;

    const nextFilmInfos = filmInfos.slice();
    const index = filmInfos.findIndex(
      (info) => info.id == e.target.closest("li[data-id]").dataset.id
    );

    nextFilmInfos[index] = Object.assign({}, nextFilmInfos[index], {
      [e.target.title]: e.target.value,
    });
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
