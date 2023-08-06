import { FilmInfo } from "./App";
import { format } from "date-fns";
import "./Table.css";

export default function Table({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const rows = filmInfos.map((filmInfo, i) => {
    const { name, timeStart, timeEnd, join } = filmInfo;

    return (
      <ul key={i} role="row" className="info">
        <li role="cell">
          <div>{name}</div>
        </li>
        <li role="cell">
          <div>{format(timeStart, "MM-dd")}</div>
        </li>
        <li role="cell">
          <div>{format(timeStart, "HH:mm")}</div>
        </li>
        <li role="cell">
          <div>{format(timeEnd, "HH:mm")}</div>
        </li>
        <li role="cell">
          <input type="checkbox" defaultChecked={join} />
        </li>
      </ul>
    );
  });

  return <div role="table">{rows}</div>;
}
