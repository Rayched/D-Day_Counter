import styled from "styled-components";
import { useStore } from "zustand";
import { InputFormStore } from "../store";
import {delay, motion, scale} from "framer-motion";

interface I_BasedForm {
    Titles: string;
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

const FormBox = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 400px;
    border-radius: 15px;
    background-color: rgba(253, 251, 252, 0.9);
    top: 20px;
    position: absolute;
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

const FormBody = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 85%;
`;

export const InputForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const InputsBox = styled.div``;

export const FormBtnsBox = styled.div``;

export const FormBtn = styled.button``;

const V_FormBox = {
    "default": {
        scale: 0.3
    },
    "start": {
        scale: 1.0,
    },
};

export function CancelBtn(){
    const {InputDone} = useStore(InputFormStore);
    return <FormBtn onClick={InputDone}>취소</FormBtn>
}

export default function BasedForm({Titles, children}: I_BasedForm){
    return (
        <Wrapper>
            <FormBox variants={V_FormBox} initial="default" animate="start" transition={{type: "tween", duration: 0.35}}>
                <FormTitle>{`D-Day ${Titles}`}</FormTitle>
                <FormBody>{children}</FormBody>
            </FormBox>
        </Wrapper>
    );
};