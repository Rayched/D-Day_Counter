//D-Day Item 추가 Form Components

import { useForm } from "react-hook-form";
import styled from "styled-components";

type T_AddDayItems = {
    DateText: string
}

const Container = styled.div`
    width: 300px;
    height: 500px;
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    .FormTitle {
        font-weight: bold;
        padding: 5px 0px;
        margin: 5px 0px;
    };
`;

export default function AddDayItems({DateText}: T_AddDayItems){
    const {register, handleSubmit, setValue} = useForm();

    return (
        <Container>
            <h4 className="FormTitle">D - Day 추가</h4>
            <div>
                <label>내용</label>
                <input type="text" value={DateText} disabled/>
            </div>
            <div>
                <label>목표 일</label>
                <input type="date" />
            </div>
            <div>
                <input type="checkbox" />
                <label>설정일 + 1</label>
            </div>
            <button>등록</button>
        </Container>
    );
}