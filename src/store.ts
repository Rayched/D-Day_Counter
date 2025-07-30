import { create } from "zustand";
import { I_Forms } from "./Components/AddForms";
import {persist} from "zustand/middleware";

export interface I_DateInfos {
    Id?: string;
    DayText?: string;
    TargetDate?: string;
    isStartEdits?: boolean;
};

export interface I_DateSelector {
    DateId?: string;
    Titles?: string;
    TargetDt?: string;
    DiffDays?: string;
}

interface I_DateStore {
    DateInfos: I_DateInfos[];
    AddDate: (NewValue: I_Forms) => void;
    EditDate: (TargetId: string, newValue: I_DateInfos) => void;
    DeleteDays: (TargetId: string) => void;
    DateSelector: () => I_DateSelector[];
};

interface I_EditStore {
    Targets: I_DateSelector;
    setTargets: (value: I_DateSelector) => void;
};

interface I_InputFormStore {
    isDisplay: boolean;
    Modes: string;
    InputStart: (ModeNm: string) => void;
    InputDone: () => void;
};

//사용자가 추가한 D-Day 정보, localStorage 저장하는 Store
export const DateStore = create<I_DateStore>()(
    persist(
        (set, get) => ({
            DateInfos: [],

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

            //D-Day 수정 Action
            EditDate: (TargetId, newValue) => set((prev) => {
                const origins = prev.DateInfos;
                const TargetIdx = origins.findIndex((data) => data.Id === TargetId);

                if(TargetIdx === -1){
                    return {
                        DateInfos: prev.DateInfos
                    };
                } else {
                    return {
                        DateInfos: [
                            ...origins.slice(0, TargetIdx),
                            newValue,
                            ...origins.slice(TargetIdx + 1)
                        ]
                    }
                }
            }),

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
                            NewValues.DiffDays = (Diffs > 0) ? `D-${Diffs-1}` : `D+${Math.abs(Diffs)-1}`;
                        } else {
                            NewValues.DiffDays = (Diffs > 0) ? `D-${Diffs}` : `D+${Math.abs(Diffs)}`;
                        }
                    };

                    return NewValues;
                });

                return DateConvert;
            }
        }),
        {
            name: "Date-Storage", 
            partialize: (state) => ({DateInfos: state.DateInfos})
        }
    )
);

export const InputFormStore = create<I_InputFormStore>((set) => ({
    isDisplay: false,
    Modes: "",
    InputStart: (ModeNm: string) => set({isDisplay: true, Modes: ModeNm}),
    InputDone: () => set({isDisplay: false, Modes: ""})
}));

export const EditStore = create<I_EditStore>((set) => ({
    Targets: {
        DateId: "",
        Titles: "",
        TargetDt: ""
    },
    setTargets: (value) => set({Targets: value})
}));