import FormLayout from "../FormLayouts/FormLayout";
import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import DayAddForm from "./DayAddForm";
import DayEditForm from "./DayEditForm";
import { useStore } from "zustand";
import { ThemeStore } from "../../stores";
import { DarkTheme, LightTheme } from "../../styles/theme";

type BtnData = {
    BtnId: string;
    BtnNm: string;
};

interface I_DayFormBoxProps {
    setStateFn: Function;
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
    width: 48.5%;
    padding: 3px 3px;
    align-items: center;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    position: relative;
    border-radius: inherit;
`;

const DayInputBox = styled.div`
    width: 96%;
    height: 80%;
    max-width: 379px;
    max-height: 480px;
    background-color: ${(props) => props.theme.FormBtnColor};
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function DayFormBox({setStateFn}: I_DayFormBoxProps){
    const [NowModes, setModes] = useState("AddBtn");
    const {isDark} = useStore(ThemeStore);
    
    const DayCountBtns: BtnData[] = [
        {BtnId: "AddBtn", BtnNm: "D-Day 추가"},
        {BtnId: "DelBtn", BtnNm: "D-Day 수정"}
    ];

    return (
        <FormLayout FormNm="D-Day 편집" setStateFn={() => setStateFn(false)}>
            <ModeBtnBox>
                {
                    DayCountBtns.map((data) => {
                        const ThemeColors = isDark ? DarkTheme : LightTheme;
                        return (
                            <ModeButtons 
                                key={data.BtnId}
                                onClick={() => setModes(data.BtnId)}
                                initial={false}
                                animate={{
                                    color: data.BtnId !== NowModes ? ThemeColors.TextColor : "black",
                                    backgroundColor: data.BtnId === NowModes ? ThemeColors.FormBtnColor : ThemeColors.FormBgColor
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
            <DayInputBox>
                <AnimatePresence mode="wait">
                    {NowModes === "AddBtn" ? <DayAddForm /> : null}
                    {NowModes === "DelBtn" ? <DayEditForm /> : null}
                </AnimatePresence>
            </DayInputBox>
        </FormLayout>
    );
}