import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export default function Table({ rowData }: { rowData: string[][] }) {
  const titles = ["Name", "Date", "Start", "End", "Join"];
  const rows = rowData.map((row) => {
    const [id, name, timeStart, timeEnd, join] = row;

    return (
      <li key={id} data-id={id} className="row">
        <ul className="grid">
          {[
            name,
            format(new Date(timeStart), "MM-dd"),
            format(new Date(timeStart), "HH:mm"),
            format(new Date(timeEnd), "HH:mm"),
            join,
          ].map((defVal, i) => (
            <li key={uuidv4()} title={titles[i]} className="cell">
              {i != 4 ? (
                <input type="text" defaultValue={defVal} />
              ) : (
                <input type="checkbox" defaultChecked={join == "true"} />
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
            <li key={uuidv4()}>{title}</li>
          ))}
        </ul>
      </li>
      {rows}
    </ul>
  );
}
