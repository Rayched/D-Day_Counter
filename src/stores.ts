import { create } from "zustand";
import { I_Category, I_DayCountTypes } from "./Project-types";

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
    isDayAdds: boolean; //D-Day 추가 모드 관리
    isDayEdits: boolean; //D-Day 수정 모드 관리
    setDayAdds: () => void;
    setDayEdits: () => void;
    setCategoryEdits: () => void;
};

export const FormTypeStore = create<I_FormTypeStore>((set) => ({
    isDayAdds: false,
    isDayEdits: false,
    isCategoryEdits: false,
    setDayAdds: () => set((state) => ({isDayAdds: !state.isDayAdds})),
    setDayEdits: () => set((state) => ({isDayEdits: !state.isDayEdits})),
    setCategoryEdits: () => set((state) => ({isCategoryEdits: !state.isCategoryEdits}))
}));

interface I_DayCountStore {
    DayCounts: I_DayCountTypes[],
    AddNewDayCount: (newDayCount: I_DayCountTypes) => void; 
};

//D-Day 정보를 관리하는 Store
export const DayCountStore = create<I_DayCountStore>((set) => ({
    DayCounts: [],
    AddNewDayCount: (newDayCount) => set((prev) => ({
        DayCounts: [...prev.DayCounts, newDayCount]
    }))
}))