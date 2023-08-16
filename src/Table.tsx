import { FilmInfo } from "./App";
// import { format } from "date-fns";
// import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export default function Table({ filmInfos }: { filmInfos: FilmInfo[] }) {
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

  function handleChange(e: React.FormEvent<HTMLDivElement>) {
    if (!(e.target instanceof HTMLElement) || !e.target.closest("li[data-id]"))
      return;

    const nextFilmInfos = filmInfos.slice();
    const index = filmInfos.findIndex(
      (info) => info.id == e.target.closest("li[data-id]").dataset.id
    );
    nextFilmInfos[index][e.target.closest("li")!.title] = e.target.value;
    setFilmInfos(nextFilmInfos);

    console.log(
      e.target.closest("li")!.title,
      Object.assign(
        { ...nextFilmInfos[index] },
        {
          [e.target.closest("li")!.title]: e.target.value,
        }
      )
    );
  }

  return (
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
  );
}

function Cell({ title, info, handleChange }) {
  return (
    <li key={title} title={title} className="cell">
      {title != "join" ? (
        <input type="text" value={info} onChange={handleChange} />
      ) : (
        <input type="checkbox" checked={info} onChange={handleChange} />
      )}
    </li>
  );
}
