import { create } from "zustand";
import { persist } from "zustand/middleware";

import { I_Category, I_DayCountTypes } from "./Project-types";
import { I_DayCountEditForms } from "./components/DayForms/DayEditForm";

//CategoryStore Type Setting
interface I_CategoryStore {
    Categories: I_Category[];
    NowCategory: string;
    AddNewCategory: (newCategory: I_Category) => void;
    EditCategory: (EditData: I_Category) => void;
    DeleteCategory: (DeleteTargetId: string) => void;
    setNowCategory: (UserSelected: string) => void;
};

//Category Store
export const CategoryStore = create<I_CategoryStore>()(
    persist((set, get) => ({
        Categories: [], //사용자가 추가한 Category 저장하는 배열

        //카테고리 추가 method
        AddNewCategory: (newCategory) => set((state) => ({
            Categories: [...state.Categories, newCategory]
        })),
        //카테고리 수정 method
        EditCategory: (EditData) => set((state) => {
            const FindTargets = state.Categories.findIndex((data) => data.CategoryId === EditData.CategoryId);

            //Categories에서 수정하려는 category 못찾을 경우
            if(FindTargets === -1){
                return {
                    Categories: state.Categories
                };
            } else {
                const UpdateValue: I_Category[] = [
                    ...state.Categories.slice(0, FindTargets),
                    EditData,
                    ...state.Categories.slice(FindTargets + 1)
                ];

                return {
                    Categories: UpdateValue
                };
            };
        }),

        //카테고리 삭제 method
        DeleteCategory: (DeleteTargetId) => set((state) => {
            const Idx = state.Categories.findIndex((data) => data.CategoryId === DeleteTargetId);

            if(Idx === -1){
                return {Categories: state.Categories};
            } else {
                const UpdateValue: I_Category[] = [
                    ...state.Categories.slice(0, Idx),
                    ...state.Categories.slice(Idx + 1)
                ]; 
                return {
                    Categories: UpdateValue
                };
            };
        }),
        NowCategory: "", //사용자가 선택한 Category 기억하는 state
        setNowCategory: (UserSelected) => set(({NowCategory: UserSelected}))
    }), {
        name: "Category-Storage",
        partialize: (state) => ({Categories: state.Categories})
    }
));

//D-Day 추가 및 수정, Category 편집 시 나오는 form
//Render 여부를 종합적으로 관리하는 Store
interface I_FormTypeStore {
    isCategoryEdits: boolean;
    isDayEdits: boolean; //D-Day 추가 및 수정 form 관리
    setDayEdits: () => void;
    setCategoryEdits: () => void;
};

export const FormTypeStore = create<I_FormTypeStore>((set) => ({
    isDayEdits: false,
    isCategoryEdits: false,
    setDayEdits: () => set((state) => ({isDayEdits: !state.isDayEdits})),
    setCategoryEdits: () => set((state) => ({isCategoryEdits: !state.isCategoryEdits}))
}));

//D-Day 관리 (추가/수정/삭제) Store
interface I_DayCountStore {
    DayCounts: I_DayCountTypes[];
    AddNewDayCount: (newValue: I_DayCountTypes) => void; 
    DeleteDayCount: (targetId: string) => void;
    UpdateDayCount: (NewValue: I_DayCountEditForms) => void;
    DayCountSelector: () => I_DayCountTypes[];
};

export const DayCountStore = create<I_DayCountStore>()(
    persist((set, get) => ({
        DayCounts: [],
        AddNewDayCount: (newValue) => set((state) => ({DayCounts: [...state.DayCounts, newValue]})),
        DeleteDayCount: (targetId) => set((state) => {
            const {DayCounts} = state;
            const idx = DayCounts.findIndex((data) => data.CountId === targetId);

            return {
                DayCounts: [
                    ...DayCounts.slice(0, idx),
                    ...DayCounts.slice(idx + 1)
                ]
            };
        }),
        UpdateDayCount: (NewValue) => set((state) => {
            const Idx = state.DayCounts.findIndex((data) => data.CountId === NewValue.oldCountId);

            if(Idx === -1){
                return { DayCounts: state.DayCounts };
            } else {
                const DayCountText = NewValue.oldCountId?.slice(8);
                const NewCountId = String(NewValue.NewTargetDt).split("-").join("") + DayCountText;

                const UpdateValue: I_DayCountTypes = {
                    CountId: NewCountId,
                    CountTitle: NewValue.NewTitle,
                    CountBodyText: NewValue.NewBodyText,
                    CountTargetDt: NewValue.NewTargetDt,
                    Category: NewValue.Category,
                    isStartDayPlusOne: NewValue.StartDtEdits
                };

                return {
                    DayCounts: [
                        ...state.DayCounts.slice(0, Idx),
                        UpdateValue,
                        ...state.DayCounts.slice(Idx + 1)
                    ]
                };
            };
        }),
        DayCountSelector: () => {
            const {DayCounts} = get();
            const {NowCategory} = CategoryStore();

            if(NowCategory === "category00"){
                return DayCounts;
            } else {
                const DayCountsFilter = DayCounts.filter((data) => data.Category === NowCategory);
                return DayCountsFilter;
            }
        }
    }),
    {
        name: "DayCount-storage",
        partialize: (state) => ({DayCounts: state.DayCounts})
        /**
         * Storage에 저장될 state data 선택하는 option 
         * D-Day 저장해두는 DayCounts만 있으면 되기에
         * 해당 state만 저장하게 설정
         * */
    }
));

interface I_DayCountEditStore {
    IsDayCountEdits: boolean;
    setDayCountEdits: () => void;
};

export const DayCountEditStore = create<I_DayCountEditStore>((set) => ({
    IsDayCountEdits: false,
    setDayCountEdits: () => set((prev) => ({
        IsDayCountEdits: !(prev.IsDayCountEdits)
    }))
}));