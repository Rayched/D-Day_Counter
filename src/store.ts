import { create } from "zustand";
import { I_Forms } from "./Components/AddDateForms";

export interface I_DateInfos {
    Id?: string;
    DayText?: string;
    TargetDate?: string;
    isStartEdits?: boolean;
};

interface I_DateSelector {
    DateId?: string;
    Titles?: string;
    TargetDt?: string;
    DiffDays?: string;
}

interface I_DateStore {
    DateInfos: I_DateInfos[];
    AddDate: (NewValue: I_Forms) => void;
    EditDate: (TargetId: string) => void;
    DeleteDays: (TargetId: string) => void;
    DateSelector: () => I_DateSelector[];
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

    //D-Day 삭제 Action
    DeleteDays: (TargetId) => set((s) => {
        const Confirms = window.confirm(`D-Day를 삭제 하겠습니까?`);

        if(Confirms){
            const originData = get().DateInfos;
            const Idx = originData.findIndex((data) => data.Id === TargetId);

            if(Idx === -1){
                alert(`'D-Day Id: ${TargetId}'를 찾을 수 없습니다.`);
                return {
                    DateInfos: s.DateInfos
                };
            } else {
                alert("D-Day를 삭제했습니다.");
                return {
                    DateInfos: [
                        ...originData.slice(0, Idx),
                        ...originData.slice(Idx + 1)
                    ]
                };
            }
        } else {
            alert("D-Day 삭제를 취소했습니다.");
            return {
                DateInfos: s.DateInfos
            };
        }
    }),
    EditDate: () => {},

    //DateInfos 가공, 출력 (Selector)
    DateSelector: () => {
        const originData = get().DateInfos;
        const TodayDate = new Date().getTime();

        const DateConvert = originData.map(({TargetDate, DayText, Id, isStartEdits}) => {
            const NewValues: I_DateSelector= {
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

interface I_EditModeStore {
    isEdits: boolean;
    setEdits: (value: boolean) => void;
};

export const EditModeStore = create<I_EditModeStore>((set) => ({
    isEdits: false,
    setEdits: (value) => set({isEdits: value})
}))