//DayItem's Components

import { useStore } from "zustand";
import { I_DayCountTypes } from "../Project-types";
import { CategoryStore, DayCountStore } from "../stores";
import DayFormBox from "./DayForms/DayFormBox";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GetNowDate } from "../modules/GetDateInfos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface I_DayItemsProps {
    CountDatas?: I_DayCountTypes[];
    NowCategory?: string;
    isDelMode: boolean;
};

const DayItemList = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    place-content: start;
    place-items: center;
    width: 90%;
    height: 100%;
    max-width: 385px;
    padding: 5px 3px;
    border: 1px solid ${(props) => props.theme.BoxBorderColor};
    border-radius: 10px;
    background-color: ${(props) => props.theme.ItemBoxColor};
`;

const DayItemBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    max-width: 150px;
    height: 80px;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 14px;
    background-color: ${(props) => props.theme.ItemColor};
    position: relative;
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
    width: 100%;
    max-width: 150px;
    height: 80px;
    border-radius: 15px;
    color: white;
    background-color: ${(props) => props.theme.AddBtnColor};
`;

const DelBtnBox = styled.div`
    position: absolute;
    top: -4px;
    right: -5px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        color: white;
        width: 11px;
        height: 10px;
        border: 1px solid white;
        border-radius: 20px;
        background-color: red;
    }
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

function DayItems({CountDatas, NowCategory, isDelMode}: I_DayItemsProps){
    //const {isDayEdits, setDayEdits} = useStore(FormTypeStore);
    const [isDayEdits, setDayEdits] = useState(false);
    const CategoryData = useStore(CategoryStore).SelectedList();

    const {DeleteDayCount} = useStore(DayCountStore);

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

    const onDelete = (targetId?: string) => {
        const Targets = CountDatas?.find((data) => data.CountId === targetId);

        const Confirms = window.confirm(
            `이름: ${Targets?.CountTitle} / 목표일: ${Targets?.CountTargetDt}\n해당 D-Day를 삭제 하시겠습니까?`
        );

        if(!Confirms){
            alert(
                `'${Targets?.CountTitle} / ${Targets?.CountTargetDt}\n해당 D-Day의 삭제 취소했습니다.`
            );
            return;
        } else if(Confirms){
            alert(
                `'${Targets?.CountTitle} / ${Targets?.CountTargetDt}\n해당 D-Day를 삭제했습니다.`
            );
            DeleteDayCount(String(targetId));
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
                            <DelBtnBox onClick={() => onDelete(data.CountId)}>
                                {
                                    isDelMode ? (
                                        <FontAwesomeIcon 
                                            icon={faXmark}
                                            size="2xs"
                                        />
                                    ): null
                                }
                            </DelBtnBox>
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
            <AddBtn onClick={() => setDayEdits(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={35} fill="#ffffff">
                <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                </svg>
            </AddBtn>
            {isDayEdits ? <DayFormBox setStateFn={setDayEdits}/> : null}
        </DayItemList>
    );
};

export default DayItems;