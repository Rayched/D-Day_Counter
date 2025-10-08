import styled from "styled-components";
import { useStore } from "zustand";
import { CategoryStore, DayCountEditStore, FormTypeStore } from "./stores";
import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import CategoryForms from "./components/CategoryForms/CategoryForms";
import { I_Category } from "./Project-types";
import DayItemList from "./components/DayItems/DayItemList";

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
`;

const CategorySelect = styled.select`
    width: 18em;
    height: 2em;
    max-width: 270px;
    text-align: center;
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
    const [NowCategory, setCategory] = useState("All");

    const {Categories} = useStore(CategoryStore);
    const {isCategoryEdits, setCategoryEdits} = useStore(FormTypeStore);
    const {IsDayCountEdits, setDayCountEdits} = useStore(DayCountEditStore);

    const Category_Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        console.log(value);
        setCategory(value);
    };

    //디데이 카운터, 기본 카테고리
    const DefaultCategory: I_Category = {
        CategoryId: "category0",
        CategoryNm: "All",
        CategoryIcon: ""
    };

    return (
        <>
            <Wrapper>
                <Headers>
                    <div className="TitleText">디데이 카운터</div>
                </Headers>
                <Navs>
                    <CategoryBox>
                        <CategorySelect value={NowCategory} onChange={Category_Change}>
                            <option key={DefaultCategory.CategoryId}>{DefaultCategory.CategoryNm}</option>
                            {
                                Categories.map((data) => {
                                    return (
                                        <option key={data.CategoryId}>
                                            {data.CategoryIcon === "" ? null : data.CategoryIcon} 
                                            {data.CategoryNm}
                                        </option>
                                    );
                                })
                            }
                        </CategorySelect>
                        <CategoryBtns onClick={setCategoryEdits}>
                            <FontAwesomeIcon icon={faGear} style={{color: "#f1f2f6"}} size="1x"/>
                        </CategoryBtns>
                    </CategoryBox>
                    현재 카테고리: {NowCategory}
                    <button onClick={setDayCountEdits}>
                        {IsDayCountEdits ? "삭제 취소" : "✏ D-Day 삭제"}
                    </button>
                    <DayItemList />
                </Navs>
            </Wrapper>
            {isCategoryEdits ? <CategoryForms />: null}
        </>
    );
};
