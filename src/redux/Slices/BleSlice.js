import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bleData: null,
    device: null
};

export const BleDataSlice = createSlice({
    name: 'bleDevice',
    initialState,
    reducers: {
        bleDataSave: (state, action) => {
            const updatedBleData = {
                ...state.bleData,
                ...action.payload,
            };
            return {
                ...state,
                bleData: updatedBleData,
            };
        },
        setDevice: (state, action) => {
            state.device = action.payload;
        },
        resetBleData: state => {
            state.bleData = null;
        },
        resetDevice: state => {
            state.device = null;
        },
    },
});

export const { bleDataSave, resetBleData, setDevice, resetDevice } = BleDataSlice.actions;

export default BleDataSlice.reducer;
