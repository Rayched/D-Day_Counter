import { create } from "zustand";
import { I_Forms } from "./App";

export interface I_DateInfos {
    Id?: string;
    DayText?: string;
    TargetDate?: string;
};

interface I_ConvertDates {
    DateId?: string;
    Titles?: string;
    TargetDt?: string;
    DiffDays?: string;
}

interface I_DateStore {
    DateInfos: I_DateInfos[];
    AddDate: (NewValue: I_Forms) => void;
    //UpdateDays: (Targets: I_DateInfos) => void;
    //DeleteDays: (TargetId?: string) => void;
    ConvertDates: () => I_ConvertDates[];
};

//사용자가 추가한 D-Day 정보, localStorage 저장하는 Store
export const useDateStore = create<I_DateStore>((set, get) => ({
    DateInfos: [],

    //D-Day 추가 Action
    AddDate: (NewValue) => set((prev) => {
        const AddNewId = `${NewValue.TargetDt?.split("-").join("")}` + `_${NewValue.Titles}`;

        const newValue: I_DateInfos = {
            Id: AddNewId,
            TargetDate: NewValue.TargetDt,
            DayText: NewValue.Titles
        };
        
        return {
            DateInfos: [...prev.DateInfos, newValue]
        };
    }),

    //DateInfos 가공, 출력 (Selector)
    ConvertDates: () => {
        const originData = get().DateInfos;
        const TodayDate = new Date().getTime();

        const DateConvert = originData.map(({TargetDate, DayText, Id}) => {
            const NewValues: I_ConvertDates = {
                DateId: Id,
                Titles: DayText,
                TargetDt: TargetDate,
                DiffDays: "",
            };

            const getTargets = new Date(String(TargetDate)).getTime();

            const Diffs = Math.floor(
                (getTargets - TodayDate) / (1000 * 60 * 60 *24)
            );

            if(Diffs === 0){
                NewValues.DiffDays = "D-Day";
            } else if(Diffs > 0){
                NewValues.DiffDays = `D-${Diffs + 1}`;
            } else {
                NewValues.DiffDays = `D+${Math.abs(Diffs) + 1}`;
            };

            return NewValues;
        });

        return DateConvert;
    }
}));
