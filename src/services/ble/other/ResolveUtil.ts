import { BleConst } from "../bleConst";
import { DeviceConst } from "../deviceConst";
import { DeviceKey } from "../DeviceKey";
import { BleSDK } from "../Util/BleSDK";
interface Databack {
    Endback(map: { [key: string]: any }): void;
}

interface HistoryGpsData {
    [DeviceKey.DataType]: string;
    [DeviceKey.End]: boolean;
    [DeviceKey.Data]: string;
}

export class ResolveUtil {

    public static getBcd(value: string): number {
        return parseInt(value, 16);
    }

    public static crcValue(value: Uint8Array): void {
        let crc: number = 0;
        for (let i = 0; i < value.length - 1; i++) {
            crc += value[i];
        }
        value[value.length - 1] = crc & 0xff;
    }


    public static getTimeValue(value: number): any {
        const data = value.toString(16);
        // const m = parseInt(data, 16);
        return data;
    }

    public static bcd2String(bytes: number): string {
        let temp = '';
        temp += String.fromCharCode((bytes & 0xf0) >>> 4);
        temp += String.fromCharCode(bytes & 0x0f);
        return temp;
    }

    public static getDeviceTime(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDeviceTime;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        const date = `20${this.ByteToHexString(value[1])}-${this.ByteToHexString(value[2])}-${this.ByteToHexString(value[3])} `
            + `${this.ByteToHexString(value[4])}:${this.ByteToHexString(value[5])}:${this.ByteToHexString(value[6])}`;
        const gpsDate = `${this.ByteToHexString(value[9])}.${this.ByteToHexString(value[10])}.${this.ByteToHexString(value[11])}`;

        mapData[DeviceKey.DeviceTime] = date;
        mapData[DeviceKey.GPSTime] = gpsDate;
        maps[DeviceKey.Data] = mapData;

        return maps;
    }

    public static getGpsTime(value: Uint8Array): string {
        const gpsDate = `${this.ByteToHexString(value[9])}.${this.ByteToHexString(value[10])}.${this.ByteToHexString(value[11])}`;
        return gpsDate;
    }

    public static getUserInfo(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetPersonalInfo;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        const userInfo: string[] = new Array(6);
        for (let i = 0; i < 5; i++) {
            userInfo[i] = String(this.getValue(value[i + 1], 0));
        }

        let deviceId: string = "";
        for (let i = 6; i < 12; i++) {
            if (value[i] === 0) continue;
            deviceId += String.fromCharCode(this.getValue(value[i], 0));
        }

        userInfo[5] = deviceId;

        mapData[DeviceKey.Gender] = userInfo[0];
        mapData[DeviceKey.Age] = userInfo[1];
        mapData[DeviceKey.Height] = userInfo[2];
        mapData[DeviceKey.Weight] = userInfo[3];
        mapData[DeviceKey.Stride] = userInfo[4];
        mapData[DeviceKey.KUserDeviceId] = userInfo[5];

        return maps;
    }

    public static GetAutomaticSpo2Monitoring(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetAutomaticSpo2Monitoring;
        maps[DeviceKey.End] = false;

        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 10;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        for (let i = 0; i < size; i++) {
            const flag = 1 + (i + 1) * count;
            if (value[length - 1] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3 + i * count])}.`
                + `${this.ByteToHexString(value[4 + i * count])}.${this.ByteToHexString(value[5 + i * count])} `
                + `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.Blood_oxygen] = String(this.getValue(value[9 + i * count], 0));

            list.push(hashMap);
        }

        return maps;
    }

    public static getDeviceInfo(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDeviceInfo;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        mapData[DeviceKey.DistanceUnit] = String(this.getValue(value[1], 0));
        mapData[DeviceKey.TimeUnit] = String(this.getValue(value[2], 0));
        mapData[DeviceKey.WristOn] = String(this.getValue(value[3], 0));
        mapData[DeviceKey.TempUnit] = String(this.getValue(value[4], 0));
        mapData[DeviceKey.NightMode] = String(this.getValue(value[5], 0));
        mapData[DeviceKey.KBaseHeart] = String(this.getValue(value[9], 0));
        mapData[DeviceKey.ScreenBrightness] = String(this.getValue(value[11], 0));
        mapData[DeviceKey.Dialinterface] = String(this.getValue(value[12], 0));
        mapData[DeviceKey.SocialDistancedwitch] = String(this.getValue(value[13], 0));
        mapData[DeviceKey.Lauage] = String(this.getValue(value[14], 0));

        return maps;
    }

    public static getActivityData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.RealTimeStep;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        let step = 0;
        let cal = 0;
        let distance = 0;
        let time = 0;
        let heart = 0;
        let exerciseTime = 0;

        for (let i = 1; i < 5; i++) {
            step += this.getValue(value[i], i - 1);
        }
        for (let i = 5; i < 9; i++) {
            cal += this.getValue(value[i], i - 5);
        }
        for (let i = 9; i < 13; i++) {
            distance += this.getValue(value[i], i - 9);
        }
        for (let i = 13; i < 17; i++) {
            time += this.getValue(value[i], i - 13);
        }
        for (let i = 17; i < 21; i++) {
            exerciseTime += this.getValue(value[i], i - 17);
        }
        heart = this.getValue(value[21], 0);

        const temp = this.getValue(value[22], 0) + this.getValue(value[23], 1);

        const numberFormat = this.getNumberFormat(1);
        const bigDecimal = cal / 100;
        const bigDecimaCal = Number(bigDecimal.toFixed(1));

        mapData[DeviceKey.Step] = String(step);
        mapData[DeviceKey.Calories] = bigDecimaCal.toString();
        numberFormat.minimumFractionDigits = 2;
        mapData[DeviceKey.Distance] = numberFormat.format(distance / 100);
        mapData[DeviceKey.ExerciseMinutes] = String(Math.floor(time / 60));
        mapData[DeviceKey.HeartRate] = String(heart);
        mapData[DeviceKey.ActiveMinutes] = String(exerciseTime);
        numberFormat.minimumFractionDigits = 1;
        mapData[DeviceKey.TempData] = numberFormat.format(temp * 0.1);
        mapData[DeviceKey.Blood_oxygen] = String(this.getValue(value[24], 0));

        return maps;
    }

    public static get3d(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetMAC;
        maps[DeviceKey.End] = true;

        const list: { [key: string]: number }[] = [];
        maps[DeviceKey.Data] = list;

        for (let i = 0; i < value.length / 8; i++) {
            const hashMap: { [key: string]: number } = {};
            const valueddd = i * 6;
            const data = this.getValue(value[1 + valueddd], 0) + this.getValue(value[2 + valueddd], 1);
            const data2 = this.getValue(value[3 + valueddd], 0) + this.getValue(value[4 + valueddd], 1);
            const data3 = this.getValue(value[5 + valueddd], 0) + this.getValue(value[6 + valueddd], 1);

            hashMap[DeviceKey.arrayX] = data;
            hashMap[DeviceKey.arrayY] = data2;
            hashMap[DeviceKey.arrayZ] = data3;

            list.push(hashMap);
        }

        return maps;
    }


    public static getPPG(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.Getppg;
        maps[DeviceKey.End] = true;

        const list: { [key: string]: number }[] = [];
        maps[DeviceKey.Data] = list;

        const bs = value.slice(3); // Create a subarray excluding the first 3 bytes

        for (let i = 0; i < bs.length / 2; i++) {
            const hashMap: { [key: string]: number } = {};
            const valueddd = i * 2;
            const data = this.getValue(bs[valueddd], 0) + this.getValue(bs[valueddd + 1], 1);

            hashMap[DeviceKey.DataType] = value[1]; // Assuming value[1] is relevant
            hashMap[DeviceKey.arrayPpgRawData] = data;

            list.push(hashMap);
        }

        return maps;
    }

    public static getGoal(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetStepGoal;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        let goal = 0;
        for (let i = 0; i < 4; i++) {
            goal += this.getValue(value[i + 1], i);
        }

        mapData[DeviceKey.StepGoal] = String(goal);
        return maps;
    }

    public static getDeviceBattery(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDeviceBatteryLevel;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        const battery = this.getValue(value[1], 0);
        // Uncomment and implement if needed
        // const chargingState = this.getValue(value[2], 0);
        // const voltageValue = this.getValue(value[3], 0) + this.getValue(value[4], 1);

        mapData[DeviceKey.BatteryLevel] = String(battery);
        // Uncomment and implement if needed
        // mapData[DeviceKey.Chargingstate] = String(chargingState);
        // mapData[DeviceKey.Voltage_value] = String(voltageValue);

        return maps;
    }

    public static getDeviceAddress(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDeviceMacAddress;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        const sb: string[] = [];
        for (let i = 1; i < 7; i++) {
            sb.push(value[i].toString(16).toUpperCase().padStart(2, '0'));
        }
        const address = sb.join(':');
        mapData[DeviceKey.MacAddress] = address;

        return maps;
    }


    public static getDeviceVersion(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDeviceVersion;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        const stringBuffer: string[] = [];
        for (let i = 1; i < 5; i++) {
            stringBuffer.push(value[i].toString(16).toUpperCase());
        }
        mapData[DeviceKey.DeviceVersion] = stringBuffer.join('.');

        return maps;
    }



    public static reset(): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.CMD_Reset;
        maps[DeviceKey.Data] = {}; // Empty object
        maps[DeviceKey.End] = true;

        return maps;
    }
    public static mcuReset(): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.CMD_MCUReset;
        maps[DeviceKey.Data] = {}; // Empty object
        maps[DeviceKey.End] = true;

        return maps;
    }

    public static notify(): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.Notify;
        maps[DeviceKey.Data] = {}; // Empty object
        maps[DeviceKey.End] = true;

        return maps;
    }


    public static getDeviceName(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.CMD_Get_Name;
        maps[DeviceKey.End] = true;

        const mapData: { [key: string]: string } = {};
        maps[DeviceKey.Data] = mapData;

        let name = '';
        for (let i = 1; i < 15; i++) {
            const charValue = this.getValue(value[i], 0);
            if (charValue === 0 || charValue > 127) continue;
            name += String.fromCharCode(charValue);
        }

        mapData[DeviceKey.DeviceName] = name;
        return maps;
    }

    public static getByteString(b: number): string {
        const array: number[] = new Array(8);
        let stringBuffer: string = '';

        for (let i = 0; i <= 6; i++) {
            array[i] = b & 1;
            b = b >> 1;
            stringBuffer += array[i].toString() + (i === 6 ? '' : '-');
        }

        // Add the last bit
        array[7] = b & 1;
        stringBuffer += array[7].toString();

        return stringBuffer;
    }

    public static getByteArray(b: number): string {
        const array: number[] = new Array(8);
        let stringBuffer: string = '';

        for (let i = 0; i < 8; i++) {
            array[i] = b & 1;
            b = b >> 1;
            stringBuffer += array[i].toString();
        }

        return stringBuffer;
    }


    public static getAutoHeart(value: Uint8Array): Record<string, any> {
        const maps: Record<string, any> = {};
        maps[DeviceKey.DataType] = BleConst.GetAutomatic;
        maps[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        maps[DeviceKey.Data] = mapData;

        const autoHeart: string[] = [];
        const enable = this.getValue(value[1], 0);
        const startHour = this.ByteToHexString(value[2]);
        const startMin = this.ByteToHexString(value[3]);
        const stopHour = this.ByteToHexString(value[4]);
        const stopMin = this.ByteToHexString(value[5]);
        const week = this.getByteString(value[6]);
        const time = this.getValue(value[7], 0) + this.getValue(value[8], 1);

        autoHeart.push(String(enable));
        autoHeart.push(startHour);
        autoHeart.push(startMin);
        autoHeart.push(stopHour);
        autoHeart.push(stopMin);
        autoHeart.push(week);
        autoHeart.push(String(time));

        mapData[DeviceKey.WorkMode] = autoHeart[0];
        mapData[DeviceKey.StartTime] = autoHeart[1];
        mapData[DeviceKey.KHeartStartMinter] = autoHeart[2];
        mapData[DeviceKey.EndTime] = autoHeart[3];
        mapData[DeviceKey.KHeartEndMinter] = autoHeart[4];
        mapData[DeviceKey.Weeks] = autoHeart[5];
        mapData[DeviceKey.IntervalTime] = autoHeart[6];

        return maps;
    }

    /**
     * 读取血压校准
     *
     */
    public static readOxy(value: Uint8Array): Record<string, any> {
        const hashMap: Record<string, any> = {};
        hashMap[DeviceKey.DataType] = BleConst.GetBloodpressure_calibration;
        hashMap[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        hashMap[DeviceKey.Data] = mapData;

        mapData[DeviceKey.KHrvBloodLowPressure] = (this.getValue(value[1], 0) + 10).toString();
        mapData[DeviceKey.KHrvBloodHighPressure] = (this.getValue(value[3], 0) + 10).toString();

        return hashMap;
    }

    public static getSpo2(value: Uint8Array): Record<string, any> {
        const maps: Record<string, any> = {};
        maps[DeviceKey.DataType] = BleConst.GEtSpo2;
        maps[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        maps[DeviceKey.Data] = mapData;

        const time = this.ByteToHexString(value[3]);
        const startHour = this.ByteToHexString(value[4]);
        const startMin = this.ByteToHexString(value[5]);
        const stopHour = this.ByteToHexString(value[6]);
        const stopMin = this.ByteToHexString(value[7]);
        const week = this.getByteString(value[8]);

        mapData[DeviceKey.StartTime] = startHour;
        mapData[DeviceKey.KHeartStartMinter] = startMin;
        mapData[DeviceKey.EndTime] = stopHour;
        mapData[DeviceKey.KHeartEndMinter] = stopMin;
        mapData[DeviceKey.Weeks] = week;
        mapData[DeviceKey.IntervalTime] = time;

        return maps;
    }

    /**
     * 运动提醒
     *
     * @param value
     * @return
     */
    public static getActivityAlarm(value: Uint8Array): Record<string, any> {
        const maps: Record<string, any> = {};
        maps[DeviceKey.DataType] = BleConst.GetSedentaryReminder;
        maps[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        maps[DeviceKey.Data] = mapData;

        const activityAlarm: string[] = [];
        const startHour = this.ByteToHexString(value[1]);
        const startMin = this.ByteToHexString(value[2]);
        const stopHour = this.ByteToHexString(value[3]);
        const stopMin = this.ByteToHexString(value[4]);
        const week = this.getByteString(value[5]);
        const time = this.getValue(value[6], 0);
        const step = this.getValue(value[7], 0);

        activityAlarm[0] = startHour;
        activityAlarm[1] = startMin;
        activityAlarm[2] = stopHour;
        activityAlarm[3] = stopMin;
        activityAlarm[4] = week;
        activityAlarm[5] = String(time);
        activityAlarm[6] = String(step);

        mapData[DeviceKey.StartTimeHour] = activityAlarm[0];
        mapData[DeviceKey.StartTimeMin] = activityAlarm[1];
        mapData[DeviceKey.EndTimeHour] = activityAlarm[2];
        mapData[DeviceKey.EndTimeMin] = activityAlarm[3];
        mapData[DeviceKey.Week] = activityAlarm[4];
        mapData[DeviceKey.IntervalTime] = activityAlarm[5];
        mapData[DeviceKey.LeastSteps] = activityAlarm[6];

        return maps;
    }

    public static getTotalStepData(value: Uint8Array): Record<string, any> {
        const maps: Record<string, any> = {};
        maps[DeviceKey.DataType] = BleConst.GetTotalActivityData;
        maps[DeviceKey.End] = false;

        const list: Array<Record<string, string>> = [];
        maps[DeviceKey.Data] = list;

        const count = this.getStepCount(value);
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        const numberFormat = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: false
        });

        for (let i = 0; i < size; i++) {
            const flag = 1 + (i + 1) * count;
            if (flag < length && value[flag] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: Record<string, string> = {};
            const date = `20${this.ByteToHexString(value[2 + i * count])}.${this.ByteToHexString(value[3 + i * count])}.${this.ByteToHexString(value[4 + i * count])}`;
            let step = 0;
            let time = 0;
            let cal = 0;
            let distance = 0;

            for (let j = 0; j < 4; j++) {
                step += this.getValue(value[5 + j + i * count], j);
            }
            for (let j = 0; j < 4; j++) {
                time += this.getValue(value[9 + j + i * count], j);
            }
            for (let j = 0; j < 4; j++) {
                distance += this.getValue(value[13 + j + i * count], j);
            }
            for (let j = 0; j < 4; j++) {
                cal += this.getValue(value[17 + j + i * count], j);
            }

            const exerciseTime = this.getValue(value[count - 4 + i * count], 0);
            const goal = count === 26
                ? this.getValue(value[21 + i * count], 0)
                : this.getValue(value[21 + i * count], 0) + this.getValue(value[22 + i * count], 1);

            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.Step] = String(step);
            hashMap[DeviceKey.ExerciseMinutes] = String(time);
            hashMap[DeviceKey.Calories] = numberFormat.format(cal / 100);
            hashMap[DeviceKey.Distance] = numberFormat.format(distance / 100);
            hashMap[DeviceKey.Goal] = String(goal);
            hashMap[DeviceKey.ActiveMinutes] = String(exerciseTime);

            list.push(hashMap);
        }

        return maps;
    }

    private static getStepCount(value: Uint8Array): number {
        let goal = 27;
        const length = value.length;

        if (length !== 2) {
            if (length % 26 === 0) {
                goal = 26;
            } else if (length % 27 === 0) {
                goal = 27;
            } else {
                if ((length - 2) % 26 === 0) {
                    goal = 26;
                } else if ((length - 2) % 27 === 0) {
                    goal = 27;
                }
            }
        }

        return goal;
    }

    public static getDetailData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDetailActivityData;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 25;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        const numberFormat = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            useGrouping: false,
        });

        for (let i = 0; i < size; i++) {
            const hashMap: { [key: string]: string } = {};
            const flag = 1 + (i + 1) * count;

            if (value[length - 1] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const date = `20${this.ByteToHexString(value[3 + i * count])}.${this.ByteToHexString(value[4 + i * count])}.${this.ByteToHexString(value[5 + i * count])} ${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;

            let step = 0;
            let cal = 0;
            let distance = 0;
            const stringBuffer: string[] = [];

            for (let j = 0; j < 2; j++) {
                step += this.getValue(value[9 + j + i * count], j);
            }

            for (let j = 0; j < 2; j++) {
                cal += this.getValue(value[11 + j + i * count], j);
            }

            for (let j = 0; j < 2; j++) {
                distance += this.getValue(value[13 + j + i * count], j);
            }

            for (let j = 0; j < 10; j++) {
                stringBuffer.push(String(this.getValue(value[15 + j + i * count], 0)));
            }

            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.KDetailMinterStep] = String(step);
            hashMap[DeviceKey.Calories] = numberFormat.format(cal / 100);
            hashMap[DeviceKey.Distance] = numberFormat.format(distance / 100);
            hashMap[DeviceKey.ArraySteps] = stringBuffer.join(' ');

            list.push(hashMap);
        }

        return maps;
    }

    public static getSleepData(value: Uint8Array): { [key: string]: any } {
        const length = value.length;
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDetailSleepData;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const end = value[length - 1] === 0xff && value[length - 2] === DeviceConst.CMD_Get_SleepData;
        if (end) { maps[DeviceKey.End] = true; }

        if (length === 130 || (end && length === 132)) {
            // One-minute sleep data
            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3])}-${this.ByteToHexString(value[4])}-${this.ByteToHexString(value[5])} ` +
                `${this.ByteToHexString(value[6])}:${this.ByteToHexString(value[7])}:${this.ByteToHexString(value[8])}`;
            hashMap[DeviceKey.Date] = date;

            const sleepLength = this.getValue(value[9], 0);
            const stringBuffer: string[] = [];
            for (let j = 0; j < sleepLength; j++) {
                stringBuffer.push(String(this.getValue(value[10 + j], 0)));
            }

            hashMap[DeviceKey.ArraySleep] = stringBuffer.join(' ');
            hashMap[DeviceKey.sleepUnitLength] = "1";
            list.push(hashMap);
            // const count = 34;
            // const size = Math.floor(length / count);

            // if (size === 0) {
            //     maps[DeviceKey.Data] = list;
            //     maps[DeviceKey.End] = true;
            //     return maps;
            // }

            // for (let i = 0; i < size; i++) {
            //     const hashMap: { [key: string]: string } = {};
            //     const date = `20${this.bcd2String(value[3 + i * count])}-${this.bcd2String(value[4 + i * count])}-${this.bcd2String(value[5 + i * count])} ` +
            //         `${this.bcd2String(value[6 + i * count])}:${this.bcd2String(value[7 + i * count])}:${this.bcd2String(value[8 + i * count])}`;
            //     hashMap[DeviceKey.Date] = date;

            //     const sleepLength = this.getValue(value[9 + i * count], 0);
            //     const stringBuffer: string[] = [];
            //     try {
            //         for (let j = 0; j < sleepLength; j++) {
            //             stringBuffer.push(String(this.getValue(value[10 + j + i * count], 0)));
            //         }
            //     } catch (e) {
            //         console.error(e);
            //     }

            //     hashMap[DeviceKey.ArraySleep] = stringBuffer.join(' ');
            //     hashMap[DeviceKey.sleepUnitLength] = "5";
            //     list.push(hashMap);
            // }
        } else {
            // Multi-minute sleep data
            const count = 34;
            const size = Math.floor(length / count);

            if (size === 0) {
                maps[DeviceKey.Data] = list;
                maps[DeviceKey.End] = true;
                return maps;
            }

            for (let i = 0; i < size; i++) {
                const hashMap: { [key: string]: string } = {};
                const date = `20${this.ByteToHexString(value[3 + i * count])}-${this.ByteToHexString(value[4 + i * count])}-${this.ByteToHexString(value[5 + i * count])} ` +
                    `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
                hashMap[DeviceKey.Date] = date;

                const sleepLength = this.getValue(value[9 + i * count], 0);
                const stringBuffer: string[] = [];
                try {
                    for (let j = 0; j < sleepLength; j++) {
                        stringBuffer.push(String(this.getValue(value[10 + j + i * count], 0)));
                    }
                } catch (e) {
                    console.error(e);
                }

                hashMap[DeviceKey.ArraySleep] = stringBuffer.join(' ');
                hashMap[DeviceKey.sleepUnitLength] = "5";
                list.push(hashMap);
            }
        }

        return maps;
    }

    public static getBloodoxygen(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.Blood_oxygen;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 10;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        for (let i = 0; i < size; i++) {
            if (value[length - 1] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3 + i * count])}-${this.ByteToHexString(value[4 + i * count])}-${this.ByteToHexString(value[5 + i * count])} ` +
                `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
            hashMap[DeviceKey.Date] = date;

            const bloodOxygen = String(this.getValue(value[9 + i * count], 0));
            hashMap[DeviceKey.Blood_oxygen] = bloodOxygen;

            list.push(hashMap);
        }

        return maps;
    }

    public static getHeartData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetDynamicHR;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 24;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        for (let i = 0; i < size; i++) {
            if (value[length - 1] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3 + i * count])}-${this.ByteToHexString(value[4 + i * count])}-${this.ByteToHexString(value[5 + i * count])} ` +
                `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
            hashMap[DeviceKey.Date] = date;

            const stringBuffer: string[] = [];
            for (let j = 0; j < 15; j++) {
                stringBuffer.push(String(this.getValue(value[9 + j + i * count], 0)));
            }
            hashMap[DeviceKey.ArrayDynamicHR] = stringBuffer.join(' ');

            list.push(hashMap);
        }

        return maps;
    }

    public static getOnceHeartData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetStaticHR;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 10;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        for (let i = 0; i < size; i++) {
            if (value[length - 1] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3 + i * count])}.${this.ByteToHexString(value[4 + i * count])}.${this.ByteToHexString(value[5 + i * count])} ` +
                `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
            const heart = String(this.getValue(value[9 + i * count], 0));

            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.StaticHR] = heart;
            list.push(hashMap);
        }

        return maps;
    }

    public static deleteHrv(): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.DeleteHrv;
        maps[DeviceKey.End] = true;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;
        return maps;
    }

    public static getHrvTestData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetHRVData;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 15;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }
        if (value[length - 1] === 0xff) {
            maps[DeviceKey.End] = true;
        }

        for (let i = 0; i < size; i++) {
            const hashMap: { [key: string]: string } = {};

            const date = `20${this.ByteToHexString(value[3 + i * count])}-${this.ByteToHexString(value[4 + i * count])}-${this.ByteToHexString(value[5 + i * count])} `
                + `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;

            const hrv = String(this.getValue(value[9 + i * count], 0));
            const blood = String(this.getValue(value[10 + i * count], 0));
            const heart = String(this.getValue(value[11 + i * count], 0));
            const tired = String(this.getValue(value[12 + i * count], 0));
            const moodValue = String(this.getValue(value[13 + i * count], 0));
            const breathRate = String(this.getValue(value[14 + i * count], 0));

            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.HRV] = hrv;
            hashMap[DeviceKey.VascularAging] = blood;
            hashMap[DeviceKey.Stress] = tired;
            hashMap[DeviceKey.highBP] = moodValue;
            hashMap[DeviceKey.lowBP] = breathRate;
            hashMap[DeviceKey.HeartRate] = heart;

            list.push(hashMap);
        }

        return maps;
    }

    public static getClockData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetAlarmClock;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 41;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        for (let i = 0; i < size; i++) {
            const flag = 1 + (i + 1) * count;
            if (flag < length && value[flag] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const id = String(this.getValue(value[4 + i * count], 0));
            const enable = String(this.getValue(value[5 + i * count], 0));
            const type = String(this.getValue(value[6 + i * count], 0));
            const hour = this.ByteToHexString(value[7 + i * count]);
            const min = this.ByteToHexString(value[8 + i * count]);
            const week = this.getByteString(value[9 + i * count]);
            const lengthS = this.getValue(value[10 + i * count], 0);

            let content = "";
            for (let j = 0; j < lengthS; j++) {
                if (value[11 + j + i * count] === 0) continue;
                content += String.fromCharCode(this.getValue(value[11 + j + i * count], 0));
            }

            hashMap[DeviceKey.KAlarmId] = id;
            hashMap[DeviceKey.OpenOrClose] = enable;
            hashMap[DeviceKey.ClockType] = type;
            hashMap[DeviceKey.ClockTime] = hour;
            hashMap[DeviceKey.KAlarmMinter] = min;
            hashMap[DeviceKey.Week] = week;
            hashMap[DeviceKey.KAlarmContent] = content;
            hashMap[DeviceKey.KAlarmLength] = String(lengthS);

            list.push(hashMap);
        }

        return maps;
    }


    private static readonly TAG: string = "ResolveUtil";

    /*    public static Map<String,Object> getHistoryGpsData(byte[] value) {
            Map<String,Object> maps=new HashMap<>();
            maps.put(DeviceKey.DataType, BleConst.GetGPSData);
            maps.put(DeviceKey.End,false);
            List<Map<String, String>> list = new ArrayList<>();
            maps.put(DeviceKey.Data, list);
            int count = 59;
            int length = value.length;
            int size = length / count;
    
    
            if (size == 0) {
                maps.put(DeviceKey.End,true);
                return maps;
            }
            for (int i = 0; i < size; i++) {
                int flag = 1 + (i + 1) * count;
                if (flag < length && i==size-1&&value[flag] == (byte) 0xff) {
                    maps.put(DeviceKey.End,true);
                }
                Map<String, String> hashMap = new HashMap<>();
                int id=getValue(value[1+i*count],0)+getValue(value[2+i*count],1);
                String date = ByteToHexString(value[3 + i * count]) + "."
                        + ByteToHexString(value[4 + i * count]) + "." + ByteToHexString(value[5 + i * count]) + " "
                        + ByteToHexString(value[6 + i * count]) + ":" + ByteToHexString(value[7 + i * count]) + ":" + ByteToHexString(value[8 + i * count]);
                byte[] valueLatitude = new byte[4];
                byte[] valueLongitude = new byte[4];
                StringBuffer stringBufferLatitude = new StringBuffer();
                StringBuffer stringBufferLongitude = new StringBuffer();
                for (int k = 0; k < 6; k++) {
                    for (int j = 0; j < 4; j++) {
                        valueLatitude[3 - j] = value[9 + j + i * count + k * 8];
                        valueLongitude[3 - j] = value[13 + j + i * count + k * 8];
                    }
                    String Latitude = String.valueOf(getFloat(valueLatitude, 0));
                    String Longitude = String.valueOf(getFloat(valueLongitude, 0));
                    stringBufferLatitude.append(Latitude).append(k == 5 ? "" : ",");
                    stringBufferLongitude.append(Longitude).append(k == 5 ? "" : ",");
                }
                hashMap.put(DeviceKey.Date, date);
                hashMap.put(DeviceKey.KDataID,String.valueOf(id));
                hashMap.put(DeviceKey.Latitude, stringBufferLatitude.toString());
                hashMap.put(DeviceKey.Longitude, stringBufferLongitude.toString());
                list.add(hashMap);
            }
    
            return maps;
        }*/

    /*    public static Map<String,Object> getActivityGpsData(byte[] value) {
            Map<String,Object> maps=new HashMap<>();
            maps.put(DeviceKey.DataType, BleConst.DeviceSendToApp);
            maps.put(DeviceKey.End,true);
            Map<String, String> hashMap = new HashMap<>();
            maps.put(DeviceKey.Data, hashMap);
            String date = ByteToHexString(value[1]) + "-"
                    + ByteToHexString(value[2]) + "-" + ByteToHexString(value[3]) + " "
                    + ByteToHexString(value[4]) + ":" + ByteToHexString(value[5]) + ":" + ByteToHexString(value[6]);
            byte[] valueLatitude = new byte[4];
            byte[] valueLongitude = new byte[4];
            for (int j = 0; j < 4; j++) {
                valueLatitude[3 - j] = value[9+j ];
                valueLongitude[3 - j] = value[14+j];
            }
            String Latitude = String.valueOf(getFloat(valueLatitude, 0));
            String Longitude = String.valueOf(getFloat(valueLongitude, 0));
            int count=getValue(value[18],0);
    
            hashMap.put(DeviceKey.KActivityLocationTime, date);
            hashMap.put(DeviceKey.KActivityLocationLatitude, Latitude);
            hashMap.put(DeviceKey.KActivityLocationLongitude, Longitude);
            hashMap.put(DeviceKey.KActivityLocationCount, String.valueOf(count));
    
            return maps;
        }*/
    public static getTempDataer(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        maps[DeviceKey.DataType] = BleConst.GetAxillaryTemperatureDataWithMode;
        maps[DeviceKey.End] = false;
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.Data] = list;

        const count = 11;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0 || value[length - 1] === 0xff) {
            maps[DeviceKey.End] = true;
        }

        const numberFormat = this.getNumberFormat(1);

        for (let i = 0; i < size; i++) {
            const hashMap: { [key: string]: string } = {};
            const date = `20${this.bcd2String(value[3 + i * count])}.${this.bcd2String(value[4 + i * count])}.${this.bcd2String(value[5 + i * count])} `
                + `${this.bcd2String(value[6 + i * count])}:${this.bcd2String(value[7 + i * count])}:${this.bcd2String(value[8 + i * count])}`;
            const tempValue = this.getValue(value[9 + i * count], 0) + this.getValue(value[10 + i * count], 1);
            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.axillaryTemperature] = numberFormat.format(tempValue * 0.1);
            list.push(hashMap);
        }

        return maps;
    }


    public static getTempData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.DataType] = BleConst.Temperature_history;
        maps[DeviceKey.End] = false;
        maps[DeviceKey.Data] = list;

        const count = 11;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0 || value[length - 1] === 0xff) {
            maps[DeviceKey.End] = true;
        }

        const numberFormat = this.getNumberFormat(1);

        for (let i = 0; i < size; i++) {
            if (value[length - 1] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3 + i * count])}-${this.ByteToHexString(value[4 + i * count])}-${this.ByteToHexString(value[5 + i * count])} ` +
                `${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
            // hashMap[DeviceKey.Date] = date;
            // const date = `20${this.bcd2String(value[3 + i * count])}.${this.bcd2String(value[4 + i * count])}.${this.bcd2String(value[5 + i * count])} `
            //     + `${this.bcd2String(value[6 + i * count])}:${this.bcd2String(value[7 + i * count])}:${this.bcd2String(value[8 + i * count])}`;
            const tempValue = this.getValue(value[9 + i * count], 0) + this.getValue(value[10 + i * count], 1);
            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.temperature] = numberFormat.format(tempValue * 0.1);
            list.push(hashMap);
        }

        return maps;
    }


    //私有属性
    private databack: Databack | null = null;


    //setter方法
    setDataback(databack1: Databack): void {
        this.databack = databack1;
    }

    static ecgdata: number[] = [];
    static size: number = 0;
    static count: number = 0;
    static maps: { [key: string]: any } = {};
    static list: { [key: string]: string }[] = [];
    /*    public static void Getecgdata(byte[] value,Databack databack) {
            if (value[value.length - 1] == (byte) 0x71) {
                maps.put(DeviceKey.DataType, BleConst.DeleteECGdata);
                maps.put(DeviceKey.End,true);
               if(null!=databack){databack.Endback(maps);}
            }else if(3==value.length&&value[value.length - 1] == (byte) 0xff){
                if(read){
                    Map<String, String> hashMap = new HashMap<>();
                    hashMap.put(DeviceKey.ECGValue, ecgdata.toString()+"");
                    list.add(hashMap);
                    maps.put(DeviceKey.End,true);
                    if(null!=databack){databack.Endback(maps);}
                }else{
                    maps.put(DeviceKey.DataType, BleConst. ECGdata);
                    maps.put(DeviceKey.End,true);
                    if(null!=databack){databack.Endback(maps);}
    
    
                }
            }else{
    
                int index =getValue(value[1 ], 0)+getValue(value[2], 1) ;
                if(0==index){
                    ecgdata=new ArrayList<>();;
                    maps=new HashMap<>();
                    list = new ArrayList<>();
                    maps.put(DeviceKey.DataType, BleConst. ECGdata);
                    maps.put(DeviceKey.Data, list);
                    count=0;
                    size =getValue(value[9 ], 0)+getValue(value[10], 1) ;
                    String date = "20"+bcd2String(value[3]) + "."
                            + bcd2String(value[4 ]) + "." + bcd2String(value[5]) + " "
                            + bcd2String(value[6 ]) + ":" + bcd2String(value[7 ]) + ":" + bcd2String(value[8 ]);
                    Map<String, String> hashMap = new HashMap<>();
                    hashMap.put(DeviceKey.Date, date);
                    hashMap.put(DeviceKey.HRV, getValue(value[11], 0)+"");
                    hashMap.put(DeviceKey.HeartRate, getValue(value[12], 0)+"");
                    hashMap.put(DeviceKey.ECGMoodValue, getValue(value[12], 0)+"");
                    byte[] bs = new byte[value.length-14];
                    System.arraycopy(value, 14, bs, 0, bs.length);
                    for (int i=0;i<bs.length/2;i++){
                        int valueddd = i*2;
                        int ecg = getValue(bs[valueddd], 0) + getValue(bs[valueddd+1], 1);
                        ecgdata.add(ecg);
                        count++;
                    }
                    //maps.put(DeviceKey.End,false);
                   // hashMap.put(DeviceKey.ECGValue, ecgdata.toString()+"");
                    list.add(hashMap);
    
                }else{
    
                    byte[] bs = new byte[value.length-3];
                    System.arraycopy(value, 3, bs, 0, bs.length);
                    for (int i=0;i<bs.length/2;i++){
                        int valueddd = i*2;
                        int ecg = getValue(bs[valueddd], 0) + getValue(bs[valueddd+1], 1);
                        ecgdata.add(ecg);
                        count++;
                    }
                    Log.e("count",count+"***"+size);
                   *//* if(size==count){
Map<String, String> hashMap = new HashMap<>();
hashMap.put(DeviceKey.ECGValue, ecgdata.toString()+"");
list.add(hashMap);
maps.put(DeviceKey.End,true);
if(null!=databack){databack.Endback(maps);}
}*//*
                                                                                                            
                                                                                                            }
                                                                                                            }
                                                                                                            
                                                                                                            }*/




    public static getEcgHistoryData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        const list: { [key: string]: string } = {};

        maps[DeviceKey.DataType] = BleConst.ECGdata;
        maps[DeviceKey.End] = false;
        maps[DeviceKey.Data] = list;

        const length = value.length;
        if (length === 3 || (value[length - 3] === 0x71 && value[length - 2] === 0xff && value[length - 1] === 0xff)) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        const id = this.getValue(value[1], 0) + this.getValue(value[2], 1);
        let offset = 3;

        if (id === 0) { // 第一条
            const date = `20${this.bcd2String(value[3])}-${this.bcd2String(value[4])}-${this.bcd2String(value[5])} ${this.bcd2String(value[6])}:${this.bcd2String(value[7])}:${this.bcd2String(value[8])}`;
            const hrv = String(this.getValue(value[11], 0));
            const heart = String(this.getValue(value[12], 0));
            const moodValue = String(this.getValue(value[13], 0));

            list[DeviceKey.Date] = date;
            list[DeviceKey.HRV] = hrv;
            list[DeviceKey.HeartRate] = heart;
            list[DeviceKey.ECGMoodValue] = moodValue;

            offset = 27;
        }

        const tempValue = value.slice(offset);
        const ecgData = this.getEcgDataString(tempValue);
        list[DeviceKey.ECGValue] = ecgData;

        return maps;
    }


    public static getEcgDataString(value: Uint8Array): string {
        const stringBuffer: string[] = [];
        const length = value.length / 2 - 1;

        for (let i = 0; i < length; i++) {
            let ecgValue = this.getValue(value[i * 2 + 1], 1) + this.getValue(value[i * 2 + 2], 0);

            // Handle sign extension for 16-bit signed values
            if (ecgValue >= 32768) {
                ecgValue -= 65536;
            }

            stringBuffer.push(ecgValue.toString());
        }

        return stringBuffer.join(",");
    }
    protected static getPPGData(value: Uint8Array): string {
        const stringBuffer: string[] = [];

        for (let i = 0; i < value.length; i++) {
            const ppgValue = this.getValue(value[i], 0);
            stringBuffer.push(ppgValue.toString());
        }

        return stringBuffer.join(",");
    }

    protected static getDoublePPGData(value: Uint8Array): string {
        const stringBuffer: string[] = [];
        const length = value.length / 2;

        for (let i = 0; i < length; i++) {
            const highByte = this.getValue(value[2 * i], 1);
            const lowByte = this.getValue(value[2 * i + 1], 0);
            let ppgValue = highByte + lowByte;

            // Uncomment this if you need to handle negative values
            // if (ppgValue >= 32768) ppgValue -= 65536;

            stringBuffer.push(ppgValue.toString());
        }

        return stringBuffer.join(",");
    }
    public static getFloatFromBytes(byteArray: Uint8Array): number {
        const view = new DataView(byteArray.buffer);
        return view.getFloat32(0, false); // Assuming big-endian, use `true` for little-endian
    }

    public static getExerciseData(value: Uint8Array): { [key: string]: any } {
        const maps: { [key: string]: any } = {};
        const list: { [key: string]: string }[] = [];
        maps[DeviceKey.DataType] = BleConst.GetActivityModeData;
        maps[DeviceKey.End] = false;
        maps[DeviceKey.Data] = list;

        const count = 25;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            maps[DeviceKey.End] = true;
            return maps;
        }

        const numberFormatCal = this.getNumberFormat(1);
        const numberFormat = this.getNumberFormat(2);

        for (let i = 0; i < size; i++) {
            const flag = 1 + (i + 1) * count;
            if (flag < length && i === size - 1 && value[flag] === 0xff) {
                maps[DeviceKey.End] = true;
            }

            const hashMap: { [key: string]: string } = {};
            const date = `20${this.ByteToHexString(value[3 + i * count])}-${this.ByteToHexString(value[4 + i * count])}-${this.ByteToHexString(value[5 + i * count])} ${this.ByteToHexString(value[6 + i * count])}:${this.ByteToHexString(value[7 + i * count])}:${this.ByteToHexString(value[8 + i * count])}`;
            const mode = this.getValue(value[9 + i * count], 0).toString();
            const heartRate = this.getValue(value[10 + i * count], 0).toString();
            const periodTime = this.getData(2, 11 + i * count, value);
            const steps = this.getData(2, 13 + i * count, value);
            const speedMin = this.getValue(value[15 + i * count], 0);
            const speedS = this.getValue(value[16 + i * count], 0);

            const valueCal = new Uint8Array(4);
            const valueDistance = new Uint8Array(4);

            // Copy the bytes for valueCal
            for (let j = 0; j < 4; j++) {
                valueCal[3 - j] = value[17 + j + i * count];
            }

            // Copy the bytes for valueDistance
            for (let j = 0; j < 4; j++) {
                valueDistance[3 - j] = value[21 + j + i * count];
            }

            // Convert the byte arrays to floats
            const cal = this.getFloatFromBytes(valueCal);
            const distance = this.getFloatFromBytes(valueDistance);

            hashMap[DeviceKey.Date] = date;
            hashMap[DeviceKey.ActivityMode] = mode;
            hashMap[DeviceKey.HeartRate] = heartRate;
            hashMap[DeviceKey.ActiveMinutes] = periodTime.toString();
            hashMap[DeviceKey.Step] = steps.toString();
            hashMap[DeviceKey.Pace] = `${speedMin.toString().padStart(2, '0')}'${speedS.toString().padStart(2, '0')}"`;
            hashMap[DeviceKey.Distance] = numberFormat.format(distance);
            hashMap[DeviceKey.Calories] = numberFormatCal.format(cal),
                list.push(hashMap)
        }

        return maps;
    }

    public static getActivityExerciseData(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        maps.set(DeviceKey.DataType, BleConst.SportData);
        maps.set(DeviceKey.End, true);

        const map: Map<string, string> = new Map();
        maps.set(DeviceKey.Data, map);

        const heartRate = this.getValue(value[1], 0);
        let steps = 0;
        let kcal = 0;

        for (let i = 0; i < 4; i++) {
            steps += this.getValue(value[i + 2], i);
        }

        const valueCal = new Uint8Array(4);
        for (let i = 0; i < 4; i++) {
            valueCal[3 - i] = value[i + 6];
        }

        let time = 0;
        for (let i = 0; i < 4; i++) {
            time += this.getValue(value[i + 10], i);
        }

        kcal = this.getFloat(valueCal, 0);

        map.set(DeviceKey.HeartRate, heartRate.toString());
        map.set(DeviceKey.Step, steps.toString());
        map.set(DeviceKey.Calories, kcal.toString());
        map.set(DeviceKey.ActiveMinutes, time.toString());

        return maps;
    }
    public static setTimeSuccessful(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        maps.set(DeviceKey.DataType, BleConst.SetDeviceTime);
        maps.set(DeviceKey.End, true);

        const map: Map<string, string> = new Map();
        maps.set(DeviceKey.Data, map);

        map.set(DeviceKey.KPhoneDataLength, this.getValue(value[1], 0).toString());

        return maps;
    }


    public static setMacSuccessful(): Map<string, any> {
        const maps = new Map<string, any>();
        maps.set(DeviceKey.DataType, BleConst.CMD_Set_Mac);
        maps.set(DeviceKey.End, true);

        const map: Map<string, string> = new Map();
        maps.set(DeviceKey.Data, map);

        return maps;
    }

    public static ECGData(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        const mapData = new Map<string, Uint8Array>();

        maps.set(DeviceKey.End, true);
        maps.set(DeviceKey.DataType, BleConst.EcgppG);
        maps.set(DeviceKey.Data, mapData);
        mapData.set(DeviceKey.ECGValue, value);

        return maps;
    }
    public static ecgData(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        const map = new Map<string, string>();

        maps.set(DeviceKey.End, true);
        maps.set(DeviceKey.DataType, BleConst.EcgppGstatus);

        const index = this.getValue(value[1], 0);
        map.set(DeviceKey.EcgStatus, index.toString());

        maps.set(DeviceKey.Data, map);
        return maps;
    }

    public static GetEcgPpgStatus(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        maps.set(DeviceKey.End, true);
        maps.set(DeviceKey.DataType, BleConst.GetEcgPpgStatus);

        const index = this.getValue(value[1], 0);
        const map = new Map<string, number | string>();
        map.set(DeviceKey.EcgStatus, index);

        maps.set(DeviceKey.Data, map);

        if (index === 3) { // 有数据
            const HR = this.getValue(value[2], 0);
            const VascularAging = this.getValue(value[3], 0);
            const HeartRate = this.getValue(value[4], 0);
            const Fatiguedegree = this.getValue(value[5], 0);
            const HighPressure = this.getValue(value[6], 0);
            const LowPressure = this.getValue(value[7], 0);
            const ECGMoodValue = this.getValue(value[8], 0);
            const ECGBreathValue = this.getValue(value[9], 0);

            map.set(DeviceKey.HeartRate, HeartRate);
            map.set(DeviceKey.VascularAging, VascularAging);
            map.set(DeviceKey.HRV, HR);
            map.set(DeviceKey.Fatiguedegree, Fatiguedegree);
            map.set(DeviceKey.HighPressure, HighPressure);
            map.set(DeviceKey.LowPressure, LowPressure);
            map.set(DeviceKey.ECGMoodValue, ECGMoodValue);
            map.set(DeviceKey.ECGBreathValue, ECGBreathValue);

            const date = "20" + this.ByteToHexString(value[10]) + "." +
                this.ByteToHexString(value[11]) + "." + this.ByteToHexString(value[12]) + " " +
                this.ByteToHexString(value[13]) + ":" + this.ByteToHexString(value[14]) + ":" + this.ByteToHexString(value[15]);
            maps.set(DeviceKey.Date, date);
        }

        return maps;
    }
    public static ECGResult(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        const mapData = new Map<string, string>();

        maps.set(DeviceKey.End, true);
        maps.set(DeviceKey.DataType, BleConst.ECGResult);
        maps.set(DeviceKey.Data, mapData);

        const resultValue = this.getValue(value[1], 0);
        const date = "20" + this.ByteToHexString(value[10]) + "." +
            this.ByteToHexString(value[11]) + "." + this.ByteToHexString(value[12]) + " " +
            this.ByteToHexString(value[13]) + ":" + this.ByteToHexString(value[14]) + ":" + this.ByteToHexString(value[15]);

        const hrv = this.getValue(value[2], 0);
        const avBlock = this.getValue(value[3], 0);
        const hr = this.getValue(value[4], 0);
        const strees = this.getValue(value[5], 0);
        const highBp = this.getValue(value[6], 0);
        const lowBp = this.getValue(value[7], 0);
        const moodValue = this.getValue(value[8], 0);
        const breathValue = this.getValue(value[9], 0);

        mapData.set(DeviceKey.ECGResultValue, resultValue.toString());
        mapData.set(DeviceKey.Date, date);
        mapData.set(DeviceKey.ECGHrvValue, hrv.toString());
        mapData.set(DeviceKey.ECGAvBlockValue, avBlock.toString());
        mapData.set(DeviceKey.ECGHrValue, hr.toString());
        mapData.set(DeviceKey.ECGStreesValue, strees.toString());
        mapData.set(DeviceKey.ECGhighBpValue, highBp.toString());
        mapData.set(DeviceKey.ECGLowBpValue, lowBp.toString());
        mapData.set(DeviceKey.ECGMoodValue, moodValue.toString());
        mapData.set(DeviceKey.ECGBreathValue, breathValue.toString());

        return maps;
    }
    public static enterEcg(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        const mapData = new Map<string, string>();

        maps.set(DeviceKey.End, true);
        maps.set(DeviceKey.DataType, BleConst.ENTERECG);
        maps.set(DeviceKey.Data, mapData);

        return maps;
    }
    public static updateClockSuccessful(value: Uint8Array): Map<string, any> {
        const maps = new Map<string, any>();
        const map = new Map<string, string>();

        maps.set(DeviceKey.DataType, BleConst.SetAlarmClockWithAllClock);
        maps.set(DeviceKey.End, true);
        maps.set(DeviceKey.Data, map);

        const lastByte = value[value.length - 1];
        map.set(DeviceKey.KClockLast, String(this.getValue(lastByte, 0)));

        return maps;
    }

    public static getData(length: number, start: number, value: Uint8Array): number {
        let data = 0;
        for (let j = 0; j < length; j++) {
            data += this.getValue(value[j + start], j);
        }
        return data;
    }


    public static getValue(b: number, count: number): number {
        return ((b & 0xff) * Math.pow(256, count)) | 0;
    }

    public static ByteToHexString(a: number): string {
        // Ensure a is between 0 and 255 (byte range)
        let s = (a & 0xff).toString(16);
        if (s.length === 1) {
            s = '0' + s; // Pad with leading zero if needed
        }
        return s;
    }

    public static getFloat(arr: Uint8Array, index: number): number {
        const intBits = this.getInt(arr, index);
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setInt32(0, intBits, true); // true for little-endian
        return view.getFloat32(0, true); // true for little-endian
    }

    public static getInt(arr: Uint8Array, index: number): number {
        return (
            (arr[index] & 0xff) |
            ((arr[index + 1] & 0xff) << 8) |
            ((arr[index + 2] & 0xff) << 16) |
            ((arr[index + 3] & 0xff) << 24)
        );
    }
    public static getNumberFormat(max: number): Intl.NumberFormat {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: max,
            useGrouping: false
        });
    }
    public static byte2Hex(data: number): string {
        // Ensure the byte is between 0 and 255
        const hex = (data & 0xff).toString(16).toUpperCase();
        return hex.padStart(2, '0') + ' ';
    }
    public static getCurrentTimeZone(): string {
        const date = new Date();
        const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offsetMinutes = date.getTimezoneOffset();
        const offsetHours = -offsetMinutes / 60;
        const offsetStr = offsetHours >= 0 ? `+${Math.abs(offsetHours)}` : `-${Math.abs(offsetHours)}`;

        const strTz = `GMT${offsetStr.padStart(3, '0')}`;
        return strTz;
    }
    public static setMethodSuccessful(dataType: string): Record<string, any> {
        return {
            [DeviceKey.DataType]: dataType,
            [DeviceKey.End]: true,
            [DeviceKey.Data]: {}
        };
    }

    public static getTemperatureCorrectionValue(value: Uint8Array): Record<string, any> {
        const maps: Record<string, any> = {};
        maps[DeviceKey.DataType] = BleConst.CMD_Set_TemperatureCorrection;
        maps[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        maps[DeviceKey.Data] = mapData;

        const tempValue = new Uint8Array(2);
        tempValue[0] = value[3];
        tempValue[1] = value[2];
        const temperatureCorrectionValue = BleSDK.byteArrayToInt(tempValue);

        mapData[DeviceKey.TemperatureCorrectionValue] = temperatureCorrectionValue.toString();

        return maps;
    }

    public static getWorkOutReminder(value: Uint8Array): string[] {
        const activityAlarm: string[] = new Array(6);

        const startHour = this.bcd2String(value[1]);
        const startMin = this.bcd2String(value[2]);
        const days = this.getValue(value[3], 0).toString();
        const week = this.getByteString(value[4]);
        const enable = this.getValue(value[5], 0);
        const time = this.getValue(value[6], 0) + this.getValue(value[7], 1);

        activityAlarm[0] = startHour;
        activityAlarm[1] = startMin;
        activityAlarm[2] = days;
        activityAlarm[3] = week;
        activityAlarm[4] = enable.toString();
        activityAlarm[5] = time.toString();

        return activityAlarm;
    }
    /**
     *
     *
     */
    public static getWomenHealth(value: Uint8Array): Record<string, any> {
        const hashMap: Record<string, any> = {};
        hashMap[DeviceKey.DataType] = BleConst.GetWomenHealth;
        hashMap[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        mapData[DeviceKey.Month] = this.bcd2String(value[1]);
        mapData[DeviceKey.Day] = this.bcd2String(value[2]);
        mapData[DeviceKey.MenstrualPeriod_Lenth] = this.bcd2String(value[3]);
        mapData[DeviceKey.MenstrualPeriod_Period] = this.bcd2String(value[4]);

        hashMap[DeviceKey.Data] = mapData;

        return hashMap;
    }

    public static getPeisu(nungb: number): Record<string, any> {
        const hashMap: Record<string, any> = {};
        hashMap[DeviceKey.DataType] = BleConst.Getpeisu;
        hashMap[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        mapData[DeviceKey.Day] = nungb.toString();

        hashMap[DeviceKey.Data] = mapData;

        return hashMap;
    }

    public static getPeisuER(): Record<string, any> {
        const hashMap: Record<string, any> = {};
        hashMap[DeviceKey.DataType] = BleConst.GetpeisuER;
        hashMap[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        hashMap[DeviceKey.Data] = mapData;

        return hashMap;
    }

    public static getPregnancyCycle(value: Uint8Array): Record<string, any> {
        const hashMap: Record<string, any> = {};
        hashMap[DeviceKey.DataType] = BleConst.GetPregnancyCycle;
        hashMap[DeviceKey.End] = true;

        const mapData: Record<string, string> = {};
        mapData[DeviceKey.Year] = this.bcd2String(value[3]);
        mapData[DeviceKey.Month] = this.bcd2String(value[4]);
        mapData[DeviceKey.Day] = this.bcd2String(value[5]);

        hashMap[DeviceKey.Data] = mapData;

        return hashMap;
    }

    public static getHistoryGpsData(value: Uint8Array): HistoryGpsData {
        const list: Array<Record<string, string>> = [];
        const mmp: HistoryGpsData = {
            [DeviceKey.DataType]: 'Gps',
            [DeviceKey.End]: false,
            [DeviceKey.Data]: ''
        };

        const count = 59;
        const length = value.length;
        const size = Math.floor(length / count);

        if (size === 0) {
            return mmp;
        }

        const index = size * 50;
        if (value[length - 1] === 0xff && value[length - 2] === 0x5a) {
            mmp[DeviceKey.End] = true;
        }

        for (let i = 0; i < size; i++) {
            const flag = 1 + (i + 1) * count;
            const hashMap: Record<string, string> = {};
            const id = this.getValue(value[1 + i * count], 0) + this.getValue(value[2 + i * count], 1) % index;
            const date = `20${this.bcd2String(value[3 + i * count])}.${this.bcd2String(value[4 + i * count])}.${this.bcd2String(value[5 + i * count])} `
                + `${this.bcd2String(value[6 + i * count])}:${this.bcd2String(value[7 + i * count])}:${this.bcd2String(value[8 + i * count])}`;

            const valueLatitude = new Uint8Array(4);
            const valueLongitude = new Uint8Array(4);
            const stringBufferLatitude: string[] = [];
            const stringBufferLongitude: string[] = [];

            for (let k = 0; k < 6; k++) {
                for (let j = 0; j < 4; j++) {
                    valueLatitude[3 - j] = value[9 + j + i * count + k * 8];
                    valueLongitude[3 - j] = value[13 + j + i * count + k * 8];
                }
                const Latitude = this.getFloat(valueLatitude, 0).toString();
                const Longitude = this.getFloat(valueLongitude, 0).toString();
                stringBufferLatitude.push(Latitude);
                stringBufferLongitude.push(Longitude);
            }

            hashMap[DeviceKey.Date] = date.length === 17 ? date : '2019.01.01 00:00:00';
            hashMap[DeviceKey.Latitude] = stringBufferLatitude.join(',');
            hashMap[DeviceKey.Longitude] = stringBufferLongitude.join(',');
            list.push(hashMap);
        }

        mmp[DeviceKey.Data] = JSON.stringify(list);

        return mmp;
    }


    static B_HR: number[] = [
        0.012493658738073,
        0,
        -0.024987317476146,
        0,
        0.012493658738073
    ];
    static A_HR: number[] = [
        1,
        -3.658469528008591,
        5.026987876570873,
        -3.078346646055655,
        0.709828779797188
    ];

    static inPut: number[] = [0, 0, 0, 0, 0];

    static outPut: number[] = [0, 0, 0, 0, 0];

    public static filterEcgData(data: number): number {
        this.inPut[4] = data * 18.3 / 128 + 0.06;
        this.outPut[4] = this.B_HR[0] * this.inPut[4] +
            this.B_HR[1] * this.inPut[3] +
            this.B_HR[2] * this.inPut[2] +
            this.B_HR[3] * this.inPut[1] +
            this.B_HR[4] * this.inPut[0] -
            this.A_HR[1] * this.outPut[3] -
            this.A_HR[2] * this.outPut[2] -
            this.A_HR[3] * this.outPut[1] -
            this.A_HR[4] * this.outPut[0];

        for (let i = 0; i < 4; i++) {
            this.inPut[i] = this.inPut[i + 1];
            this.outPut[i] = this.outPut[i + 1];
        }

        return this.outPut[4];
    }
}
