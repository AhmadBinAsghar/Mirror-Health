import { SendData } from "./SendData";

interface MyDeviceTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

class MyDeviceTime extends SendData {
  constructor() {
    super();
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.day = now.getDate();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
  }

  getYear(): number {
    return this.year;
  }

  setYear(year: number): void {
    this.year = year;
  }

  getMonth(): number {
    return this.month;
  }

  setMonth(month: number): void {
    this.month = month;
  }

  getDay(): number {
    return this.day;
  }

  setDay(day: number): void {
    this.day = day;
  }

  getHour(): number {
    return this.hour;
  }

  setHour(hour: number): void {
    this.hour = hour;
  }

  getMinute(): number {
    return this.minute;
  }

  setMinute(minute: number): void {
    this.minute = minute;
  }

  getSecond(): number {
    return this.second;
  }

  setSecond(second: number): void {
    this.second = second;
  }

  toString(): string {
    return `MyDeviceTime{ year=${this.year}, month=${this.month}, day=${this.day}, hour=${this.hour}, minute=${this.minute}, second=${this.second} }`;
  }
}
export default MyDeviceTime