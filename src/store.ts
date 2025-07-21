import { create } from "zustand";

export interface I_Days {
    Id?: string;
    Titles?: string;
    TargetDt?: string;
    DayInfos: string;
};

interface I_DayCountStore {
    DayCounters: I_Days[];
    setDayCounters: (newValue: I_Days) => void;
};

export const useDayCountStore = create<I_DayCountStore>((set) => ({
    DayCounters: [],
    setDayCounters: (newValue: I_Days) => set((prev) => ({
        DayCounters: [...prev.DayCounters, newValue]
    }))
}));