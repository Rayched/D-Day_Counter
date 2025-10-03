import styled from "styled-components";
import { useStore } from "zustand";
import { CategoryStore, ShowFormStore } from "./stores";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import AddForms from "./AddForms";
import CategoryForms from "./components/Forms/CategoryForms";

interface I_CategoryForms {
    CategorySelect?: string;
}

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

const FormsWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.8);
`;

export default function App(){
    const [NowCategory, setCategory] = useState("All");

    const {Categories} = useStore(CategoryStore);
    const {isShowForms, setShowForms} = useStore(ShowFormStore);

    const Category_Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        console.log(value);
        setCategory(value);
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
                        <CategoryBtns onClick={() => setShowForms(true)}>
                            <FontAwesomeIcon icon={faGear} style={{color: "#f1f2f6"}} size="1x"/>
                        </CategoryBtns>
                    </CategoryBox>
                    현재 카테고리: {NowCategory}
                </Navs>
            </Wrapper>
            {isShowForms ? (
                <FormsWrapper>
                    <CategoryForms />
                </FormsWrapper>
            ) : null}
        </>
    );
};
