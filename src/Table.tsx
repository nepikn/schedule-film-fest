import { FilmInfo } from "./App";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export default function Table({
  rowData,
  handleChange,
}: {
  rowData: FilmInfo[];
}) {
  const titles: (keyof FilmInfo)[] = ["name", "date", "start", "end", "join"];
  const rows = rowData.map((info) => {
    return (
      <li key={info.id} data-id={info.id} className="row">
        <ul className="grid">
          {titles.map((title, i) => (
            <li key={uuidv4()} title={titles[i]} className="cell">
              {title != "join" ? (
                <input
                  type="text"
                  value={info[title]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="checkbox"
                  checked={info[title]}
                  onChange={handleChange}
                />
              )}
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <ul className="table info grid">
      <li key={uuidv4()} className="row">
        <ul className="grid row">
          {titles.map((title) => (
            <li key={uuidv4()}>{title[0].toUpperCase() + title.slice(1)}</li>
          ))}
        </ul>
      </li>
      {rows}
    </ul>
  );
}
