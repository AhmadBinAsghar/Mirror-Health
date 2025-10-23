class PregnancyCycle {
  address: string = "";
  userId: string = "";
  menstrualPeriodStartTime: string = "1990-01-01"; // 经期开始时间 yyyy-MM-dd
  dueDateTime: string = ""; // 预产期
  menstrualPeriodPeriod: number = 30; // 经期周期，默认30天 21-35

  constructor(address: string = "", userId: string = "", menstrualPeriodStartTime: string = "1990-01-01", dueDateTime: string = "", menstrualPeriodPeriod: number = 30) {
    this.address = address;
    this.userId = userId;
    this.menstrualPeriodStartTime = menstrualPeriodStartTime;
    this.dueDateTime = dueDateTime;
    this.menstrualPeriodPeriod = menstrualPeriodPeriod;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getMenstrualPeriodStartTime(): string {
    return this.menstrualPeriodStartTime;
  }

  setMenstrualPeriodStartTime(menstrualPeriodStartTime: string): void {
    this.menstrualPeriodStartTime = menstrualPeriodStartTime;
  }

  getDueDateTime(): string {
    return this.dueDateTime;
  }

  setDueDateTime(dueDateTime: string): void {
    this.dueDateTime = dueDateTime;
  }

  getMenstrualPeriodPeriod(): number {
    return this.menstrualPeriodPeriod;
  }

  setMenstrualPeriodPeriod(menstrualPeriodPeriod: number): void {
    this.menstrualPeriodPeriod = menstrualPeriodPeriod;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  toString(): string {
    return `PregnancyCycle{address='${this.address}', userId='${this.userId}', menstrualPeriodStartTime='${this.menstrualPeriodStartTime}', dueDateTime='${this.dueDateTime}', menstrualPeriodPeriod=${this.menstrualPeriodPeriod}}`;
  }
}