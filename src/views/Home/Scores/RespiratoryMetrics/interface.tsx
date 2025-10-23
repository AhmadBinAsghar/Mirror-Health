export interface SpO2 {
    today: Day;
    yesterday: Day;
}

export interface Day {
    data: Datum[];
    highestSPO2: number;
    lowestSPO2: number;
}
export interface Datum {
    _id: string;
    userId: string;
    deviceId: string;
    spo2: number;
    GPSTime: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export interface PastSpO2 {
    dateRange: DateRange[];
    highestSPO2: number;
    lowestSPO2: number;
}

export interface DateRange {
    _id: string;
    userId: string;
    deviceId: string;
    spo2: number;
    GPSTime: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

