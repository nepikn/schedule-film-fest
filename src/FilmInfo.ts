import { format } from "date-fns";
import { v4 } from "uuid";

interface FilmName {
  [index: FilmInfo["id"]]: FilmInfo["name"] | undefined;
}
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

    FilmInfo.filmName[this.id] = this.name;
    FilmInfo.handleCheck(this, join == "true");
  }

  static filmName: FilmName = {};
  static checkedId: CheckedId = {};
  static handleCheck(info: FilmInfo, isChecked: boolean) {
    const prevName = this.filmName[info.id];
    if (prevName != undefined && prevName != info.name) {
      if (isChecked) {
        this.checkedId[prevName] = null;
      }
      this.filmName[info.id] = info.name;
    }

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
  get isSkippedClass() {
    return this.isSkipped ? " skipped" : "";
  }
  get join() {
    return "" + this.checked;
  }
  get checked() {
    return this.id == FilmInfo.checkedId[this.name];
  }

  get date() {
    return format(this.timeStart, "yyyy-MM-dd");
  }
  set date(val) {
    if (!val) return;
    const [year, month, day] = val.split("-");
    this.timeStart.setFullYear(+year, +month - 1, +day);
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
