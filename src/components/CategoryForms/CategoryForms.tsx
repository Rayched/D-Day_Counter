import FormLayout from "../FormLayout";
import { useState } from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import AddCategoryForms from "./AddCategoryForms";
import EditCategoryForms from "./EditCategoryForms";
import DelCategoryForms from "./DelCategoryForms";

type CategoryBtnTypes = {
    BtnId: string;
    BtnNm: string;
}

const ModeSelect = styled.div`
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .AddBtn {
        border-top-left-radius: 10px;
    };

    .DelBtn {
        border-top-right-radius: 10px;
    };
`;

const ModeButtons = styled(motion.div)`
    width: 33%;
    padding: 3px 3px;
    align-items: center;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    position: relative;
`;

const CategoryInputBox = styled.div`
    width: 96%;
    height: 80%;
    max-width: 379px;
    max-height: 480px;
    background-color: #dfe4ea;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function CategoryForms(){
    const [CategoryMode, setCategoryMode] = useState("AddBtn");

    const CategoryBtns: CategoryBtnTypes[] = [
        {BtnId: "AddBtn", BtnNm: "추가"},
        {BtnId: "EditBtn", BtnNm: "수정"},
        {BtnId: "DelBtn", BtnNm: "삭제"}
    ];

    return (
        <FormLayout FormNm="카테고리 설정">
            <ModeSelect>
                {
                    CategoryBtns.map((data) => {
                        return (
                            <ModeButtons 
                                key={data.BtnId}
                                className={data.BtnId}
                                onClick={() => setCategoryMode(data.BtnId)}
                                initial={false}
                                animate={{
                                    backgroundColor: data.BtnId === CategoryMode ? "#dfe4ea" : "#ffffff",
                                }}
                                transition={{
                                    type: "tween",
                                    bounce: 0,
                                    duration: 0.4
                                }}
                            >
                                {data.BtnNm}
                            </ModeButtons>
                        );
                    })
                }
            </ModeSelect>
            <CategoryInputBox>
                <AnimatePresence mode="wait">
                    {CategoryMode === "AddBtn" ? <AddCategoryForms /> : null}
                    {CategoryMode === "EditBtn" ? <EditCategoryForms/> : null}
                    {CategoryMode === "DelBtn" ? <DelCategoryForms /> : null}
                </AnimatePresence>
            </CategoryInputBox>
        </FormLayout>
    );
};