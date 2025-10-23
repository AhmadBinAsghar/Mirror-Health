export interface BleConnectionListener {
    BleStatus(status: number, newState: number): void; // Bluetooth 4.0 connection status
    ConnectionSucceeded(): void; // Successfully connected the device
    Connecting(): void; // Device is connecting
    ConnectionFailed(): void; // Device connection failed
    OnReconnect(): void; // Reconnecting
    BluetoothSwitchIsTurnedOff(): void; // Bluetooth switch is turned off
}
