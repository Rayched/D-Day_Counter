import styled from "styled-components";
import { useStore } from "zustand";
import { CategoryStore, DayCountEditStore, DayCountStore, FormTypeStore } from "./stores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import CategoryForms from "./components/CategoryForms/CategoryForms";
import { AnimatePresence} from "framer-motion";
import { useEffect, useState } from "react";
import { I_DayCountTypes } from "./Project-types";
import DayItems from "./components/DayItems";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100dvw;
    height: 100dvh;
`;

const Headers = styled.header`
    width: 100%;
    height: 50px;
    color: white;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;

    .TitleText {
        margin-left: 10px;
    };
`;

const Navs = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CategoryBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: inherit;
    margin-top: 5px;
    padding: 3px 0px;
`;

const CategorySelect = styled.select`
    width: 20em;
    height: 2em;
    max-width: 270px;
    text-align: center;
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;

    .CustomCategorys {
        font-weight: normal;
    };
`;

const CategoryBtns = styled.div`
    width: 25px;
    height: 25px;
    padding: 1px;
    margin-left: 5px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(83, 92, 104);
`;

export default function App(){
    const {NowCategory, setNowCategory} = useStore(CategoryStore);
    const Categories = CategoryStore().CategoryList();
    const {isCategoryEdits, setCategoryEdits} = useStore(FormTypeStore);
    const {IsDayCountEdits, setDayCountEdits} = useStore(DayCountEditStore);

    const {DayCounts} = useStore(DayCountStore);
    const [CountData, setCountData] = useState<I_DayCountTypes[]>();

    const Category_Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;

        if(value === "category00"){
            setNowCategory(value);
            setCountData(DayCounts);
        } else {
            setNowCategory(value);
            const Filters = DayCounts.filter((data) => data.Category === value);
            setCountData(Filters);
        }
    };

    const DefaultRenders = () => {
        if(NowCategory !== "category00"){
            return;
        } else {
            setCountData(DayCounts);
        }
    };

    useEffect(() => {
        DefaultRenders();
    });

    return (
        <>
            <Wrapper>
                <Headers>
                    <div className="TitleText">디데이 카운터</div>
                </Headers>
                <Navs>
                    <CategoryBox>
                        <CategorySelect name="SelectedCategory" onChange={Category_Change}>
                            {
                                Categories.map((data) => {
                                    return (
                                        <option key={data.CategoryId} value={data.CategoryId} className="CustomCategorys">
                                            {data.CategoryIcon} {data.CategoryNm}
                                        </option>
                                    );
                                })
                            }
                        </CategorySelect>
                        <CategoryBtns onClick={setCategoryEdits}>
                            <FontAwesomeIcon icon={faGear} style={{color: "#f1f2f6"}} size="1x"/>
                        </CategoryBtns>
                    </CategoryBox>
                    <button onClick={setDayCountEdits}>
                        {IsDayCountEdits ? "편집 취소" : "D-Day 편집"}
                    </button>
                </Navs>
                <AnimatePresence mode="wait">
                    <DayItems 
                        CountDatas={CountData} 
                        NowCategory={NowCategory}
                    />
                </AnimatePresence>
            </Wrapper>
            {isCategoryEdits ? <CategoryForms />: null}
        </>
    );
};
