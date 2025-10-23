// YhDeviceData.tsx

export class YhDeviceData {
    dataType: number; // index
    data: string; // data object
    dataEnd: boolean; // Is it over?

    constructor(dataType: number = 0, data: string = "", dataEnd: boolean = false) {
        this.dataType = dataType;
        this.data = data;
        this.dataEnd = dataEnd;
    }

    isDataEnd(): boolean {
        return this.dataEnd;
    }

    setDataEnd(dataEnd: boolean): void {
        this.dataEnd = dataEnd;
    }

    getDataType(): number {
        return this.dataType;
    }

    setDataType(dataType: number): void {
        this.dataType = dataType;
    }

    getData(): string {
        return this.data || "";
    }

    setData(data: string): void {
        this.data = data;
    }

    toString(): string {
        return `YhDeviceData{dataType=${this.dataType}, data=${this.data}, dataEnd=${this.dataEnd}}`;
    }
}
