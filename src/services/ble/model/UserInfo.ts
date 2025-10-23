class UserInfo {
  phone: string = "";
  name: string = "";
  gender: string = ""; // 0男，1女
  age: string = ""; // 18
  height: string = ""; // 175
  weight: string = ""; // 75
  ecgTitle: string = "";
  ecgReportTips: string = "";
  date: string = "";

  getDate(): string {
    return this.date;
  }

  setDate(date: string): void {
    this.date = date;
  }

  getPhone(): string {
    return this.phone;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getGender(): string {
    return this.gender;
  }

  setGender(gender: string): void {
    this.gender = gender;
  }

  getAge(): string {
    return this.age;
  }

  setAge(age: string): void {
    this.age = age;
  }

  getHeight(): string {
    return this.height;
  }

  setHeight(height: string): void {
    this.height = height;
  }

  getWeight(): string {
    return this.weight;
  }

  setWeight(weight: string): void {
    this.weight = weight;
  }

  getEcgTitle(): string {
    return this.ecgTitle;
  }

  setEcgTitle(ecgTitle: string): void {
    this.ecgTitle = ecgTitle;
  }

  getEcgReportTips(): string {
    return this.ecgReportTips;
  }

  setEcgReportTips(ecgReportTips: string): void {
    this.ecgReportTips = ecgReportTips;
  }

  toString(): string {
    return `UserInfo{phone='${this.phone}', name='${this.name}', gender='${this.gender}', age='${this.age}', height='${this.height}', weight='${this.weight}', ecgTitle='${this.ecgTitle}', ecgReportTips='${this.ecgReportTips}', date='${this.date}'}`
  }
}