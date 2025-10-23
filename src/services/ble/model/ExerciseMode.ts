import React, { useState } from 'react';

// Define constants for statuses and modes
const Status = {
    START: 1,
    PAUSE: 2,
    CONTINUE: 3,
    FINISH: 4
} as const;

const Mode = {
    RUN: 0,
    CYCLING: 1,
    BADMINTON: 2,
    FOOTBALL: 3,
    TENNIS: 4,
    YOGA: 5,
    BREATH: 6,
    DANCE: 7,
    BASKETBALL: 8,
    WALK: 9,
    WORKOUT: 10,
    CRICKET: 11,
    HIKING: 12,
    AEROBICS: 13,
    PINGPONG: 14,
    ROPEJUMP: 15,
    SITUPS: 16,
    VOLLEYBALL: 17
} as const;

// Define an array of modes
const modes = [
    Mode.RUN, Mode.CYCLING, Mode.BADMINTON, Mode.FOOTBALL,
    Mode.TENNIS, Mode.YOGA, Mode.BREATH, Mode.DANCE,
    Mode.BASKETBALL, Mode.WALK, Mode.WORKOUT, Mode.CRICKET,
    Mode.HIKING, Mode.AEROBICS, Mode.PINGPONG, Mode.ROPEJUMP,
    Mode.SITUPS, Mode.VOLLEYBALL
];

// Define the props for the functional component
interface ExerciseModeProps {
    initialExerciseMode?: number;
    initialEnableStatus?: number;
}

// Define the functional component
const ExerciseMode = ({
    initialExerciseMode = Mode.RUN,
    initialEnableStatus = Status.START
}: ExerciseModeProps) => {
    const [exerciseMode, setExerciseMode] = useState<number>(initialExerciseMode);
    const [enableStatus, setEnableStatus] = useState<number>(initialEnableStatus);

    const getExerciseMode = (position: number): number => {
        return modes[position];
    };

    const handleSetExerciseMode = (newMode: number): void => {
        setExerciseMode(newMode);
    };

    const handleSetEnableStatus = (status: number): void => {
        setEnableStatus(status);
    };

    return {
        getExerciseMode,
        handleSetExerciseMode,
        handleSetEnableStatus
    }
};

export default ExerciseMode;
