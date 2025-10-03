import { create } from "zustand";
import { I_Category } from "./Project-types";

//디데이 카운터, 기본 카테고리
const DefaultCategory: I_Category[] = [
    {CategoryId: "category00", CategoryNm: "All",CategoryIcon: ""},
    {CategoryId: "category01", CategoryNm: "미용", CategoryIcon: "✂"}
];

//CategoryStore Type Setting
interface I_CategoryStore {
    Categories: I_Category[];
    AddNewCategory: (newCategory: I_Category) => void;
};

//Category Store
export const CategoryStore = create<I_CategoryStore>((set) => ({
    Categories: [...DefaultCategory],
    AddNewCategory: (newCategory: I_Category) => set((state) => ({
        Categories: [...state.Categories, newCategory]
    }))
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