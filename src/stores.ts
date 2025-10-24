import { create } from "zustand";
import { persist } from "zustand/middleware";

import { I_Category, I_DayCountTypes } from "./Project-types";
import { I_DayCountEditForms } from "./components/DayForms/DayEditForm";

//CategoryStore Type Setting
interface I_CategoryStore {
    //사용자가 추가한 Category state & action's
    CustomCategories: I_Category[];
    AddNewCategory: (newCategory: I_Category) => void;
    EditCategory: (EditData: I_Category) => void;
    DeleteCategory: (DeleteTargetId: string) => void;

    //사용자가 선택한 category state & action's
    NowCategory: string;
    setNowCategory: (UserSelected: string) => void;

    //Home 화면에 출력할 Category 목록 (selector)
    CategoryList: () => I_Category[];
    SelectedList: () => I_Category[];
};

const DefaultCategory: I_Category[] = [
    { CategoryId: "category00", CategoryIcon: "", CategoryNm: "미지정"},
    { CategoryId: "category00", CategoryIcon: "", CategoryNm: "전체"}
];

//Category Store
export const CategoryStore = create<I_CategoryStore>()(
    persist((set, get) => ({
        //사용자가 추가한 Category state, action's
        CustomCategories: [],
        AddNewCategory: (newCategory) => set((state) => ({
            CustomCategories: [...state.CustomCategories, newCategory]
        })),
        EditCategory: (EditData) => set((state) => {
            const prevCategory = state.CustomCategories;
            const idx = prevCategory.findIndex((data) => data.CategoryId === EditData.CategoryId);

            if(idx === -1){
                return {
                    CustomCategories: prevCategory
                };
            } else {
                return {
                    CustomCategories: [
                        ...prevCategory.slice(0, idx),
                        EditData,
                        ...prevCategory.slice(idx + 1)
                    ]
                };
            }
        }),
        DeleteCategory: (targetId) => set((state) => ({
            CustomCategories: [
                ...state.CustomCategories.filter((data) => data.CategoryId !== targetId)
            ]
        })),

        //사용자가 선택한 category 기억해두는 state
        //이를 수정하는 action
        NowCategory: "category00",
        setNowCategory: (UserSelected) => set({NowCategory: UserSelected}),

        //Home 화면에 띄울 카테고리 목록을 return하는 selector
        CategoryList: () => {
            const Customs = get().CustomCategories;

            const Categories: I_Category[] = [
                DefaultCategory[1],
                ...Customs
            ];

            return Categories;
        },

        //D-Day Form, 카테고리 목록 return하는 selector
        SelectedList: () => {
            const Defaults = DefaultCategory[0]
            const Customs = get().CustomCategories;

            return [
                Defaults, ...Customs
            ];
        }
    }), {
        name: "Category-Storage",
        partialize: (state) => ({CustomCategories: state.CustomCategories})
    })
)

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
    DeleteCategoryWithCounts: (categoryId: string) => void;
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
                    CountTargetDt: NewValue.NewTargetDt,
                    Category: NewValue.Category,
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
        DeleteCategoryWithCounts: (categoryId) => set((state) => {
            const {DayCounts} = state;
            const DayCountsFilter = DayCounts.filter((data) => data.Category !== categoryId);

            return {
                DayCounts: [...DayCountsFilter]
            };
        })
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

//Theme 관리 store

interface I_ThemeStore {
    isDark: boolean;
    setDark: () => void;
};

export const ThemeStore = create<I_ThemeStore>((set) => ({
    isDark: false,
    setDark: () => set((s) => ({isDark: !(s.isDark)}))
}))