import { FilmInfo } from "./App";
import { format } from "date-fns";
import "./Table.css";

export default function Table({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const rows = filmInfos.map((filmInfo, i) => {
    const { name, timeStart, timeEnd, join } = filmInfo;

    return (
      <tr key={i} className="row">
        <td className="cell" contentEditable>
          {name}
        </td>
        <td className="cell" contentEditable>
          {format(timeStart, "MM-dd")}
        </td>
        <td className="cell" contentEditable>
          {format(timeStart, "HH:mm")}
        </td>
        <td className="cell" contentEditable>
          {format(timeEnd, "HH:mm")}
        </td>
        <td className="cell">
          <input type="checkbox" defaultChecked={join} />
        </td>
      </tr>
    );
  });

  return (
    <table className="table info">
      <tbody>
        <tr className="row">
          <th>Name</th>
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Join</th>
        </tr>
        {rows}
      </tbody>
    </table>
  );
}
