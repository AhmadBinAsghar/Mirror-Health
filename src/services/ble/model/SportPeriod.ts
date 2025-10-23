import { SendData } from "./SendData";

export class SportPeriod extends SendData {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  week: number;
  days: number;
  intervalTime: number;
  leastStep: number;
  enable: boolean;

  constructor(startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    week: number,
    days: number,
    intervalTime: number,
    leastStep: number,
    enable: boolean,) {
    super(); // Call the constructor of the SendData class
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.days = days;
    this.intervalTime = intervalTime;
    this.leastStep = leastStep;
    this.enable = enable;
    this.endHour = endHour;
    this.endMinute = endMinute;
    this.week = week;
  }

  isEnable(): boolean {
    return this.enable;
  }

  setEnable(enable: boolean): void {
    this.enable = enable;
  }

  getStartHour(): number {
    return this.startHour;
  }

  setStartHour(startHour: number): void {
    this.startHour = startHour;
  }

  getStartMinute(): number {
    return this.startMinute;
  }

  setStartMinute(startMinute: number): void {
    this.startMinute = startMinute;
  }

  getEndHour(): number {
    return this.endHour;
  }

  setEndHour(endHour: number): void {
    this.endHour = endHour;
  }

  getEndMinute(): number {
    return this.endMinute;
  }

  setEndMinute(endMinute: number): void {
    this.endMinute = endMinute;
  }

  getWeek(): number {
    return this.week;
  }

  setWeek(week: number): void {
    this.week = week;
  }

  getIntervalTime(): number {
    return this.intervalTime;
  }

  setIntervalTime(intervalTime: number): void {
    this.intervalTime = intervalTime;
  }

  getLeastStep(): number {
    return this.leastStep;
  }

  setLeastStep(leastStep: number): void {
    this.leastStep = leastStep;
  }

  getDays(): number {
    return this.days;
  }

  setDays(days: number): void {
    this.days = days;
  }
}
