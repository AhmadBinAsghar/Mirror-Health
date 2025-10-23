import React, { useState } from 'react';

// Define constants
const DataNum_Delete = 0x99;
const DataNum_Last = 0;

// Define the props for the functional component
interface GetDataProps {
    initialDataNum?: number;
}

// Define the functional component
const GetData = ({ initialDataNum = DataNum_Last }: GetDataProps) => {
    const [dataNum, setDataNum] = useState<number>(initialDataNum);

    // Method to get the current dataNum
    const getDataNum = (): number => {
        return dataNum;
    };

    // Method to set a new dataNum
    const handleSetDataNum = (newDataNum: number): void => {
        setDataNum(newDataNum);
    };

    return {
        getDataNum,
        handleSetDataNum
    }
};

export default GetData;
