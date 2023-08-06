import { useState } from "react";
// import Calendar from "react-calendar";
import "./App.css";

function App() {
  return <Calendar />;
}

function Calendar() {
  const [time, setTime] = useState(new Date());
  const [inputVal, setInputVal] = useState(
    time.getFullYear() + "-" + time.getDate()
  );
  return (
    <>
      <input
        type="text"
        value={inputVal}
        onInput={(e) => setInputVal(e.target.value)}
        onChange={(e) => setTime(new Date(e.target.value))}
      />
      <Month firstDayWeek={time.getDay() - (time.getDate() % 7) + 1} />
    </>
  );
}

function Month({ firstDayWeek }: { firstDayWeek: number }) {
  let day = 1;
  return (
    <div className="month">
      {new Array(35).fill("").map((_, i) => (
        <div>{i < firstDayWeek % 7 ? "" : day++}</div>
      ))}
    </div>
  );
}

export default App;
