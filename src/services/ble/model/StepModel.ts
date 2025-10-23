import { SendData } from "./SendData";

export class StepModel extends SendData {
  stepState: boolean;

  constructor(stepState: boolean) {
    super(); // Call the constructor of the SendData class
    this.stepState = stepState;
  }

  isStepState(): boolean {
    return this.stepState;
  }

  setStepState(stepState: boolean): void {
    this.stepState = stepState;
  }

  toString(): string {
    return `StepModel{stepState=${this.stepState}}`;
  }
}