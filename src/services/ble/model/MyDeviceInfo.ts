import React, { useState } from 'react';

interface MyDeviceInfoProps {
  DistanceUnit: boolean; // true: mile, false: km
  is12Hour: boolean; // true: 12-hour format, false: 24-hour format
  Bright_screen: boolean; // true: turn on bright screen, false: turn off bright screen
  Fahrenheit_or_centigrade: boolean; // true: Fahrenheit, false: Centigrade
  isHorizontalScreen: boolean; // true: Horizontal screen, false: Vertical screen
  Night_mode: boolean; // Night mode
  Temperature_unit: boolean; // Temperature unit
  Social_distance_switch: boolean; // Social distance switch
  LauageNumber: number; // Chinese_English_switch
  baseheart: number; // Basic heart rate
  ScreenBrightness: number; // Screen brightness (0-5)
  Dialinterface: number; // Dial replacement (0-10)
}

const MyDeviceInfo = (props: MyDeviceInfoProps) => {
  const [DistanceUnit, setDistanceUnit] = useState<boolean>(props.DistanceUnit);
  const [is12Hour, setIs12Hour] = useState<boolean>(props.is12Hour);
  const [Bright_screen, setBright_screen] = useState<boolean>(props.Bright_screen);
  const [Fahrenheit_or_centigrade, setFahrenheit_or_centigrade] = useState<boolean>(props.Fahrenheit_or_centigrade);
  const [isHorizontalScreen, setIsHorizontalScreen] = useState<boolean>(props.isHorizontalScreen);
  const [Night_mode, setNight_mode] = useState<boolean>(props.Night_mode);
  const [Temperature_unit, setTemperature_unit] = useState<boolean>(props.Temperature_unit);
  const [Social_distance_switch, setSocial_distance_switch] = useState<boolean>(props.Social_distance_switch);
  const [LauageNumber, setLauageNumber] = useState<number>(props.LauageNumber);
  const [baseheart, setBaseheart] = useState<number>(props.baseheart);
  const [ScreenBrightness, setScreenBrightness] = useState<number>(props.ScreenBrightness);
  const [Dialinterface, setDialinterface] = useState<number>(props.Dialinterface);

  return {
    DistanceUnit,
    is12Hour,
    Bright_screen,
    Fahrenheit_or_centigrade,
    isHorizontalScreen,
    Night_mode,
    Temperature_unit,
    Social_distance_switch,
    LauageNumber,
    baseheart,
    ScreenBrightness,
    Dialinterface,
  };
};

export default MyDeviceInfo;
