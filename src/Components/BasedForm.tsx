import styled from "styled-components";
import { useStore } from "zustand";
import { EditModeStore, useAddModeStore } from "../store";

interface I_BasedForm {
    children: React.ReactNode;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 500px;
    border-radius: 15px;
    background-color: white;
`;

const FormTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 5px 0px;
    margin: 5px 0px;
`;

export default function BasedForm({children}: I_BasedForm){
    const TitleTexts = ["D-Day 추가", "D-Day 수정"];
    const {isAdds, setAdds} = useAddModeStore();
    const {isEdits, setEdits} = useStore(EditModeStore);

    const onCancel = () => {
        if(isAdds){
            setAdds(false);
        } else if(isEdits){
            setEdits(false);
        } else {
            return;
        }
    };

    return (
        <Wrapper>
            <FormBox>
                <FormTitle>{isAdds ? TitleTexts[0] : TitleTexts[1]}</FormTitle>
                <button onClick={onCancel}>취소</button>
                <div className="FormBody">{children}</div>
            </FormBox>
        </Wrapper>
    );
};