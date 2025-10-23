export class DeviceBean {
    dataList: Array<Record<string, string>>;
    finish: boolean;

    constructor(dataList: Array<Record<string, string>> = [], finish: boolean = false) {
        this.dataList = dataList;
        this.finish = finish;
    }

    getDataList(): Array<Record<string, string>> {
        return this.dataList;
    }

    setDataList(dataList: Array<Record<string, string>>): void {
        this.dataList = dataList;
    }

    isFinish(): boolean {
        return this.finish;
    }

    setFinish(finish: boolean): void {
        this.finish = finish;
    }
}
