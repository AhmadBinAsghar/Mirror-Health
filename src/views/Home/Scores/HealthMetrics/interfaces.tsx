export interface TodaysData {
    today: Data;
    yesterday: Data;
}

interface Data {
    data: Datum[];
    highestHeartRateToday: number;
    lowestHeartRateToday: number;
    highestLowBPToday: number;
    lowestLowBPToday: number;
    highestHighBPToday: number;
    lowestHighBPToday: number;
    highestHRVToday: number;
    lowestHRVToday: number;
    lowestVascularAgingToday: number;
    highestVascularAgingToday: number;
    lowestTemp: number;
    highestTemp: number;
}

export interface Datum {
    _id: string;
    userId: string;
    deviceId: string;
    heartRate: number;
    GPSTime: Date;
    highBP: number;
    lowBP: number;
    hrv: number;
    vascularAging: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface PastData {
    dateRange: DateRange[];
    highestHeartRate: number;
    lowestHeartRate: number;
    highestLowBP: number;
    lowestLowBP: number;
    highestHighBP: number;
    lowestHighBP: number;
    highestHRV: number;
    lowestHRV: number;
    lowestVascularAging: number,
    highestVascularAging: number,
    lowestTemp: number,
    highestTemp: number,
}

export interface DateRange {
    _id: string;
    userId: string;
    deviceId: string;
    heartRate: number;
    GPSTime: Date;
    highBP: number;
    lowBP: number;
    hrv: number;
    vascularAging: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}