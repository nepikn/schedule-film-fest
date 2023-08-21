import FilmInfo from "./FilmInfo";
import "./Table.css";

export type TableTitle = "name" | "date" | "start" | "end" | "join";
export default function Table({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const titles: TableTitle[] = ["name", "date", "start", "end", "join"];
  const rows = filmInfos.map((filmInfo) => {
    return (
      <li key={filmInfo.id} data-id={filmInfo.id}>
        <ul className="row grid">
          {titles.map((title) => (
            <li key={title} className="cell">
              <label>
                <Input name={title} info={filmInfo} />
              </label>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <form>
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

interface Input {
  name: TableTitle;
  info: FilmInfo;
}
export function Input({ name, info }: Input) {
  return (
    <input
      type={
        name == "start" || name == "end"
          ? "time"
          : name == "date"
          ? "date"
          : name == "join"
          ? "checkbox"
          : "string"
      }
      value={name == "name" ? info[name] : undefined}
      defaultValue={name != "name" ? info[name] : undefined}
      name={name}
      checked={info.checked}
      data-id={info.id}
      onChange={() => {}}
    />
  );
}
