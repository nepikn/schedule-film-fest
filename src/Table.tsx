import { format } from "date-fns";
import "./Table.css";

export default function Table({ rowData }: { rowData: string[][] }) {
  const rows = rowData.map((row, i) => {
    const [name, timeStart, timeEnd, join] = row;

    return (
      <tr key={i} data-index={i} className="row">
        <td className="cell" contentEditable>
          {name}
        </td>
        <td className="cell" contentEditable>
          {format(new Date(timeStart), "MM-dd")}
        </td>
        <td className="cell" contentEditable>
          {format(new Date(timeStart), "HH:mm")}
        </td>
        <td className="cell" contentEditable>
          {format(new Date(timeEnd), "HH:mm")}
        </td>
        <td className="cell">
          <input type="checkbox" defaultChecked={join == "true"} />
        </td>
      </tr>
    );
  });

  return (
    <table className="table info">
      <thead>
        <tr className="row">
          <th>Name</th>
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Join</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
