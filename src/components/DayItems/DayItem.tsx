import styled from "styled-components";

interface I_DayItemProps {
    Title?: string;
    TargetDt?: string;
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

function DayItem({Title, TargetDt}: I_DayItemProps){
    return (
        <ItemContainer>
            <div>{Title}</div>
            <div>{TargetDt}</div>
        </ItemContainer>
    );
};

export default DayItem;