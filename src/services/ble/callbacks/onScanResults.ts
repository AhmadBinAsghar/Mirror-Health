import { Device } from "../model/Device";

export interface OnScanResults {
    Success(date: Device): void;
    Fail(code: number): void;
}
