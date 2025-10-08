import styled from "styled-components";
import { DayCountStore, FormTypeStore } from "../../stores";
import { useStore } from "zustand";
import DayItem from "./DayItem";
import DayFormBox from "../DayForms/DayFormBox";

const DayItemListContainer = styled.div`
    width: 300px;
    border: 2px solid black;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    gap: 3px;
`;

function DayItemList(){
    const {DayCounts} = useStore(DayCountStore);
    const {isDayEdits, setDayEdits} = useStore(FormTypeStore);

    return (
        <>
            <DayItemListContainer>
                {
                    DayCounts.map((data) => {
                        return (
                            <DayItem 
                                key={data.CountId}
                                Title={data.CountTitle}
                                TargetDt={data.CountTargetDt}
                                DayCountId={data.CountId}
                            />
                        );
                    })
                }
                <button onClick={setDayEdits}>D-Day 편집</button>
            </DayItemListContainer>
            {isDayEdits ? <DayFormBox /> : null}
        </>
    );
};

export default DayItemList;