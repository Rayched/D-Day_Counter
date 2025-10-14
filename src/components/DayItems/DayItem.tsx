import styled from "styled-components";
import { useStore } from "zustand";
import { CategoryStore, DayCountEditStore, DayCountStore } from "../../stores";
import { GetNowDate } from "../../modules/GetDateInfos";
import { useEffect, useState } from "react";
import DayDetails from "./DayDetails";
import { motion } from "framer-motion";

interface I_DayItemProps {
    CountId: string;
    Title?: string;
    TargetDt?: string;
    Category?: string;
    isStartDayEdits?: boolean;
};

const ItemContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
    border: 2px solid black;
    border-radius: 15px;
`;

function DayItem({Title, TargetDt, CountId, Category}: I_DayItemProps){
    const {DeleteDayCount} = useStore(DayCountStore);
    const {IsDayCountEdits, setDayCountEdits} = useStore(DayCountEditStore);
    const CategorySelectors = useStore(CategoryStore).SelectedList();
    const C_Icons = CategorySelectors.find((data) => data.CategoryId === Category)?.CategoryIcon;

    const [DiffText, setDiffText] = useState("");
    const [isShowDetails, setShowDetails] = useState(false);

    const getDiffText = () => {
        const ModifyNowDates = new Date(GetNowDate().join("-")).getTime();
        const ModifyTargets = new Date(String(TargetDt)).getTime();

        const Millies = 1000 * 60 * 60 * 24;

        if(ModifyNowDates < ModifyTargets){
            const Diffs = Math.floor((ModifyTargets - ModifyNowDates) / Millies);
            setDiffText(`D-${Diffs}`);
        } else if(ModifyNowDates === ModifyTargets){
            setDiffText("D-Day");
        } else if(ModifyNowDates > ModifyTargets){
            const Diffs = Math.floor((ModifyNowDates - ModifyTargets) / Millies);
            setDiffText(`D+${Diffs}`);
        };
    };

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
        setDayCountEdits();
    };

    useEffect(() => {
        getDiffText();
    }, []);

    const ShowDetails = () => {
        if(IsDayCountEdits){
            return;
        } else {
            setShowDetails(true);
        }
    }

    return (
        <>
            <ItemContainer onClick={ShowDetails}>
                <div>
                    <span>{DiffText} </span>
                    <span>
                        {C_Icons !== "" ? C_Icons : null} 
                        {Title}
                    </span>
                </div>
                <div>{`(목표일 ${TargetDt})`}</div>
                {
                    IsDayCountEdits ? (
                        <button onClick={() => onDelete(CountId)}>삭제</button>
                    ) : null
                }
            </ItemContainer>
            {
                isShowDetails ? (
                <DayDetails 
                    CountId={CountId}
                    setStateFn={setShowDetails}
                />): null
            }
        </>
    );
};

export default DayItem;