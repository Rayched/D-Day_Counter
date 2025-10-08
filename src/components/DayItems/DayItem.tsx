import styled from "styled-components";
import { useStore } from "zustand";
import { DayCountEditStore, DayCountStore } from "../../stores";

interface I_DayItemProps {
    Title?: string;
    TargetDt?: string;
    DayCountId: string;
};

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 80px;
    border: 2px solid black;
    border-radius: 15px;
`;

function DayItem({Title, TargetDt, DayCountId}: I_DayItemProps){
    const {DeleteDayCount} = useStore(DayCountStore);
    const {IsDayCountEdits} = useStore(DayCountEditStore);

    const onDelete = (targetId: string) => {
        const isDelete = window.confirm(
            `'D-Day 명: ${Title} / 목표일: ${TargetDt}' \n해당 D-Day를 삭제하겠습니까?`
        );

        if(!isDelete){
            alert("D-Day 삭제 취소");
            return;
        } else {
            alert(`'D-Day 명: ${Title} / 목표일: ${TargetDt}', 삭제 완료`);
            DeleteDayCount(targetId);
        };
    };

    return (
        <ItemContainer>
            <div>{Title}</div>
            <div>{TargetDt}</div>
            {
                IsDayCountEdits ? (
                    <button onClick={() => onDelete(DayCountId)}>삭제</button>
                ) : null
            }
        </ItemContainer>
    );
};

export default DayItem;