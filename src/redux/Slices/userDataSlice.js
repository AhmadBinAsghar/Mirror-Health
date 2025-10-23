import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_Metrics_REQUEST, API_Thunk_REQUEST } from '../../network/NetworkRequest';
import { endPoints } from '../../network/endPoints';

export const fetchPreConditions = createAsyncThunk('userData/fetchPreConditions', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.getPreCondition, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data?.map((val) => ({ id: val?._id, name: val?.title, color: null }))
    return formatedResponse
  } else {
    return [];
  }
});
export const fetchFAQ = createAsyncThunk('userData/fetchFAQ', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.faq, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    return formatedResponse;
  } else {
    return [];
  }
});
export const fetchMembers = createAsyncThunk('userData/fetchMembers', async () => {
  const response = await API_Thunk_REQUEST('GET', endPoints.invitation, null);
  const formatedResponse = [...response?.data?.receivedInvitations, ...response?.data?.sentInvitations];
  return formatedResponse;
});
export const fetchHeartMetrics = createAsyncThunk('userData/fetchHeartMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.todaysCardic, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    return formatedResponse;
  } else {
    return [];
  }
});
export const fetchRespMetrics = createAsyncThunk('userData/fetchRespMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.todaysSpO, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    return formatedResponse;
  } else {
    return [];
  }
});
export const fetchActMetrics = createAsyncThunk('userData/fetchActMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.actToday, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    return formatedResponse;
  } else {
    return null;
  }
});
export const fetchZoneMetrics = createAsyncThunk('userData/fetchZoneMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.ActivityHeartZone, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    console.log("FORMATED ACTIVITY RESPONSE ::", formatedResponse)
    return formatedResponse;
  } else {
    return null;
  }
});
export const fetchSleepMetrics = createAsyncThunk('userData/fetchSleepMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.sleepToday, null);
  // console.log("NORMAL RES OF SLEEP DATA :: ", response)
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    // console.log("FORMATED FORM OF SLEEP DATA :: ", formatedResponse)
    return formatedResponse;
  } else {
    return [];
  }
});
export const fetchStressMetrics = createAsyncThunk('userData/fetchStressMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.stressToday, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    return formatedResponse;
  } else {
    return [];
  }
});
export const fetchImmuneMetrics = createAsyncThunk('userData/fetchImmuneMetrics', async () => {
  const response = await API_Thunk_REQUEST("GET", endPoints.tempToday, null);
  if (response?.status === 200) {
    const formatedResponse = response?.data;
    return formatedResponse;
  } else {
    return [];
  }
});

const initialState = {
  userData: {},
  userDetails: {},
  accessToken: '',
  preConditions: [],
  loadingConditions: false,
  errorConditions: null,
  FAQs: [],
  loadingFAQ: false,
  errorFAQ: null,
  Members: [],
  loadingMem: false,
  errorMem: null,
  HeartToday: null,
  loadingHeart: false,
  errorHeart: null,
  SPO2Today: null,
  loadingSPO2: false,
  errorSPO2: null,
  ActToday: null,
  loadingAct: false,
  errorAct: null,
  SleepToday: [],
  loadingSleep: false,
  errorSleep: null,
  StressToday: null,
  loadingStress: false,
  errorStress: null,
  tempToday: null,
  loadingTemp: false,
  errorTemp: null,
  ActZones: null,
  loadingActZones: false,
  errorActZones: null,
};

export const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDataSave: (state, action) => {
      const updatedData = {
        ...state.userData,
        ...action.payload,
      };
      return {
        ...state,
        userData: updatedData,
      };
    },
    userDetailsSave: (state, action) => {
      const updatedData = {
        ...state.userDetails,
        ...action.payload,
      };
      return {
        ...state,
        userDetails: updatedData,
      };
    },
    userDetailsReset: (state) => {
      state.userDetails = initialState.userDetails;
    },
    userDataReset: (state) => {
      state.userData = initialState.userData;
    },
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Users API
    builder.addCase(fetchPreConditions.pending, (state) => {
      state.loadingConditions = true;
      state.errorConditions = null;
    });
    builder.addCase(fetchPreConditions.fulfilled, (state, action) => {
      state.loadingConditions = false;
      state.preConditions = action.payload;
    });
    builder.addCase(fetchPreConditions.rejected, (state, action) => {
      state.loadingConditions = false;
      state.errorConditions = action.error?.message || 'Failed to fetch users';
    });
    // FAQS API
    builder.addCase(fetchFAQ.pending, (state) => {
      state.loadingFAQ = true;
      state.errorFAQ = null;
    });
    builder.addCase(fetchFAQ.fulfilled, (state, action) => {
      state.loadingFAQ = false;
      state.FAQs = action.payload;
    });
    builder.addCase(fetchFAQ.rejected, (state, action) => {
      state.loadingFAQ = false;
      state.errorFAQ = action.error?.message || 'Failed to fetch users';
    });
    // Members API
    builder.addCase(fetchMembers.pending, (state) => {
      state.loadingMem = true;
      state.errorMem = null;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.loadingMem = false;
      state.Members = action.payload;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.loadingMem = false;
      state.errorMem = action.error?.message || 'Failed to fetch users';
    });
    //Heart Metrics Today
    builder.addCase(fetchHeartMetrics.pending, (state) => {
      state.loadingHeart = true;
      state.errorHeart = null;
    });
    builder.addCase(fetchHeartMetrics.fulfilled, (state, action) => {
      state.loadingHeart = false;
      state.HeartToday = action.payload;
    });
    builder.addCase(fetchHeartMetrics.rejected, (state, action) => {
      state.loadingHeart = false;
      state.errorHeart = action.error?.message || 'Failed to fetch users';
    });
    //SPO2 Metrics Today
    builder.addCase(fetchRespMetrics.pending, (state) => {
      state.loadingSPO2 = true;
      state.errorSPO2 = null;
    });
    builder.addCase(fetchRespMetrics.fulfilled, (state, action) => {
      state.loadingSPO2 = false;
      state.SPO2Today = action.payload;
    });
    builder.addCase(fetchRespMetrics.rejected, (state, action) => {
      state.loadingSPO2 = false;
      state.errorSPO2 = action.error?.message || 'Failed to fetch users';
    });
    //Activity Metrics Today
    builder.addCase(fetchActMetrics.pending, (state) => {
      state.loadingAct = false;
      state.errorAct = null;
    });
    builder.addCase(fetchActMetrics.fulfilled, (state, action) => {
      state.loadingAct = false;
      state.ActToday = action.payload;
    });
    builder.addCase(fetchActMetrics.rejected, (state, action) => {
      state.loadingAct = false;
      state.errorAct = action.error?.message || 'Failed to fetch users';
    });
    //Sleep Metrics Today
    builder.addCase(fetchSleepMetrics.pending, (state) => {
      state.loadingSleep = true;
      state.errorSleep = null;
    });
    builder.addCase(fetchSleepMetrics.fulfilled, (state, action) => {
      state.loadingSleep = false;
      state.SleepToday = action.payload;
    });
    builder.addCase(fetchSleepMetrics.rejected, (state, action) => {
      state.loadingSleep = false;
      state.errorSleep = action.error?.message || 'Failed to fetch users';
    });
    //Stress Metrics Today
    builder.addCase(fetchStressMetrics.pending, (state) => {
      state.loadingSleep = true;
      state.errorSleep = null;
    });
    builder.addCase(fetchStressMetrics.fulfilled, (state, action) => {
      state.loadingSleep = false;
      state.StressToday = action.payload;
    });
    builder.addCase(fetchStressMetrics.rejected, (state, action) => {
      state.loadingSleep = false;
      state.errorSleep = action.error?.message || 'Failed to fetch users';
    });
    //Temp Metrics Today
    builder.addCase(fetchImmuneMetrics.pending, (state) => {
      state.loadingTemp = true;
      state.errorTemp = null;
    });
    builder.addCase(fetchImmuneMetrics.fulfilled, (state, action) => {
      state.loadingTemp = false;
      state.tempToday = action.payload;
    });
    builder.addCase(fetchImmuneMetrics.rejected, (state, action) => {
      state.loadingTemp = false;
      state.errorTemp = action.error?.message || 'Failed to fetch users';
    });
    // Zones Metrics Today
    builder.addCase(fetchZoneMetrics.pending, (state) => {
      state.loadingActZones = true;
      state.errorActZones = null;
    });
    builder.addCase(fetchZoneMetrics.fulfilled, (state, action) => {
      state.loadingActZones = false;
      state.ActZones = action.payload;
    });
    builder.addCase(fetchZoneMetrics.rejected, (state, action) => {
      state.loadingActZones = false;
      state.errorActZones = action.error?.message || 'Failed to fetch users';
    });
  }
});

export const { userDataSave, accessToken, userDetailsSave, userDetailsReset, userDataReset } = userDataSlice.actions;

export default userDataSlice.reducer;
