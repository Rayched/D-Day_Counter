//D-Day Item Components

import styled from "styled-components";
import { useDateStore } from "../store";

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
    /*
    * 이전 방식 (부족한 지식 선에서 생각난 방식)
    const {ConvertDates} = useDateStore();
    const DateOutputs = ConvertDates();
    

    * Solution 1
    - 'const DateOutputs = useTestStore((state) => state.selector)'

    * Solution 2
    - 'const DateOutputs = useStore(useTestStore, selector)'
    */
    const {DateSelector, DeleteDays} = useDateStore();

    return (
        <Container>
            {
                DateSelector().map((data) => {
                    return (
                        <CounterItems key={data.DateId}>
                            <CounterInfos>{data.DiffDays} {data.Titles}</CounterInfos>
                            <DateInfos>(~ {data.TargetDt})</DateInfos>
                            <button>수정</button>
                            <button onClick={() => DeleteDays(String(data.DateId))}>삭제</button>
                        </CounterItems>
                    );
                })
            }
        </Container>
    );
};

export default Counters;