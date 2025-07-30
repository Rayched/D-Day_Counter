import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddDateItems from "./AddForms";
import Counters from "./Counters";
import { useStore } from "zustand";
import EditForms from "./EditForms";
import { InputFormStore } from "../store";

interface FormBox {
    DateText?: string;
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormBox = styled.form`
    width: 70%;
    height: 25px;
    max-width: 260px;
    padding: 3px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 2px solid black;
    border-radius: 15px;
    background-color: rgb(210, 213, 215);
`;

const InputForm = styled.input<{isInputs: boolean}>`
    width: ${(props) => props.isInputs ? "75%" : "100%"};
    border: 0px;
    border-radius: 15px;
    text-align: center;
    font-family: inherit;
    background-color: inherit;

    &:focus {
        outline: none;
    };
`;

const Btns = styled.button`
    width: 45px;
    height: 25px;
    border: 2px solid black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-weight: bold;
`;

function Home(){
    const [Title, setTitle] = useState("");

    const {register, setValue, handleSubmit, watch} = useForm();
    const {isDisplay, Modes, InputStart} = useStore(InputFormStore);

    //D-Day 내용 입력창에 텍스트 입력 여부 확인용 state 
    const [isInputs, setInputs] = useState(false);

    const onValid = ({DateText}: FormBox) => {
        if(DateText === ""){
            return;
        } else {
            InputStart("AddMode")
            setTitle(String(DateText));
        };

        setValue("DateText", "");
    };

    useEffect(() => {
        if(watch("DateText").length === 0 && isInputs){
            setInputs(false);
        } else if(watch("DateText").length !== 0){
            setInputs(true);
        } else {
            return;
        }
    }, [watch("DateText")]);

    return (
        <>
            <Container>
                <FormBox onSubmit={handleSubmit(onValid)}>
                    <InputForm 
                        type="text" 
                        placeholder="D-Day 내용 입력" 
                        autoComplete="off"
                        isInputs={isInputs}
                        {...register("DateText", {required: true})}
                    />
                    {isInputs ? <Btns>추가</Btns> : null}
                </FormBox>
                <Counters />
            </Container>
            { 
                isDisplay && Modes === "AddMode" ? <AddDateItems Titles={Title} /> : null 
            }
            { 
                isDisplay && Modes === "EditMode" ? <EditForms /> : null
            }
        </>
    );
};

export default Home;