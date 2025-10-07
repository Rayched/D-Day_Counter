import styled from "styled-components";
import { DayCountStore, FormTypeStore } from "../../stores";
import { useStore } from "zustand";
import AddForms from "../DayForms/AddForms";
import DayItem from "./DayItem";

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
    const {
        isDayAdds, isDayEdits, setDayAdds, setDayEdits
    } = useStore(FormTypeStore);

    return (
        <>
            <DayItemListContainer>
                {
                    DayCounts.map((data) => {
                        return (
                            <DayItem 
                                Title={data.CountTitle}
                                TargetDt={data.CountTargetDt}
                            />
                        );
                    })
                }
                <button onClick={setDayAdds}>D-Day 추가</button>
            </DayItemListContainer>
            {
                isDayAdds ? <AddForms /> : null
            }
        </>
    );
};

export default DayItemList;