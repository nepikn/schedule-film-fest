import { FilmInfo } from "./App";
import { format } from "date-fns";
import "./Table.css";

export default function Table({ filmInfos }: { filmInfos: FilmInfo[] }) {
  const rows = filmInfos.map((filmInfo, i) => {
    const { name, timeStart, timeEnd, join } = filmInfo;

    return (
      <tr key={i}>
        <td>{name}</td>
        <td>{format(timeStart, "MM-dd")}</td>
        <td>{format(timeStart, "HH:mm")}</td>
        <td>{format(timeEnd, "HH:mm")}</td>
        <td>
          <input type="checkbox" defaultChecked={join} />
        </td>
      </tr>
    );
  });

  return (
    <table className="info">
      <tbody>
        <tr>
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
