import { create } from "zustand";
import { I_Forms } from "./Components/AddDateForms";

export interface I_DateInfos {
    Id?: string;
    DayText?: string;
    TargetDate?: string;
    isStartEdits?: boolean;
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
            DayText: NewValue.Titles,
            isStartEdits: NewValue.IsStartEdit
        };
        
        return {
            DateInfos: [...prev.DateInfos, newValue]
        };
    }),

    //DateInfos 가공, 출력 (Selector)
    ConvertDates: () => {
        const originData = get().DateInfos;
        const TodayDate = new Date().getTime();

        const DateConvert = originData.map(({TargetDate, DayText, Id, isStartEdits}) => {
            const NewValues: I_ConvertDates = {
                DateId: Id,
                Titles: DayText,
                TargetDt: TargetDate,
                DiffDays: "",
            };

            const getTargets = new Date(String(TargetDate)).getTime();

            const DayToMillies = 1000 * 60 * 60 * 24;

            const Diffs = Math.floor((getTargets - TodayDate) / DayToMillies);

            if(Diffs === 0){
                NewValues.DiffDays = "D-Day";
            } else {
                if(!isStartEdits){
                    NewValues.DiffDays = (Diffs > 0) ? `D-${Diffs}` : `D+${Math.abs(Diffs)}`;
                } else {
                    NewValues.DiffDays = (Diffs > 0) ? `D-${Diffs + 1}` : `D+${Math.abs(Diffs)+1}`;
                }
            };

            return NewValues;
        });

        return DateConvert;
    }
}));

interface I_AddModeStore {
    isAdds: boolean;
    setAdds: (change: boolean) => void;
};

//D-Day 추가 모드 여부 확인용 Store
export const useAddModeStore = create<I_AddModeStore>((set) => ({
    isAdds: false,
    setAdds: (changes) => set({isAdds: changes})
}));