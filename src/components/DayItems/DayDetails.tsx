import { motion } from "framer-motion";
import styled from "styled-components";
import { DayCountStore } from "../../stores";
import { useStore } from "zustand";

interface I_DayDetails {
    CountId?: string;
    setStateFn: Function;
};

const Container = styled(motion.div)`
    width: 300px;
    height: 500px;
    background-color: gray;
    border-radius: 10px;
    position: absolute;
    top: 5px;
`;

export default function DayDetails({CountId, setStateFn}: I_DayDetails){
    const {DayCounts} = useStore(DayCountStore);
    const DayCountData = DayCounts.find((data) => data.CountId === CountId);
    return (
        <Container onClick={() => setStateFn(false)}>
            <ul>
                <li>D-Day Id: {DayCountData?.CountId}</li>
                <li>D-Day 제목: {DayCountData?.CountTitle}</li>
                <li>
                    D-Day 내용: 
                    {DayCountData?.CountBodyText === "" ? "없음": DayCountData?.CountBodyText}
                </li>
                <li>목표일: {DayCountData?.CountTargetDt}</li>
                <li>카테고리: {DayCountData?.Category}</li>
            </ul>
        </Container>
    );
};

/**
 * Addform에서 입력한 D-Day BodyTexts
 * Home에선 보여주지 않기 때문에
 * 추가한 Components
 * 
 * D-Day의 Detail한 데이터를 보여주는 component
 */