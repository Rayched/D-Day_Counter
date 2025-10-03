import { useForm } from "react-hook-form";
import FormLayout from "./FormLayout";
import { useState } from "react";
import { CategoryStore } from "../../stores";
import { useStore } from "zustand";
import styled from "styled-components";
import {motion} from "framer-motion";

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
    position: relative;
`;

const InputForms = styled.form`
    width: 96%;
    height: 80%;
    max-width: 379px;
    max-height: 480px;
    background-color: #dfe4ea;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export default function CategoryForms(){
    const {register, handleSubmit, setValue} = useForm();
    const {Categories, AddNewCategory} = useStore(CategoryStore);
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
                                    fontWeight: data.BtnId === CategoryMode ? "bold" : "none"
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
            <InputForms></InputForms>
        </FormLayout>
    );
};