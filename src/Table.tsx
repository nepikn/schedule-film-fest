import { FilmInfo } from "./App";
import { format } from "date-fns";
import "./Table.css";

export default function Table({
  filmInfo,
}: {
  filmInfo: {
    [k: string]: FilmInfo;
  };
}) {
  const rows = [];
  for (const filmName in filmInfo) {
    if (Object.prototype.hasOwnProperty.call(filmInfo, filmName)) {
      const { timeStart, timeEnd, join } = filmInfo[filmName];

      rows.push(
        <ul role="row">
          <li>
            <div>{filmName}</div>
          </li>
          <li>
            <div>{format(timeStart, "MM-dd")}</div>
          </li>
          <li>
            <div>{format(timeStart, "HH:mm")}</div>
          </li>
          <li>
            <div>{format(timeEnd, "HH:mm")}</div>
          </li>
          <li>
            <input type="checkbox" defaultChecked={join} />
          </li>
        </ul>
      );
    }
  }
  return <>{rows}</>;
}
