class WeatherData {
  tempNow: number = 0;
  tempHigh: number = 0;
  tempLow: number = 0;
  cityName: string = "";
  weatherId: number = 0;

  getTempNow(): number {
    return this.tempNow;
  }

  setTempNow(tempNow: number): void {
    this.tempNow = tempNow;
  }

  getTempHigh(): number {
    return this.tempHigh;
  }

  setTempHigh(tempHigh: number): void {
    this.tempHigh = tempHigh;
  }

  getTempLow(): number {
    return this.tempLow;
  }

  setTempLow(tempLow: number): void {
    this.tempLow = tempLow;
  }

  getCityName(): string {
    return this.cityName;
  }

  setCityName(cityName: string): void {
    this.cityName = cityName;
  }

  getWeatherId(): number {
    return this.weatherId;
  }

  setWeatherId(weatherId: number): void {
    this.weatherId = weatherId;
  }
}