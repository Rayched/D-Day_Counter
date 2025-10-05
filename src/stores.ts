import { create } from "zustand";
import { I_Category } from "./Project-types";

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

//Forms Rendering 여부 관리하는 Store
interface I_ShowFormStore {
    isShowForms: boolean;
    setShowForms: (value: boolean) => void
};

export const ShowFormStore = create<I_ShowFormStore>((set) => ({
    isShowForms: false,
    setShowForms: (value) => set(() => ({isShowForms: value}))
}));