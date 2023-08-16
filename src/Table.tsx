import { FilmInfo } from "./App";
// import { format } from "date-fns";
// import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export default function Table({
  filmInfos,
  handleChange,
}: {
  filmInfos: FilmInfo[];
  handleChange: (e: React.FormEvent<HTMLDivElement>) => void;
}) {
  const titles: (keyof FilmInfo)[] = ["name", "date", "start", "end", "join"];
  const rows = filmInfos.map((filmInfo) => {
    return (
      <li key={filmInfo.id} data-id={filmInfo.id} className="row">
        <ul className="grid">
          {titles.map((title) => (
            <Cell
              title={title}
              info={filmInfo[title]}
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

function Cell({ title, info, handleChange }) {
  return (
    <li key={title} className="cell">
      {title != "join" ? (
        <input type="text" value={info} name={title} onChange={handleChange} />
      ) : (
        <input
          type="checkbox"
          checked={info}
          name={title}
          onChange={handleChange}
        />
      )}
    </li>
  );
}
