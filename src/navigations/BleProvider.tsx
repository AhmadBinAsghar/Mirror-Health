import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import BleManager, {
    BleScanCallbackType,
    BleScanMatchMode,
    BleScanMode,
} from 'react-native-ble-manager'
import DeviceInfo from 'react-native-device-info';
import { ProviderConstant } from '../constants/BleProviderConstants/ProviderContants';
import { useDispatch, useSelector } from 'react-redux';
import { bleDataSave, setDevice } from '../redux/Slices/BleSlice';
import { ArrayConstants } from '../constants/BleProviderConstants/ContantsArray';
import { ResolveUtil } from '../services/ble/other/ResolveUtil';
import { userDetailsSave } from '../redux/Slices/userDataSlice';
import DateTimePicker from 'react-native-ui-datepicker';

const BleProvider = () => {
    const [isScanning, setIsScanning] = useState(true);
    const [bleDevices, setDevices] = useState<any[]>([]);
    const BleManagerModules = NativeModules.BleManager;
    const BleManagerEmitter = new NativeEventEmitter(BleManagerModules);
    const service = "fff0";
    const charhs = "fff6";
    const noti_Charhs = "fff7";
    const names = 'The Mirror Ring';
    const [battery, setBattery] = useState<any>(0);
    const [steps, setSteps] = useState<any>(0);
    const [distance, setDistance] = useState<any>(0);
    const [temperature, setTemperature] = useState<any>(0);
    const [calories, setCal] = useState<any>(0);
    const [oxygen, setoxygen] = useState<any>(0);
    const [heartRate, setHeartRate] = useState<any>(0);
    const [staticheart, setStaticHeart] = useState<any>(0);
    const [HRVArrayData, setHRVArrayData] = useState<any>([]);
    const [oxygenArray, setOxygenArray] = useState<any>([]);
    const [tempArray, setTempArray] = useState<any>([]);
    const [sleepArray, setSleepArray] = useState<any>([]);
    const [stress, setstress] = useState<any>(0);
    const [timer, setTimer] = useState(null);
    const [connected, setconnected] = useState<boolean>(false);
    const [sleepHours, setSleephours] = useState<number>(0);
    const [currentHRV, setCurrentHRV] = useState<number>(0);
    const [previousHRV, setPreviousHRV] = useState<number>(0);
    const [SpO2, setspO2] = useState<any>(0);
    const dispatch = useDispatch();
    const ConnectedDevice = useSelector((state: any) => state.bleDevice.device);
    const [notification, setNotification] = useState<any>(false);
    const [enabled, setEnabled] = useState<boolean>(false)
    const [actHistory, setActHistory] = useState<any>({})

    const enableBle = async () => {
        // This fuction enables the ble and then starts scanning fro devices.
        if (Platform.OS === 'android') {
            await BleManager.enableBluetooth().then(() => {
                setEnabled(true);
                startScanning();
            }).catch((err) => {
                setEnabled(false);
            })
        } else {
            setEnabled(true);
            startScanning()
        }
    }

    // const checkBleState = async () => {
    //     const state = await BleManager.checkState();
    //     if (state === "off") {
    //         dispatch(bleDataSave({ connected: false }))
    //         dispatch(userDetailsSave({ notify: false }));
    //     }
    //     // console.log("BLE CURENT STATE ==================", state)
    // }
    // useEffect(() => {
    //     checkBleState();
    // }, [])

    useEffect(() => {
        let stopListener = BleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                handleGetConnectedDevices();
            },
        );

        let disconnected = BleManagerEmitter.addListener(
            'BleManagerDisconnectPeripheral',
            peripheral => {
                // console.log('Disconnected Device', peripheral);
                disconnectDevice(peripheral?.peripheral)
                startScanning();
                // connectToDevice(ConnectedDevice)
            },
        );

        let characteristicValueUpdate = BleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            data => {
                readCharacteristicFromEvent(data)
            },
        );
        let BleManagerDidUpdateState = BleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            data => {
                // console.log('BleManagerDidUpdateState Event!', data);
                if (ConnectedDevice && data.state === "on") {
                    connectToDevice(ConnectedDevice);
                    // startScanning();
                } else if (ConnectedDevice && data.state === "off") {
                    disconnectDevice(ConnectedDevice?.id)
                }
            },
        );

        return () => {
            stopListener.remove();
            disconnected.remove();
            characteristicValueUpdate.remove();
            BleManagerDidUpdateState.remove();
        };
    }, []);

    const requestPermisions = async () => {
        // This function requests permissions for the ble and then enables it.
        if (Platform.OS === 'android') {
            const apiLevel = await DeviceInfo.getApiLevel();
            if (apiLevel < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'Bluetooth Low Energy requires Location',
                        buttonNeutral: 'Ask Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted) {
                    enableBle()
                }
            } else {
                const result = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);

                const isGranted =
                    result['android.permission.BLUETOOTH_CONNECT'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.BLUETOOTH_SCAN'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.ACCESS_FINE_LOCATION'] ===
                    PermissionsAndroid.RESULTS.GRANTED;

                if (isGranted) {
                    enableBle()
                }
            }
        } else {
            //For IOS if Any Permisions required.
        }
    };
    let scanInterval: NodeJS.Timeout;

    const startScanning = () => {
        setIsScanning(true);
        if (isScanning) {
            BleManager.scan([], 10, true, {
                matchMode: BleScanMatchMode.Sticky,
                scanMode: BleScanMode.LowLatency,
                callbackType: BleScanCallbackType.AllMatches,
            })
                .then((device) => {
                    // Handle scanned device if needed
                })
                .catch((error) => {
                    // console.log('Error on Scanning============\n', error);
                });

            // Stop scanning after 1 minute (60 seconds)
            setTimeout(() => {
                stopScanning();
            }, 60000); // 1 minute
        }
    };

    const stopScanning = () => {
        setIsScanning(false);

        // Stop the Bluetooth scanning
        BleManager.stopScan()
            .then(() => {
                // console.log("Scan stopped.");
            })
            .catch((error) => {
                // console.log('Error stopping scan============\n', error);
            });

        // Retry scanning after 5 minutes (300 seconds)
        scanInterval = setTimeout(() => {
            startScanning();
        }, 300000); // 5 minutes
    };

    // Call this function when you want to stop the repeating scan behavior
    const stopRepeatingScan = () => {
        clearTimeout(scanInterval);
    };
    const readCharacteristicFromEvent = (data: any) => {
        const { service, characteristic, value } = data;
        if (value[0] === ProviderConstant.CMD_Get_BatteryLevel) {
            setBattery(value[1])
        } if (value[0] === ProviderConstant.CMD_GET_TIME) {
            // console.log(ResolveUtil.getDeviceTime(value))
        } if (value[0] === ProviderConstant.CMD_SET_TIME) {
            // console.log(ResolveUtil.setTimeSuccessful(value))
        } if (value[0] === ProviderConstant.CMD_Enable_Activity) {
            const rate = value[21];
            const oxy = value[24];
            if (rate > 0) {
                setHeartRate(rate);
            }
            if (oxy > 0) {
                setspO2(oxy);
            }
            setSteps(ResolveUtil.getActivityData(value)?.dicData?.step);
            setDistance(ResolveUtil.getActivityData(value)?.dicData?.distance);
            setTemperature(value[22] + value[23]);
            setCal(ResolveUtil.getActivityData(value)?.dicData?.calories);
        } if (value[0] === ProviderConstant.Oxygen_data) {
            setoxygen((value[3] + value[4] + value[5] + value[6] + value[7]) / 2);
            setspO2(ResolveUtil.getBloodoxygen(value)?.dicData[0]?.Blood_oxygen);
            setOxygenArray(ResolveUtil.getBloodoxygen(value)?.dicData);
        } if (value[0] === ProviderConstant.CMD_Get_SleepData) {
            if (ResolveUtil.getSleepData(value)?.dataEnd === false) {
                setSleephours(ResolveUtil.getSleepData(value)?.dicData?.sleepUnitLength);
                setSleepArray((prev: any[]) => prev.concat(ResolveUtil.getSleepData(value)?.dicData))
            }
        } if (value[0] === ProviderConstant.CMD_Get_HeartData) {
            setCurrentHRV(ResolveUtil.getHeartData(value)?.dicData[0]?.arrayDynamicHR?.substring(0, 3));
            setPreviousHRV(ResolveUtil.getHeartData(value)?.dicData[ResolveUtil.getHeartData(value)?.dicData?.length - 1]?.arrayDynamicHR?.substring(0, 3))
        } if (value[0] === ProviderConstant.CMD_Get_OnceHeartData) {
        } if (value[0] === ProviderConstant.CMD_Get_HrvTestData) {
            setStaticHeart(ResolveUtil.getHrvTestData(value)?.dicData[0]?.heartRate);
            setstress(ResolveUtil.getHrvTestData(value)?.dicData[0]?.stress);
            setHRVArrayData(ResolveUtil.getHrvTestData(value)?.dicData);
        } if (value[0] === ProviderConstant.ReadTempHisrory) {
            if (ResolveUtil.getTempData(value)?.dataEnd === false) {
                setTempArray(ResolveUtil.getTempData(value)?.dicData)
            }
        } if (value[0] === ProviderConstant.CMD_Get_SPORTData) {
            setActHistory(ResolveUtil.getExerciseData(value)?.dicData)
            // console.log("DATA FROM DEVICE ===============\n", ResolveUtil.getExerciseData(value)?.dicData, "\n\n")
        } if (value[0] === ProviderConstant.CMD_Start_EXERCISE) {
            // console.log("VALUE FROM START EXERCISE ::", value)
        } if (value[0] === ProviderConstant.CMD_HeartPackageFromDevice) {
            const rate = value[1];
            if (rate > 0 || rate < 160) {
                setHeartRate(rate);
            }
        }
    };

    const handleGetConnectedDevices = React.useCallback(() => {
        BleManager.getDiscoveredPeripherals().then((results: any) => {
            if (results.length === 0) {
                // console.log("No devices found");
                setNotification(false);
                dispatch(userDetailsSave({ notify: false }));
            } else {
                setIsScanning(false);
                stopRepeatingScan();
                // console.log("\n\nFOUNCD DEVICES ========================>\n", JSON.stringify(results))
                const AllRings = results?.filter((item: any) => item?.name?.toLocaleLowerCase()?.includes(names?.toLocaleLowerCase()));
                connectToDevice(AllRings[0])
                setDevices(AllRings)
            }
        })
    }, [])

    const connectToDevice = async (item: any) => {
        try {
            await BleManager.connect(item?.id);
            const results = await BleManager.retrieveServices(item?.id);
            onServiesDiscoverd(results, item);
        } catch (err) {
            connectAgain(item);
            // startScanning()
        }
    }
    const connectAgain = async (item: any) => {
        try {
            await BleManager.connect(item?.id);
            const results = await BleManager.retrieveServices(item?.id);
            onServiesDiscoverd(results, item);
        } catch (err) {
            // startScanning()
            dispatch(bleDataSave({ connected: false }))
        }
    }
    const disconnectDevice = async (item: any) => {
        try {
            await BleManager.disconnect(item);
            dispatch(bleDataSave({ connected: false }))
            dispatch(userDetailsSave({ notify: false }));
            setNotification(false);
            setconnected(false);
            setDevices([]);
            // startScanning();
        } catch (err) {
            // console.log('Error on Disconnect============\n', err)
        }
    }
    const onServiesDiscoverd = async (results: any, item: any) => {
        dispatch(setDevice(item))
        stopRepeatingScan();
        setIsScanning(false);
        const service = results.services;
        const characteristic = results.characteristics;
        // console.log("SERVICES IN onServiesDiscoverd==============", service);
        service.forEach((service: any) => {
            const serviceUUID = service.uuid;
            if (serviceUUID === "fff0") {
                onChangeCharacteristics(serviceUUID, characteristic, item)
            }
        })
    }

    const onChangeCharacteristics = async (serviceUUID: string, result: any, item: any) => {
        dispatch(setDevice(item));
        setconnected(true);
        dispatch(bleDataSave({ connected: true }))
        const notiStart = await BleManager.startNotification(item?.id, service, noti_Charhs).then(() => {
            // console.log("Notification started");
            dispatch(userDetailsSave({ notify: true }));
            setNotification(true);
            return true
        }).catch((err) => {
            setNotification(false);
            dispatch(userDetailsSave({ notify: false }));
            return false
        })
        if (notiStart) {
            await BleManager.write(item?.id, service, charhs, ArrayConstants.getBatteryLevel).then((data) => {
            }).catch((err) => {
                // console.log(err);
            });
        }
    }

    const writeOnDevice = (dataArray: any[]) => {
        BleManager.write(ConnectedDevice?.id, service, charhs, dataArray).then((data) => {
        }).catch((err) => {
            // console.log(err);
        });
    }
    const readOnDevice = () => {
        BleManager.read(ConnectedDevice?.id, service, charhs).then((data) => {
            // console.log("DATA ON READ =================\n", data)
        }).catch((err) => {
            // console.log(err);
        });
    }

    const convertArrayToAlphabets = (arr: number[]): string => {
        return arr
            .map(num => String.fromCharCode(num))  // Convert each number to its ASCII character
            .filter(char => char >= ' ' && char <= '~' && char != '=')  // Filter out non-printable characters
            .join('');  // Join the characters into a single string
    }

    return {
        requestPermisions,
        enableBle,
        connectToDevice,
        bleDevices,
        connected,
        disconnectDevice,
        heartRate,
        steps,
        distance,
        temperature,
        calories,
        battery,
        oxygen,
        writeOnDevice,
        convertArrayToAlphabets,
        SpO2,
        sleepHours,
        currentHRV,
        previousHRV,
        stress,
        staticheart,
        HRVArrayData,
        oxygenArray,
        tempArray,
        sleepArray,
        notification,
        enabled,
        readOnDevice,
        actHistory
    };
}

export default BleProvider
