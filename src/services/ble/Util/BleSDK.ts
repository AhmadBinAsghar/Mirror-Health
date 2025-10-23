import moment from "moment";
import { BleConst } from "../bleConst";
import { DataListener2301 } from "../callbacks/dataListner";
import { DeviceConst } from "../deviceConst";
import { DeviceKey } from "../DeviceKey";
import { AutoMode } from "../model/AutoMode";
import { AutoTestMode } from "../model/AutoTestMode";
import MyDeviceTime from "../model/MyDeviceTime";
import { ResolveUtil } from "../other/ResolveUtil";

export class BleSDK {

    public static DATA_READ_START: number = 0;
    public static DATA_READ_CONTINUE: number = 2;
    public static DATA_DELETE: number = 99;
    public static DistanceMode_MILE: number = 0x81;
    public static DistanceMode_KM: number = 0x80;
    public static TimeMode_12h: number = 0x81;
    public static TimeMode_24h: number = 0x80;
    public static WristOn_Enable: number = 0x81;
    public static WristOn_DisEnable: number = 0x80;
    public static TempUnit_C: number = 0x80;
    public static TempUnit_F: number = 0x81;
    public static TAG: string = "BleSDK";
    public static isRunning: boolean = false;


    private static getByteArray(f: number): Uint8Array {
        // Create an ArrayBuffer and DataView for binary operations
        const buffer = new ArrayBuffer(4); // Float32 is 4 bytes
        const view = new DataView(buffer);

        // Set the float value into the DataView
        view.setFloat32(0, f, true); // true for little-endian

        // Extract the bytes as Uint8Array
        const bytes = new Uint8Array(buffer);

        return bytes;
    }
    public static getByteArrays(i: number): Uint8Array {
        const b = new Uint8Array(4);

        b[3] = (i >> 24) & 0xff;
        b[2] = (i >> 16) & 0xff;
        b[1] = (i >> 8) & 0xff;
        b[0] = i & 0xff;

        return b;
    }

    public static DataParsingWithData(value: Uint8Array, dataListener: DataListener2301) {
        switch (value[0]) {
            case DeviceConst.CMD_Set_UseInfo:
                dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.SetPersonalInfo));
                break;
            case DeviceConst.CMD_Set_Auto:
                dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.SetAutomatic));
                break;
            case DeviceConst.CMD_Set_DeviceID:
                dataListener.dataCallback(ResolveUtil.setMacSuccessful());
                break;
            case DeviceConst.CMD_SET_TIME:
                dataListener.dataCallback(ResolveUtil.setTimeSuccessful(value));
                break;
            case DeviceConst.CMD_GET_TIME:
                dataListener.dataCallback(ResolveUtil.getDeviceTime(value));
                break;
            case DeviceConst.CMD_GET_USERINFO:
                dataListener.dataCallback(ResolveUtil.getUserInfo(value));
                break;
            case DeviceConst.CMD_Enable_Activity:
                dataListener.dataCallback(ResolveUtil.getActivityData(value));
                break;
            case DeviceConst.CMD_Get_BatteryLevel:
                dataListener.dataCallback(ResolveUtil.getDeviceBattery(value));
                break;
            case DeviceConst.CMD_Get_Address:
                dataListener.dataCallback(ResolveUtil.getDeviceAddress(value));
                break;
            case DeviceConst.CMD_Get_Version:
                dataListener.dataCallback(ResolveUtil.getDeviceVersion(value));
                break;
            case DeviceConst.CMD_Get_Auto:
                dataListener.dataCallback(ResolveUtil.getAutoHeart(value));
                break;
            case DeviceConst.CMD_Reset:
                dataListener.dataCallback(ResolveUtil.reset());
                break;
            case DeviceConst.CMD_Mcu_Reset:
                dataListener.dataCallback(ResolveUtil.mcuReset());
                break;
            case DeviceConst.CMD_Get_TotalData:
                if (this.GetTotalActivityDataWithMode) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_GetTotalActivityData));
                } else {
                    dataListener.dataCallback(ResolveUtil.getTotalStepData(value));
                }
                break;
            case DeviceConst.CMD_Get_DetailData:
                if (this.GetDetailActivityDataWithMode) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_GetDetailActivityDataWithMode));
                } else {
                    dataListener.dataCallback(ResolveUtil.getDetailData(value));
                }
                break;
            case DeviceConst.CMD_Get_SleepData:
                if (this.Delete_GetDetailSleepData) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_GetDetailSleepData));
                } else {
                    dataListener.dataCallback(ResolveUtil.getSleepData(value));
                }
                break;
            case DeviceConst.CMD_Get_HeartData:
                if (this.GetDynamicHRWithMode) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_GetDynamicHR));
                } else {
                    dataListener.dataCallback(ResolveUtil.getHeartData(value));
                }
                break;
            case DeviceConst.CMD_Get_OnceHeartData:
                if (this.GetStaticHRWithMode) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_GetStaticHR));
                } else {
                    dataListener.dataCallback(ResolveUtil.getOnceHeartData(value));
                }
                break;
            case DeviceConst.CMD_Get_HrvTestData:
                if (this.readHrv) {
                    dataListener.dataCallback(ResolveUtil.getHrvTestData(value));
                } else {
                    dataListener.dataCallback(ResolveUtil.deleteHrv());
                }
                break;
            case DeviceConst.ReadTempHisrory:
                if (this.GetTemperature_historyDataWithMode) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_GetTemperature_historyDataWithMode));
                } else {
                    dataListener.dataCallback(ResolveUtil.getTempData(value));
                }
                break;
            case DeviceConst.Oxygen_data:
                if (this.Obtain_The_data_of_manual_blood_oxygen_test) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_Obtain_The_data_of_manual_blood_oxygen_test));
                } else {
                    dataListener.dataCallback(ResolveUtil.GetAutomaticSpo2Monitoring(value));
                }
                break;
            case DeviceConst.CMD_HeartPackageFromDevice:
                dataListener.dataCallback(ResolveUtil.getActivityExerciseData(value));
                break;
            case DeviceConst.CMD_Set_Name:
                dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.CMD_Set_Name));
                break;
            case DeviceConst.CMD_Get_Name:
                dataListener.dataCallback(ResolveUtil.getDeviceName(value));
                break;
            case DeviceConst.CMD_Get_SPORTData:
                if (this.GetActivityModeDataWithMod) {
                    dataListener.dataCallback(ResolveUtil.setMethodSuccessful(BleConst.Delete_ActivityModeData));
                } else {
                    dataListener.dataCallback(ResolveUtil.getExerciseData(value));
                }
                break;
            case DeviceConst.MeasurementWithType:
                const vv: Record<string, any> = {};
                switch (value[1]) {
                    case 1: // hrv
                        vv[DeviceKey.DataType] = BleConst.MeasurementHrvCallback;
                        vv[DeviceKey.End] = true;
                        vv[DeviceKey.Data] = {
                            [DeviceKey.Type]: ResolveUtil.getValue(value[1], 0).toString(),
                            [DeviceKey.HeartRate]: ResolveUtil.getValue(value[2], 0).toString(),
                            [DeviceKey.Blood_oxygen]: ResolveUtil.getValue(value[3], 0).toString(),
                            [DeviceKey.HRV]: ResolveUtil.getValue(value[4], 0).toString(),
                            [DeviceKey.Stress]: ResolveUtil.getValue(value[5], 0).toString(),
                            [DeviceKey.HighPressure]: ResolveUtil.getValue(value[6], 0).toString(),
                            [DeviceKey.LowPressure]: ResolveUtil.getValue(value[7], 0).toString()
                        };
                        dataListener.dataCallback(vv);
                        break;
                    case 2: // heart
                        vv[DeviceKey.DataType] = BleConst.MeasurementHeartCallback;
                        vv[DeviceKey.End] = true;
                        vv[DeviceKey.Data] = {
                            [DeviceKey.Type]: ResolveUtil.getValue(value[1], 0).toString(),
                            [DeviceKey.HeartRate]: ResolveUtil.getValue(value[2], 0).toString(),
                            [DeviceKey.Blood_oxygen]: ResolveUtil.getValue(value[3], 0).toString(),
                            [DeviceKey.HRV]: ResolveUtil.getValue(value[4], 0).toString(),
                            [DeviceKey.Stress]: ResolveUtil.getValue(value[5], 0).toString(),
                            [DeviceKey.HighPressure]: ResolveUtil.getValue(value[6], 0).toString(),
                            [DeviceKey.LowPressure]: ResolveUtil.getValue(value[7], 0).toString()
                        };
                        dataListener.dataCallback(vv);
                        break;
                    case 3: // oxygen
                        vv[DeviceKey.DataType] = BleConst.MeasurementOxygenCallback;
                        vv[DeviceKey.End] = true;
                        vv[DeviceKey.Data] = {
                            [DeviceKey.Type]: ResolveUtil.getValue(value[1], 0).toString(),
                            [DeviceKey.HeartRate]: ResolveUtil.getValue(value[2], 0).toString(),
                            [DeviceKey.Blood_oxygen]: ResolveUtil.getValue(value[3], 0).toString(),
                            [DeviceKey.HRV]: ResolveUtil.getValue(value[4], 0).toString(),
                            [DeviceKey.Stress]: ResolveUtil.getValue(value[5], 0).toString(),
                            [DeviceKey.HighPressure]: ResolveUtil.getValue(value[6], 0).toString(),
                            [DeviceKey.LowPressure]: ResolveUtil.getValue(value[7], 0).toString()
                        };
                        dataListener.dataCallback(vv);
                        break;
                }
                break;
        }
    }

    protected static Delete_GetDetailSleepData = false;
    public static GetDetailSleepDataWithMode(mode: number, dateOfLastData: string): Uint8Array {
        this.Delete_GetDetailSleepData = (0x99 === mode);
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_SleepData;
        value[1] = mode;
        this.insertDateValue(value, dateOfLastData);
        this.crcValue(value);
        return value;
    }

    public static RealTimeStep(enable: boolean, tempEnable: boolean): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Enable_Activity;
        value[1] = enable ? 1 : 0;
        value[2] = tempEnable ? 1 : 0;
        this.crcValue(value);
        return value;
    }

    public static SetPersonalInfo(info: MyPersonalInfo): Uint8Array {
        const value = new Uint8Array(16);
        const male = info.getSex();
        const age = info.getAge();
        const height = info.getHeight();
        const weight = info.getWeight();
        const stepLength = info.getStepLength();

        value[0] = DeviceConst.CMD_Set_UseInfo;
        value[1] = male;
        value[2] = age;
        value[3] = height;
        value[4] = weight;
        value[5] = stepLength;

        this.crcValue(value);

        return value;
    }

    public static getPersonalInfo(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_GET_USERINFO;
        this.crcValue(value);
        return value;
    }

    public static setDeviceTime(time: MyDeviceTime): Uint8Array {
        const value = new Uint8Array(16);
        const timeZone = ResolveUtil.getCurrentTimeZone();
        let zone = timeZone.substring(3);
        let zoneValue: number;

        if (zone.includes("-")) {
            zone = zone.replace("-", "");
            zoneValue = parseInt(zone, 10);
        } else {
            zoneValue = parseInt(zone, 10) + 0x80;
        }
        value[0] = DeviceConst.CMD_SET_TIME;
        value[1] = parseInt(time.year.toString().slice(-2), 16)
        value[2] = parseInt(time.month.toString(), 16);
        value[3] = parseInt(time.day.toString(), 16);
        value[4] = parseInt(time.hour.toString(), 16);
        value[5] = parseInt(time.minute.toString(), 16);
        value[6] = parseInt(time.second.toString(), 16);
        value[8] = zoneValue;

        this.crcValue(value);

        return value;
    }

    public static getDeviceTime(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_GET_TIME;
        this.crcValue(value);
        return value;
    }

    private static GetDetailActivityDataWithMode = false;
    public static getDetailActivityDataWithModeFunction(mode: number, dateOfLastData: string): Uint8Array {
        this.GetDetailActivityDataWithMode = (mode === 0x99);

        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_DetailData;
        value[1] = mode;

        this.insertDateValue(value, dateOfLastData);
        this.crcValue(value);

        return value;
    }

    protected static GetTemperature_historyDataWithMode = false;
    public static getTemperatureHistoryData(mode: number, dateOfLastData: string): Uint8Array {
        this.GetTemperature_historyDataWithMode = (mode === 0x99);

        const value = new Uint8Array(16);
        value[0] = DeviceConst.ReadTempHisrory;
        value[1] = mode;

        this.insertDateValue(value, dateOfLastData);
        this.crcValue(value);

        return value;
    }
    public static StartDeviceMeasurementWithType = false;
    public static setDeviceMeasurementWithType(dataType: AutoTestMode, second: number, open: boolean): Uint8Array {
        this.StartDeviceMeasurementWithType = open;

        const value = new Uint8Array(16);
        value[0] = DeviceConst.MeasurementWithType;

        switch (dataType) {
            case AutoTestMode.AutoHeartRate:
                value[1] = 0x02;
                break;
            case AutoTestMode.AutoSpo2:
                value[1] = 0x03;
                break;
            default:
                throw new Error("Invalid data type");
        }

        value[2] = open ? 0x01 : 0x00;
        value[3] = second & 0xff;
        value[4] = (second >> 8) & 0xff;

        this.crcValue(value);

        return value;
    }

    public static setAutomaticHRMonitoring(autoHeart: any, type: AutoMode | null): Uint8Array {
        const value = new Uint8Array(16);
        const time = autoHeart.getTime();
        value[0] = DeviceConst.CMD_Set_Auto;
        value[1] = autoHeart.getOpen() ? 0x02 : 0x00;
        value[2] = parseInt(autoHeart.getStartHour(), 16);
        value[3] = parseInt(autoHeart.getStartMinute(), 16);
        value[4] = parseInt(autoHeart.getEndHour(), 16);
        value[5] = parseInt(autoHeart.getEndMinute(), 16);
        value[6] = autoHeart.getWeek() ? 0x7F : 0x7F;
        value[7] = time & 0xff;
        value[8] = (time >> 8) & 0xff;

        if (type === null) {
            value[9] = 0x01;
        } else {
            switch (type) {
                case AutoMode.AutoHeartRate:
                    value[9] = 0x01;
                    break;
                case AutoMode.AutoSpo2:
                    value[9] = 0x02;
                    break;
                case AutoMode.AutoTemp:
                    value[9] = 0x03;
                    break;
                case AutoMode.AutoHrv:
                    value[9] = 0x04;
                    break;
            }
        }

        this.crcValue(value);

        return value;
    }



    public static getAutomatic(type: AutoMode | null): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_Auto;

        if (type === null) {
            value[1] = 0x01;
        } else {
            switch (type) {
                case AutoMode.AutoHeartRate:
                    value[1] = 0x01;
                    break;
                case AutoMode.AutoSpo2:
                    value[1] = 0x02;
                    break;
                case AutoMode.AutoTemp:
                    value[1] = 0x03;
                    break;
                case AutoMode.AutoHrv:
                    value[1] = 0x04;
                    break;
            }
        }

        this.crcValue(value);

        return value;
    }

    protected static GetTotalActivityDataWithMode = false;
    public static getTotalActivityDataWithModeFunction(mode: number, dateOfLastData: string): Uint8Array {
        this.GetTotalActivityDataWithMode = (mode === 0x99);

        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_TotalData;
        value[1] = mode;

        this.insertDateValueNoH(value, dateOfLastData);
        this.crcValue(value);

        return value;
    }

    public static getDeviceVersion(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_Version;

        this.crcValue(value);

        return value;
    }

    public static reset(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Reset;

        this.crcValue(value);

        return value;
    }

    public static getDeviceMacAddress(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_Address;

        this.crcValue(value);

        return value;
    }

    public static getDeviceBatteryLevel(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_BatteryLevel;

        this.crcValue(value);

        return value;
    }

    public static mcuReset(): Uint8Array {
        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Mcu_Reset;

        this.crcValue(value);

        return value;
    }

    protected static readHrv = false;
    public static getHRVDataWithMode(mode: number, dateOfLastData: string): Uint8Array {
        this.readHrv = (mode !== 0x99);

        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_HrvTestData;
        value[1] = mode;

        this.insertDateValue(value, dateOfLastData);
        this.crcValue(value);

        return value;
    }


    protected static GetStaticHRWithMode = false;
    public static getStaticHRWithModeFunction(mode: number, dateOfLastData: string): Uint8Array {
        this.GetStaticHRWithMode = (mode === 0x99);

        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_OnceHeartData;
        value[1] = mode;

        this.insertDateValue(value, dateOfLastData);
        this.crcValue(value);

        return value;
    }


    protected static GetDynamicHRWithMode = false;
    public static getDynamicHRWithModeFunction(number: number, dateOfLastData: string): Uint8Array {
        this.GetDynamicHRWithMode = (number === 0x99);

        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Get_HeartData;
        value[1] = number;

        this.insertDateValue(value, dateOfLastData);
        this.crcValue(value);

        return value;
    }





    public static setDeviceID(deviceId: string): Uint8Array {
        if (deviceId.length < 6) {
            throw new Error('Device ID must be at least 6 characters long.');
        }

        const value = new Uint8Array(16);
        value[0] = DeviceConst.CMD_Set_DeviceID;

        for (let i = 0; i < 6; i++) {
            value[i + 1] = deviceId.charCodeAt(i);
        }

        this.crcValue(value);

        return value;
    }




    public static intToByte(num: number): Uint8Array {
        // Ensure num is an integer and within the range of a 16-bit unsigned integer
        if (num < 0 || num > 0xffff) {
            throw new Error('Number must be between 0 and 65535.');
        }

        const highByte = (num >> 8) & 0xff;
        const lowByte = num & 0xff;

        return new Uint8Array([highByte, lowByte]);
    }

    public static byteArrayToInt(arr: Uint8Array): number {
        if (arr.length < 2) {
            throw new Error('Array must have at least 2 bytes.');
        }

        const highByte = arr[0] << 8;
        const lowByte = arr[1] & 0xff;

        // Combine the two bytes and convert to a signed 16-bit integer
        const result = (highByte | lowByte) & 0xffff;

        return result;
    }




    public static getInfoValue(info: string, maxLength: number): Uint8Array {
        // Convert the string to a byte array using UTF-8 encoding
        const nameBytes = new TextEncoder().encode(info);

        if (nameBytes.length >= maxLength) {
            const real = new Uint8Array(maxLength);

            let length = 0;
            for (const char of info) {
                const nameB = new TextEncoder().encode(char);

                if (length + nameB.length >= maxLength) {
                    real.set(nameBytes.slice(0, length), 0);
                    return real;
                }

                real.set(nameB, length);
                length += nameB.length;
            }

            return real;
        }

        return nameBytes;
    }

    public static crcValue(value: Uint8Array): void {
        let crc = 0;

        for (let i = 0; i < value.length - 1; i++) {
            crc += value[i];
        }

        value[value.length - 1] = crc & 0xff;
    }



    public static insertDateValue(value: Uint8Array, time: string): void {
        if (time && time.length > 8) {
            const timeArray = time.split(' ');
            const datePart = timeArray[0];
            const timePart = timeArray[1];

            // Determine the delimiter
            const delimiter = time.includes('-') ? '-' : '.';

            const [yearStr, monthStr, dayStr] = datePart.split(delimiter);
            const [hourStr, minStr, secStr] = timePart.split(':');

            // Convert strings to numbers
            const year = parseInt(yearStr, 10);
            const month = parseInt(monthStr, 10);
            const day = parseInt(dayStr, 10);
            const hour = parseInt(hourStr, 10);
            const min = parseInt(minStr, 10);
            const second = parseInt(secStr, 10);

            // Insert values into the array
            value[4] = ResolveUtil.getTimeValue(year);
            value[5] = ResolveUtil.getTimeValue(month);
            value[6] = ResolveUtil.getTimeValue(day);
            value[7] = ResolveUtil.getTimeValue(hour);
            value[8] = ResolveUtil.getTimeValue(min);
            value[9] = ResolveUtil.getTimeValue(second);
        }
    }




    public static insertDateValueNoH(value: Uint8Array, time: string): void {
        if (time && time.includes('-')) {
            const timeArray = time.split(' ');
            const datePart = timeArray[0];

            // Determine the delimiter
            const delimiter = time.includes('-') ? '-' : '.';

            const [yearStr, monthStr, dayStr] = datePart.split(delimiter);

            // Convert strings to numbers
            const year = parseInt(yearStr, 10);
            const month = parseInt(monthStr, 10);
            const day = parseInt(dayStr, 10);

            // Insert values into the array
            value[4] = ResolveUtil.getTimeValue(year);
            value[5] = ResolveUtil.getTimeValue(month);
            value[6] = ResolveUtil.getTimeValue(day);
        }
    }

    public static byte2Hex(data: Uint8Array): string {
        if (data && data.length > 0) {
            let hexString = '';
            for (const byte of data) {
                hexString += byte.toString(16).toUpperCase().padStart(2, '0') + ' ';
            }
            return hexString.trim();
        }
        return 'no data';
    }


    /**
     * OObtain automated test oximetry data
     * 获得自动测试血氧数据
     */
    protected static Obtain_The_data_of_manual_blood_oxygen_test = false;
    public static OxygenData(number: number): Uint8Array {
        // Update a global or external state if necessary
        // Obtain_The_data_of_manual_blood_oxygen_test = (0x99 === number);

        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Set the first byte to the device constant for oxygen data
        value[0] = DeviceConst.Oxygen_data;
        // Set the second byte to the provided number
        value[1] = number; // Ensures number is within byte range

        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }

    public static EnterActivityMode(time: number, activityMode: number, workMode: number): Uint8Array {
        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Set the command and parameters in the array
        value[0] = DeviceConst.CMD_Start_EXERCISE;
        value[1] = workMode & 0xff; // Ensure workMode is within byte range
        value[2] = activityMode & 0xff; // Ensure activityMode is within byte range
        value[4] = time & 0xff; // Ensure time is within byte range
        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }

    public static setExerciseModeByBreath(status: number, time: number, workMode: number): Uint8Array {
        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Set the command and parameters in the array
        value[0] = DeviceConst.CMD_Start_EXERCISE;
        value[1] = workMode & 0xff; // Ensure workMode is within byte range
        value[2] = 0x06; // Fixed value for this parameter
        value[3] = status & 0xff; // Ensure status is within byte range
        value[4] = time & 0xff; // Ensure time is within byte range

        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }

    public static sendHeartPackage(distance: number, space: number, rssi: number): Uint8Array {
        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Convert distance to byte array and copy to value array
        const distanceValue = this.getByteArray(distance);
        const min = Math.floor(space / 60);
        const second = space % 60;

        // Set the command and parameters in the array
        value[0] = DeviceConst.CMD_heart_package;
        value.set(distanceValue, 1); // Copy distanceValue into value starting at index 1
        value[5] = min & 0xff; // Ensure min is within byte range
        value[6] = second & 0xff; // Ensure second is within byte range
        value[7] = rssi & 0xff; // Ensure rssi is within byte range

        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }

    public static SetDeviceName(strDeviceName: string): Uint8Array {
        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Set the command in the array
        value[0] = DeviceConst.CMD_Set_Name;

        // Determine the length of the string to fit within the array
        const length = Math.min(strDeviceName.length, 14);

        // Convert the string to bytes and copy to the array
        for (let i = 0; i < length; i++) {
            value[i + 1] = strDeviceName.charCodeAt(i) & 0xff; // Convert char to byte
        }

        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }

    public static GetDeviceName(): Uint8Array {
        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Set the command in the array
        value[0] = DeviceConst.CMD_Get_Name;

        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }

    protected static GetActivityModeDataWithMod = false;
    public static GetActivityModeDataWithMode(mode: number): Uint8Array {
        // Update global or module-level variable (if needed)
        // Global variable or state management should be used if you need to keep track of the mode
        this.GetActivityModeDataWithMod = (mode === 0x99);

        // Create a new Uint8Array with the length of 16 bytes
        const value = new Uint8Array(16);

        // Set the command and mode in the array
        value[0] = DeviceConst.CMD_Get_SPORTData;
        value[1] = mode & 0xff; // Ensure mode is within byte range

        // Call the crcValue function to update the CRC byte
        this.crcValue(value);

        // Return the byte array
        return value;
    }
}
