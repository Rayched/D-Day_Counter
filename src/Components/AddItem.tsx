//D-Day Item 추가 Form Components

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
    justify-content: center;
`;

export default function AddDayItems({DateText}: T_AddDayItems){
    return (
        <Container>
            D-Day 내용 : {DateText}
        </Container>
    );
}