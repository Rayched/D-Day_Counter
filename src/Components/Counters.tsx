//D-Day Item Components

import styled from "styled-components";
import { EditModeStore, I_DateSelector, useDateStore } from "../store";
import { useStore } from "zustand";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CounterItems = styled.div`
    width: 200px;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    text-align: center;
    margin: 5px 0px;
`;

const CounterInfos = styled.div``;
const DateInfos = styled.div``;

function Counters(){
    const {DateSelector, DeleteDays} = useDateStore();
    const {setEdits, setData} = EditModeStore();

    const onEdits = (targetData: I_DateSelector) => {
        setData(targetData);
        setEdits(true);
    };

    return (
        <Container>
            {
                DateSelector().map((data) => {
                    return (
                        <CounterItems key={data.DateId}>
                            <CounterInfos>{data.DiffDays} {data.Titles}</CounterInfos>
                            <DateInfos>(~ {data.TargetDt})</DateInfos>
                            <button onClick={() => onEdits(data)}>수정</button>
                            <button onClick={() => DeleteDays(String(data.DateId))}>삭제</button>
                        </CounterItems>
                    );
                })
            }
        </Container>
    );
};

export default Counters;