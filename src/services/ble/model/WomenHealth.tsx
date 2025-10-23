// WomenHealth.tsx

interface WomenHealthProps {
  userId?: string;
  address?: string;
  MenstrualPeriod_StartTime?: string; // yyyy-MM-dd
  MenstrualPeriod_Lenth?: number; // 2-8, default 7
  MenstrualPeriod_Period?: number; // 21-35, default 30
  FlowRate?: number; // -1 no data, 0-4 levels
  Dysmenorrhea?: number; // -1 no data, 0-4 levels
  Love?: boolean; // default false
  mood?: number; // -1 no data, 0-4 levels
  start?: boolean; // default false
  yuejinqi?: boolean; // default false, during menstruation
  yuceyuejinqi?: boolean; // default false, predicted menstruation
  yiyunqi?: boolean; // default false, during fertile period
  yuceyiyunqi?: boolean; // default false, predicted fertile period
  pailuanqi?: boolean; // default false, ovulation period
  up?: boolean; // default false, rising or falling phase
  edidt?: boolean; // default false, whether edited
  day?: number; // day in cycle
  Menstrual_symptoms?: number[]; // menstrual symptoms array, size 32
}

class WomenHealth {
  userId: string;
  address: string;
  MenstrualPeriod_StartTime: string;
  MenstrualPeriod_Lenth: number;
  MenstrualPeriod_Period: number;
  FlowRate: number;
  Dysmenorrhea: number;
  Love: boolean;
  mood: number;
  start: boolean;
  yuejinqi: boolean;
  yuceyuejinqi: boolean;
  yiyunqi: boolean;
  yuceyiyunqi: boolean;
  pailuanqi: boolean;
  up: boolean;
  edidt: boolean;
  day: number;
  Menstrual_symptoms: number[];

  constructor(props?: WomenHealthProps) {
    this.userId = props?.userId || "";
    this.address = props?.address || "";
    this.MenstrualPeriod_StartTime = props?.MenstrualPeriod_StartTime || "1990-01-01";
    this.MenstrualPeriod_Lenth = props?.MenstrualPeriod_Lenth || 7;
    this.MenstrualPeriod_Period = props?.MenstrualPeriod_Period || 30;
    this.FlowRate = props?.FlowRate || -1;
    this.Dysmenorrhea = props?.Dysmenorrhea || -1;
    this.Love = props?.Love || false;
    this.mood = props?.mood || -1;
    this.start = props?.start || false;
    this.yuejinqi = props?.yuejinqi || false;
    this.yuceyuejinqi = props?.yuceyuejinqi || false;
    this.yiyunqi = props?.yiyunqi || false;
    this.yuceyiyunqi = props?.yuceyiyunqi || false;
    this.pailuanqi = props?.pailuanqi || false;
    this.up = props?.up || false;
    this.edidt = props?.edidt || false;
    this.day = props?.day || 0;
    this.Menstrual_symptoms = props?.Menstrual_symptoms || new Array(32).fill(0);
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  isUp(): boolean {
    return this.up;
  }

  setUp(up: boolean): void {
    this.up = up;
  }

  isYuceyuejinqi(): boolean {
    return this.yuceyuejinqi;
  }

  setYuceyuejinqi(yuceyuejinqi: boolean): void {
    this.yuceyuejinqi = yuceyuejinqi;
  }

  isYuceyiyunqi(): boolean {
    return this.yuceyiyunqi;
  }

  setYuceyiyunqi(yuceyiyunqi: boolean): void {
    this.yuceyiyunqi = yuceyiyunqi;
  }

  getDay(): number {
    return this.day;
  }

  setDay(day: number): void {
    this.day = day;
  }

  isStart(): boolean {
    return this.start;
  }

  setStart(start: boolean): void {
    this.start = start;
  }

  isYuejinqi(): boolean {
    return this.yuejinqi;
  }

  setYuejinqi(yuejinqi: boolean): void {
    this.yuejinqi = yuejinqi;
  }

  isEdidt(): boolean {
    return this.edidt;
  }

  setEdidt(edidt: boolean): void {
    this.edidt = edidt;
  }

  isYiyunqi(): boolean {
    return this.yiyunqi;
  }

  setYiyunqi(yiyunqi: boolean): void {
    this.yiyunqi = yiyunqi;
  }

  isPailuanqi(): boolean {
    return this.pailuanqi;
  }

  setPailuanqi(pailuanqi: boolean): void {
    this.pailuanqi = pailuanqi;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getMenstrualPeriod_StartTime(): string {
    return this.MenstrualPeriod_StartTime;
  }

  setMenstrualPeriod_StartTime(menstrualPeriod_StartTime: string): void {
    this.MenstrualPeriod_StartTime = menstrualPeriod_StartTime;
  }

  getMenstrualPeriod_Lenth(): number {
    return this.MenstrualPeriod_Lenth;
  }

  setMenstrualPeriod_Lenth(menstrualPeriod_Lenth: number): void {
    this.MenstrualPeriod_Lenth = menstrualPeriod_Lenth;
  }

  getMenstrualPeriod_Period(): number {
    return this.MenstrualPeriod_Period;
  }

  setMenstrualPeriod_Period(menstrualPeriod_Period: number): void {
    this.MenstrualPeriod_Period = menstrualPeriod_Period;
  }

  getFlowRate(): number {
    return this.FlowRate;
  }

  setFlowRate(flowRate: number): void {
    this.FlowRate = flowRate;
  }

  getDysmenorrhea(): number {
    return this.Dysmenorrhea;
  }

  setDysmenorrhea(dysmenorrhea: number): void {
    this.Dysmenorrhea = dysmenorrhea;
  }

  getLove(): boolean {
    return this.Love;
  }

  setLove(love: boolean): void {
    this.Love = love;
  }

  getMood(): number {
    return this.mood;
  }

  setMood(mood: number): void {
    this.mood = mood;
  }

  getMenstrual_symptoms(): number[] {
    return this.Menstrual_symptoms;
  }

  setMenstrual_symptoms(menstrual_symptoms: number[]): void {
    this.Menstrual_symptoms = menstrual_symptoms;
  }
}

export default WomenHealth;
