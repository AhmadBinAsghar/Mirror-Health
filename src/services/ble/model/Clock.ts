// Clock.tsx

// Define the Clock interface
export interface Clock {
    number: number;
    type: number;
    hour: number;
    minute: number;
    week: number;
    content: string;
    enable: boolean;
}

// Function to create a new Clock object
export function createClock(
    number: number,
    type: number,
    hour: number,
    minute: number,
    week: number,
    content: string,
    enable: boolean
): Clock {
    return {
        number,
        type,
        hour,
        minute,
        week,
        content,
        enable
    };
}

// Function to get enable status
export function isEnable(clock: Clock): boolean {
    return clock.enable;
}

// Function to set enable status
export function setEnable(clock: Clock, enable: boolean): Clock {
    return { ...clock, enable };
}

// Function to get content
export function getContent(clock: Clock): string {
    return clock.content;
}

// Function to set content
export function setContent(clock: Clock, content: string): Clock {
    return { ...clock, content };
}

// Function to get number
export function getNumber(clock: Clock): number {
    return clock.number;
}

// Function to set number
export function setNumber(clock: Clock, number: number): Clock {
    return { ...clock, number };
}

// Function to get type
export function getType(clock: Clock): number {
    return clock.type;
}

// Function to set type
export function setType(clock: Clock, type: number): Clock {
    return { ...clock, type };
}

// Function to get hour
export function getHour(clock: Clock): number {
    return clock.hour;
}

// Function to set hour
export function setHour(clock: Clock, hour: number): Clock {
    return { ...clock, hour };
}

// Function to get minute
export function getMinute(clock: Clock): number {
    return clock.minute;
}

// Function to set minute
export function setMinute(clock: Clock, minute: number): Clock {
    return { ...clock, minute };
}

// Function to get week
export function getWeek(clock: Clock): number {
    return clock.week;
}

// Function to set week
export function setWeek(clock: Clock, week: number): Clock {
    return { ...clock, week };
}

// Function to convert Clock to string
export function clockToString(clock: Clock): string {
    return `Clock {
        number=${clock.number},
        type=${clock.type},
        hour=${clock.hour},
        minute=${clock.minute},
        week=${clock.week},
        content='${clock.content}',
        enable=${clock.enable}
    }`;
}
