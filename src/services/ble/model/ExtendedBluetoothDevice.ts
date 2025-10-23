import React from 'react';

// Define a type or interface for BluetoothDevice
interface BluetoothDevice {
    getAddress(): string;
    getName(): string;
}

// Define constants
const NO_RSSI = -1000;

// Define the props interface for the functional component
interface ExtendedBluetoothDeviceProps {
    device: BluetoothDevice;
    name?: string;
    rssi?: number;
}

// Define the functional component
const ExtendedBluetoothDevice = ({
    device,
    name = device.getName(),
    rssi = NO_RSSI
}: ExtendedBluetoothDeviceProps) => {
    // Method to check if the device matches
    const matches = (mdevice: BluetoothDevice): boolean => {
        return device.getAddress() === mdevice.getAddress();
    };

    return {
        matches
    }
};

export default ExtendedBluetoothDevice;
