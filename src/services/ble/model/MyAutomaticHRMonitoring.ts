class SendData {
  // Assuming SendData has some properties or methods
}

export class MyAutomaticHRMonitoring extends SendData {
  open: number; // 1: Enable entire time period, 2: Interval measurement within the period, 0: Close
  startHour: number; // Starting hour
  startMinute: number; // Starting minute
  endHour: number; // Ending hour
  endMinute: number; // Ending minute
  week: number; // Monday to Sunday open selection
  time: number; // Test interval time in minutes

  constructor(
    open: number = 0,
    startHour: number = 0,
    startMinute: number = 0,
    endHour: number = 0,
    endMinute: number = 0,
    week: number = 0,
    time: number = 0
  ) {
    super();
    this.open = open;
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
    this.week = week;
    this.time = time;
  }

  getTime(): number {
    return this.time;
  }

  setTime(time: number): void {
    this.time = time;
  }

  getOpen(): number {
    return this.open;
  }

  setOpen(open: number): void {
    this.open = open;
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

  toString(): string {
    return `MyAutomaticHRMonitoring{open=${this.open}, startHour=${this.startHour}, startMinute=${this.startMinute}, endHour=${this.endHour}, endMinute=${this.endMinute}, week=${this.week}, time=${this.time}}`;
  }
}
export default MyAutomaticHRMonitoring