import { FilmInfo } from "./App";
// import { format } from "date-fns";
// import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export type TableTitle = "name" | "date" | "start" | "end" | "join";
export default function Table({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const titles: TableTitle[] = ["name", "date", "start", "end", "join"];
  const rows = filmInfos.map((filmInfo) => {
    return (
      <li key={filmInfo.id} data-id={filmInfo.id} className="row">
        <ul className="grid">
          {titles.map((title) => (
            <li className="cell">
              <Input key={title} name={title} info={filmInfo} />
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <form action="">
      <ul className="table info grid">
        <li className="row">
          <ul className="grid row">
            {titles.map((title) => (
              <li key={title}>{title[0].toUpperCase() + title.slice(1)}</li>
            ))}
          </ul>
        </li>
        {rows}
      </ul>
    </form>
  );
}

export function Input({ name, info }: { name: TableTitle; info: FilmInfo }) {
  return (
    <input
      type={
        name == "join"
          ? "checkbox"
          : name == "start" || name == "end"
          ? "time"
          : "string"
      }
      checked={name == "join" && info.checked}
      value={info[name]}
      name={name}
      data-id={info.id}
    />
  );
}
