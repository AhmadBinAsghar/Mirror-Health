interface MyPersonalInfo {
  sex: number; // 1 male, 0 female
  age: number;
  height: number;
  weight: number;
  stepLength: number;
}

export class MyPersonalInfoImpl implements MyPersonalInfo {
  sex: number;
  age: number;
  height: number;
  weight: number;
  stepLength: number = 70;

  constructor(sex: number, age: number, height: number, weight: number) {
    this.sex = sex;
    this.age = age;
    this.height = height;
    this.weight = weight;
  }

  getSex(): number {
    return this.sex;
  }

  setSex(sex: number): void {
    this.sex = sex;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number): void {
    this.age = age;
  }

  getHeight(): number {
    return this.height;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getWeight(): number {
    return this.weight;
  }

  setWeight(weight: number): void {
    this.weight = weight;
  }

  getStepLength(): number {
    return this.stepLength;
  }

  setStepLength(stepLength: number): void {
    this.stepLength = stepLength;
  }

  toString(): string {
    return `MyPersonalInfo{sex=${this.sex}, age=${this.age}, height=${this.height}, weight=${this.weight}, stepLength=${this.stepLength}}`;
  }
}