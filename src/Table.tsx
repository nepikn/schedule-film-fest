import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import "./Table.css";

export default function Table({ rowData }: { rowData: string[][] }) {
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
          ]
            .map((defVal) => (
              <li key={uuidv4()} className="cell">
                <input type="text" defaultValue={defVal} />
              </li>
            ))
            .concat(
              <li key={uuidv4()} className="cell">
                <input type="checkbox" defaultChecked={join == "true"} />
              </li>
            )}
        </ul>
      </li>
    );
  });

  return (
    <ul className="table info grid">
      <li key={uuidv4()} className="row">
        <ul className="grid row">
          {["Name", "Date", "Start", "End", "Join"].map((title) => (
            <li key={uuidv4()}>{title}</li>
          ))}
        </ul>
      </li>
      {rows}
    </ul>
  );
}
