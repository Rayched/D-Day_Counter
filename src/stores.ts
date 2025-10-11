import { create } from "zustand";
import { I_Category, I_DayCountTypes } from "./Project-types";
import { I_DayCountEditForms } from "./components/DayForms/DayEditForm";

//CategoryStore Type Setting
interface I_CategoryStore {
    Categories: I_Category[];
    AddNewCategory: (newCategory: I_Category) => void;
    EditCategory: (EditData: I_Category) => void;
    DeleteCategory: (DeleteTargetId: string) => void;
};

//Category Store
export const CategoryStore = create<I_CategoryStore>((set) => ({
    Categories: [],
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
    })
}));

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

interface I_DayCountStore {
    DayCounts: I_DayCountTypes[],
    AddNewDayCount: (newDayCount: I_DayCountTypes) => void; 
    DeleteDayCount: (targetId: string) => void;
    UpdateDayCount: (NewValue: I_DayCountEditForms) => void;
};

//D-Day 정보를 관리하는 Store
export const DayCountStore = create<I_DayCountStore>((set) => ({
    DayCounts: [],
    AddNewDayCount: (newDayCount) => set((prev) => ({
        DayCounts: [...prev.DayCounts, newDayCount]
    })),
    DeleteDayCount: (targetId) => set((state) => {
        const TargetFiltering = state.DayCounts.filter((data) => data.CountId !== targetId);

        return {
            DayCounts: TargetFiltering
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
    })
}));

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