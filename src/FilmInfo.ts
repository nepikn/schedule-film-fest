import { format } from "date-fns";
import { v4 } from "uuid";

interface CheckedId {
  [index: FilmInfo["name"]]: FilmInfo["id"] | null;
}
export default class FilmInfo {
  name;
  timeStart;
  timeEnd;
  id;

  constructor(
    name = "",
    timeStart = "",
    timeEnd = "",
    join = "false",
    id = v4()
  ) {
    this.name = name;
    this.timeStart = timeStart ? new Date(timeStart) : new Date();
    this.timeEnd = timeEnd ? new Date(timeEnd) : new Date();
    this.id = id;

    FilmInfo.handleCheck(this, join == "true");
  }

  static checkedId: CheckedId = {};
  static handleCheck(info: FilmInfo, isChecked: boolean) {
    if (isChecked) {
      this.checkedId[info.name] = info.id;
    } else if (info.id == this.checkedId[info.name]) {
      this.checkedId[info.name] = null;
    }
  }

  get isSkipped(): boolean {
    const sameNameCheckedId = FilmInfo.checkedId[this.name];
    return !!sameNameCheckedId && this.id != sameNameCheckedId;
  }
  get join() {
    return "" + this.checked;
  }
  get checked() {
    return this.id == FilmInfo.checkedId[this.name];
  }

  get date() {
    return format(this.timeStart, "M-d");
  }
  set date(val) {
    const [month, day] = val.split("-");
    this.timeStart.setMonth(+month - 1);
    this.timeStart.setDate(+day);
  }

  get start() {
    return format(this.timeStart, "HH:mm");
  }
  set start(val) {
    const [hour, minute] = val.split(":");
    this.timeStart.setHours(+hour);
    this.timeStart.setMinutes(+minute);
  }

  get end() {
    return format(this.timeEnd, "HH:mm");
  }
  set end(val) {
    const [hour, minute] = val.split(":");
    this.timeEnd.setHours(+hour);
    this.timeEnd.setMinutes(+minute);
  }

  get interval() {
    return (
      format(this.timeStart, "HH:mm") + "-" + format(this.timeEnd, "HH:mm")
    );
  }
}
