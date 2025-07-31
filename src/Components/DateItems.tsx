//D-Day Item Components

import styled from "styled-components";
import { DateStore, EditStore, I_DateSelector, InputFormStore} from "../store";
import { useStore } from "zustand";
import { useState } from "react";

interface I_DateItems {
    Show: boolean;
    setShow: Function;
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 6px;
    width: 90%;
    max-width: 360px;
`;

const CounterItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    text-align: center;
    margin: 5px 0px;
    color: rgb(253, 252, 254);
    background-color: rgb(87, 96, 111);
`;

const DateInfos = styled.div`
    width: 100%;
    padding: 3px;
    display: flex;
    justify-content: flex-start;
`;

const DateItemBtnBox = styled.div<{isShows: boolean}>`
    display: ${(props) => props.isShows ? "flex" : "none"};
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    .EditBtn {
        background-color: rgb(77, 145, 77);
    };

    .DeleteBtn {
        background-color: rgb(255, 100, 100);
    };

    width: 100%;
`;

const DateItemBtn = styled.button`
    width: 50px;
    margin: 0px 3px;
    border: 1px solid white;
    border-radius: 10px;
    font-weight: bold;
    color: white;
`;

function DateItems(props: I_DateItems){
    const {DateSelector, DeleteDays} = DateStore();
    const {InputStart} = useStore(InputFormStore);
    const {setTargets} = useStore(EditStore);

    const onEdits = (targetData: I_DateSelector) => {
        const values: I_DateSelector = {
            DateId: targetData.DateId,
            Titles: targetData.Titles,
            TargetDt: targetData.TargetDt
        };

        setTargets(values);
        InputStart("EditMode");
    };

    return (
        <Container>
            {
                DateSelector().map((data) => {
                    return (
                        <CounterItems key={data.DateId}>
                            <DateInfos>{data.DiffDays} {data.Titles}</DateInfos>
                            <DateInfos>
                                {`(${data.TargetDt?.split("-").join(".")})`}
                            </DateInfos>
                            <DateItemBtnBox isShows={props.Show}>
                                <DateItemBtn className="EditBtn" onClick={() => onEdits(data)}>수정</DateItemBtn>
                                <DateItemBtn className="DeleteBtn" onClick={() => DeleteDays(String(data.DateId))}>삭제</DateItemBtn>
                            </DateItemBtnBox>
                        </CounterItems>
                    );
                })
            }
        </Container>
    );
};

export default DateItems;