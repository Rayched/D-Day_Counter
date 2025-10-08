import { useStore } from "zustand";
import FormLayout from "../FormLayouts/FormLayout";
import { FormTypeStore } from "../../stores";
import ModeSelect from "../FormLayouts/ModeSelect";
import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import DayAddForm from "./DayAddForm";
import DayEditForm from "./DayEditForm";

type BtnData = {
    BtnId: string;
    BtnNm: string;
};

const ModeButtons = styled(motion.div)`
    width: 48.4%;
    padding: 3px 3px;
    align-items: center;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    position: relative;
`;

const DayInputBox = styled.div`
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

export default function DayFormBox(){
    const {setDayEdits} = useStore(FormTypeStore);

    const [NowModes, setModes] = useState("AddBtn");
    
    const DayCountBtns: BtnData[] = [
        {BtnId: "AddBtn", BtnNm: "D-Day 추가"},
        {BtnId: "DelBtn", BtnNm: "D-Day 수정"}
    ];

    return (
        <FormLayout FormNm="D-Day 편집" setStateFn={setDayEdits}>
            <ModeSelect>
                {
                    DayCountBtns.map((data) => {
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
            </ModeSelect>
            <DayInputBox>
                <AnimatePresence mode="wait">
                    {NowModes === "AddBtn" ? <DayAddForm /> : null}
                    {NowModes === "DelBtn" ? <DayEditForm /> : null}
                </AnimatePresence>
            </DayInputBox>
        </FormLayout>
    );
}