export interface Device {
    name: string;
    mac: string;
    productID: number;
    bluetoothDevice: any;
    isConted: boolean;
    isPaired: boolean;
    isDfu: boolean;
    riss: number;
    time: NodeJS.Timeout | null;
}

export function createDevice(
    name: string = '',
    mac: string = '',
    productID: number = 0
): Device {
    return {
        name,
        mac,
        productID,
        bluetoothDevice: null,
        isConted: false,
        isPaired: false,
        isDfu: false,
        riss: 100,
        time: null
    };
}

export function getRiss(device: Device): number {
    return device.riss;
}

export function setRiss(device: Device, riss: number): Device {
    return { ...device, riss };
}

export function isIsDfu(device: Device): boolean {
    return device.isDfu;
}

export function setIsDfu(device: Device, isDfu: boolean): Device {
    return { ...device, isDfu };
}

export function getTime(device: Device): NodeJS.Timeout | null {
    return device.time;
}

export function setTime(device: Device, time: NodeJS.Timeout | null): Device {
    return { ...device, time };
}

export function isPaired(device: Device): boolean {
    return device.isPaired;
}

export function setPaired(device: Device, paired: boolean): Device {
    return { ...device, isPaired: paired };
}

export function isIsConted(device: Device): boolean {
    return device.isConted;
}

export function setIsConted(device: Device, isConted: boolean): Device {
    return { ...device, isConted };
}

export function getName(device: Device): string {
    return device.name || '';
}

export function setName(device: Device, name: string): Device {
    return { ...device, name };
}

export function getMac(device: Device): string {
    return device.mac || '';
}

export function setMac(device: Device, mac: string): Device {
    return { ...device, mac };
}

export function getProductID(device: Device): number {
    return device.productID;
}

export function setProductID(device: Device, productID: number): Device {
    return { ...device, productID };
}

export function getBluetoothDevice(device: Device): any {
    return device.bluetoothDevice;
}

export function setBluetoothDevice(device: Device, bluetoothDevice: any): Device {
    return { ...device, bluetoothDevice };
}

export function deviceToString(device: Device): string {
    return `Device{name='${device.name}', mac='${device.mac}', productID=${device.productID}, bluetoothDevice=${device.bluetoothDevice}, isConted=${device.isConted}}`;
}
