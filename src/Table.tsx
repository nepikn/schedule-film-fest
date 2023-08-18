import { FilmInfo } from "./App";
// import { format } from "date-fns";
// import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export type TableTitle = "name" | "date" | "start" | "end" | "join";
export default function Table({
  filmInfos,
  handleChange,
}: {
  filmInfos: FilmInfo[];
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  const titles: TableTitle[] = ["name", "date", "start", "end", "join"];
  const rows = filmInfos.map((filmInfo) => {
    return (
      <li key={filmInfo.id} data-id={filmInfo.id} className="row">
        <ul className="grid">
          {titles.map((title) => (
            <Cell
              key={title}
              name={title}
              info={filmInfo}
              handleChange={handleChange}
            />
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

function Cell({
  name,
  info,
  handleChange,
}: {
  name: TableTitle;
  info: FilmInfo;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  const isJoin = name == "join";
  return (
    <li className="cell">
      <input
        type={
          isJoin
            ? "checkbox"
            : name == "start" || name == "end"
            ? "time"
            : "string"
        }
        checked={isJoin && info[name] == "true"}
        value={info[name]}
        name={name}
        data-id={info.id}
        onChange={handleChange}
      />
    </li>
  );
}
