import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

interface DateState {
    year: number;
    month: number;
    day: number;
    selectedDay?: any;
    calendarData: PayloadObject[];
}

interface PayloadObject {
    id: string;
    year: number;
    month: number;
    day: number;
    time: string;
}

interface selectedDayObject {
    year: number;
    month: number;
    day: number;
    time: string;
}


const initialState: DateState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    selectedDay: {},
    calendarData: []
};


const dateReducer = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        incrementMonth(state) {
            const { year, month } = state;
            if (month < 12) {
                state.month += 1;
            } else {
                state.year += 1;
                state.month = 1;
            }
        },
        decrementMonth(state) {
            const { year, month } = state;
            if (month > 1) {
                state.month -= 1;
            } else {
                state.year -= 1;
                state.month = 12;
            }
        },
        setSelectedDay(state, action: PayloadAction<object>) {
            state.selectedDay = action.payload;
        },
        addCalendarData(state, action: PayloadAction<PayloadObject>) {
            if (!Array.isArray(state.calendarData)) {
                state.calendarData = []
            }

            const isDataExists = state.calendarData.some((data) => (
                data.time === action.payload.time &&
                data.year === action.payload.year &&
                data.month === action.payload.month &&
                data.day === action.payload.day
            ));

            if (!isDataExists) {
                state.calendarData.push(action.payload);
                state.selectedDay = {...state.selectedDay, time: ""};
            }
        },
        removeCalendarData(state, action: PayloadAction<any>) {
            state.calendarData = state.calendarData ? state.calendarData.filter((book) => book.id != action.payload.id) : state.calendarData;
            state.selectedDay = {...state.selectedDay, time: ""};
        },
    },
});

export const { incrementMonth, decrementMonth, setSelectedDay, addCalendarData, removeCalendarData } = dateReducer.actions;

export default dateReducer.reducer;