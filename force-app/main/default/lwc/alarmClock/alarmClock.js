import { LightningElement } from "lwc";
import AlarmClockAssets from "@salesforce/resourceUrl/AlarmClockAssets";

export default class AlarmClock extends LightningElement {
  clockImage = AlarmClockAssets + "/AlarmClockAssets/clock.png";
  currentTime = "";
  intervalId;
  hours = [];
  mins = [];
  meridians = ["AM", "PM"];
  selectedHour = "";
  selectedMin = "";
  selectedMeridian = "";
  alarmTime = "";
  isAlarmClick = false;

  get allChoiceSelected() {
    return !(this.selectedMeridian && this.selectedMin && this.selectedMin);
  }

  connectedCallback() {
    this.createHoursOptions();
    this.createMinsOptions();
    this.timeHandler();
  }

  timeHandler() {
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000); // Update every second
  }

  updateTime() {
    let dateTime = new Date();
    let hour = dateTime.getHours();
    let min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();
    let ampm = "AM";

    if (hour === 0) {
      hour = 12;
    } else if (hour >= 12) {
      hour = hour - 12;
      ampm = "PM";
    }
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    this.currentTime = `${hour}: ${min}: ${sec} ${ampm}`;
    if (this.alarmTime === `${hour}:${min} ${ampm}`) {
      console.log("Alarm triggered");
    }
  }
  createHoursOptions() {
    for (let i = 1; i <= 12; i++) {
      let val = i < 10 ? "0" + i : i;
      this.hours.push(val);
    }
  }

  createMinsOptions() {
    for (let i = 1; i <= 59; i++) {
      let val = i < 10 ? "0" + i : i;
      this.mins.push(val);
    }
  }
  optionhandler(event) {
    const { label, value } = event.detail;
    if (label === "Hour(s)") {
      this.selectedHour = value;
    } else if (label === "Minute(s)") {
      this.selectedMin = value;
    } else if (label === "Meridian(s)") {
      this.selectedMeridian = value;
    }

    console.log("this.selectedHour " + this.selectedHour);
    console.log("this.selectedMin " + this.selectedMin);
    console.log("this.selectedMeridian " + this.selectedMeridian);
  }
  alarmClickHandler() {
    this.alarmTime = `${this.selectedHour}:${this.selectedMin} ${this.selectedMeridian}`;
    this.isAlarmClick = true;
  }
  clearAlarmHandler() {
    this.isAlarmClick = false;
    this.alarmTime = "";
    this.selectedHour = "";
    this.selectedMeridian = "";
    this.selectedMin = "";
  }
}
