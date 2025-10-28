import styled from "styled-components";
import { useStore } from "zustand";
import { CategoryStore, DayCountStore, ThemeStore } from "./stores";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGear, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
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
    background-color: ${(props) => props.theme.bgColor};
    font-family: "Noto-Sans", "Noto-Sans-KR";
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
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.TextColor};
`;

const EditModeBtn = styled.div`
    width: 100px;
    height: 25px;
    border: 2px solid black;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 3px;
    margin: 5px 0px;
    font-weight: bold;
    color: ${(props) => props.theme.TextColor};
    background-color: ${(props) => props.theme.ItemBoxColor};
`;

const Mains = styled.main`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;
`;

const Footer = styled.footer`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
`;

const ThemeBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 2px solid ${(props) => props.theme.BoxBorderColor};
    border-radius: 50px;
    position: fixed;
    right: 15px;
    bottom: 25px;
    color: ${(props) => props.theme.TextColor};
    background-color: ${(props) => props.theme.ThemeBtnColor};
`;

export default function App(){
    //Categor 관련 state
    const {NowCategory, setNowCategory} = useStore(CategoryStore);
    const Categories = CategoryStore().CategoryList();
    const [isCategoryEdit, setCategoryEdit] = useState(false);

    //D-Day Data (DayCount's) 관련 state
    const {DayCounts} = useStore(DayCountStore);
    const [CountData, setCountData] = useState<I_DayCountTypes[]>();
    const [isDelMode, setDelMode] = useState(false);

    const {isDark, setDark} = useStore(ThemeStore);

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
                        <CategoryBtns onClick={() => setCategoryEdit(true)}>
                            <FontAwesomeIcon icon={faGear} size="1x"/>
                        </CategoryBtns>
                    </CategoryBox>
                    {isDelMode ? null : <EditModeBtn onClick={() => setDelMode(true)}>D-Day 삭제</EditModeBtn>}
                    {isDelMode ? <EditModeBtn onClick={() => setDelMode(false)}>삭제 취소</EditModeBtn> : null}
                </Navs>
                <Mains>
                    <AnimatePresence mode="wait">
                        <DayItems 
                            CountDatas={CountData} 
                            NowCategory={NowCategory}
                            isDelMode={isDelMode}
                        />
                    </AnimatePresence>
                </Mains>
                <Footer>
                    <ThemeBtn onClick={setDark}>
                        {
                            isDark ? (
                                <FontAwesomeIcon icon={faMoon} size="1x"/>
                            ) : (
                                <FontAwesomeIcon icon={faSun} size="1x"/>
                            )
                        }
                    </ThemeBtn>
                </Footer>
            </Wrapper>
            {isCategoryEdit ? <CategoryForms setCategoryEdit={setCategoryEdit}/>: null}
        </>
    );
};
