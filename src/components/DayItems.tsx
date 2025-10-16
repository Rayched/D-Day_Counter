//DayItem's Components

import { useStore } from "zustand";
import { I_DayCountTypes } from "../Project-types";
import { CategoryStore, FormTypeStore } from "../stores";
import DayFormBox from "./DayForms/DayFormBox";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GetNowDate } from "../modules/GetDateInfos";

interface I_DayItemsProps {
    CountDatas?: I_DayCountTypes[];
    NowCategory?: string;
};

const DayItemList = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    width: 85%;
    max-width: 380px;
    height: 40%;
    min-height: 366px;
    padding: 3px;
    border: 2px solid black;
    border-radius: 10px;
`;

const DayItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 150px;
    height: 80px;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 14px;
`;

const DataBox = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px 3px;
    margin: 1px 0px;
`;

const ItemText = styled.div`
    margin: 0px 2px;
    font-weight: bold;
`;

const AddBtn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 80px;
    border: 2px solid black;
    border-radius: 15px;
    background-color: darkgray;
`;

const DayItemListVar = {
    "initial": {
        y: 10,
        opacity: 0
    },
    "animate": {
        y: 0,
        opacity: 1
    },
    "exit": {
        y: -10,
        opacity: 0
    },
};

function DayItems({CountDatas, NowCategory}: I_DayItemsProps){
    const {isDayEdits, setDayEdits} = useStore(FormTypeStore);
    const CategoryData = useStore(CategoryStore).SelectedList();

    const getDiffText = (targetDt?: string) => {
        const NowDates = new Date(GetNowDate().join("-")).getTime();
        const TargetDate = new Date(String(targetDt)).getTime();

        const Millies = 1000 * 60 * 60 * 24;

        if(NowDates < TargetDate){
            const Diffs = Math.floor((TargetDate - NowDates) / Millies);
            return `D-${Diffs}`;
        } else if(NowDates > TargetDate){
            const Diffs = Math.floor((NowDates - TargetDate) / Millies);
            return `D+${Diffs}`
        } else {
            return "D-Day";
        }
    };

    useEffect(() => {
        getDiffText();
    }, []);

    return (
        <DayItemList
            key={NowCategory}
            variants={DayItemListVar}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{delay: 0.2, duration: 0.3}}
        >
            {
                CountDatas?.map((data) => {
                    const Icons = CategoryData.find((c) => c.CategoryId === data.Category)?.CategoryIcon;
                    const DiffText = getDiffText(data.CountTargetDt);
                    return (
                        <DayItemBox key={data.CountId}>
                            <DataBox>
                                <ItemText>{DiffText}</ItemText>
                                <ItemText>{Icons}</ItemText>
                                <ItemText>{data.CountTitle}</ItemText>
                            </DataBox>
                            <DataBox>{`( 목표일 ${data.CountTargetDt} )`}</DataBox>
                        </DayItemBox>
                    );
                })
            }
            <AddBtn onClick={setDayEdits}>D-Day 추가</AddBtn>
            {isDayEdits ? <DayFormBox /> : null}
        </DayItemList>
    );
};

export default DayItems;