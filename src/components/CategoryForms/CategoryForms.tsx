import FormLayout from "../FormLayouts/FormLayout";
import { useState } from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import AddCategoryForms from "./AddCategoryForms";
import EditCategoryForms from "./EditCategoryForms";
import DelCategoryForms from "./DelCategoryForms";

type BtnData = {
    BtnId: string;
    BtnNm: string;
};

export interface I_CategoryFormProps {
    setCategoryEdit: Function;
};

const ModeBtnBox = styled.div`
    width: inherit;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

export default function CategoryForms({setCategoryEdit}: I_CategoryFormProps){
    const [NowModes, setModes] = useState("AddBtn");

    const CategoryBtns: BtnData[] = [
        {BtnId: "AddBtn", BtnNm: "추가"},
        {BtnId: "EditBtn", BtnNm: "수정"},
        {BtnId: "DelBtn", BtnNm: "삭제"}
    ];

    return (
        <FormLayout FormNm="카테고리 설정" setStateFn={() => setCategoryEdit(false)}>
            <ModeBtnBox>
                {
                    CategoryBtns.map((data) => {
                        return (
                            <ModeButtons 
                                key={data.BtnId}
                                className={data.BtnId}
                                onClick={() => setModes(data.BtnId)}
                                initial={false}
                                animate={{
                                    backgroundColor: data.BtnId === NowModes ? "#dfe4ea" : "#ffffff"
                                }}
                                transition={{
                                    type: "tween",
                                    bounce: 0,
                                    duration: 0.4
                                }}
                            >{data.BtnNm}</ModeButtons>
                        );
                    })
                }
            </ModeBtnBox>
            <CategoryInputBox>
                <AnimatePresence mode="wait">
                    {NowModes === "AddBtn" ? <AddCategoryForms setCategoryEdit={setCategoryEdit} /> : null}
                    {NowModes === "EditBtn" ? <EditCategoryForms setCategoryEdit={setCategoryEdit} /> : null}
                    {NowModes === "DelBtn" ? <DelCategoryForms /> : null}
                </AnimatePresence>
            </CategoryInputBox>
        </FormLayout>
    );
};