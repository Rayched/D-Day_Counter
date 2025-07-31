//D-Day Item Components

import styled from "styled-components";
import { DateStore, EditStore, I_DateSelector, InputFormStore} from "../store";
import { useStore } from "zustand";
import { useState } from "react";

interface I_Counters {
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
    height: 56px;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    text-align: center;
    margin: 5px 0px;
    color: rgb(253, 252, 254);
    background-color: rgb(87, 96, 111);
`;

const CounterInfos = styled.div``;
const DateInfos = styled.div``;

const DateItemBtns = styled.div<{isShows: boolean}>`
    display: ${(props) => props.isShows ? "flex" : "none"};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

function Counters(props: I_Counters){
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
                            <CounterInfos>{data.DiffDays} {data.Titles}</CounterInfos>
                            <DateInfos>
                                {`(${data.TargetDt?.split("-").join(".")})`}
                            </DateInfos>
                            <DateItemBtns isShows={props.Show}>
                                <button onClick={() => onEdits(data)}>수정</button>
                                <button onClick={() => DeleteDays(String(data.DateId))}>삭제</button>
                            </DateItemBtns>
                        </CounterItems>
                    );
                })
            }
        </Container>
    );
};

export default Counters;