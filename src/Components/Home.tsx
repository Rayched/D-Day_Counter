import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddDayItems from "./AddItem";

interface I_InputForm {
    DateText?: string;
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputForm = styled.form``;

const AddItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    position: absolute;
`;

function Home(){
    const [Hide, setHide] = useState(true);
    const [Title, setTitle] = useState("");

    const {register, setValue, handleSubmit} = useForm();

    const onValid = ({DateText}: I_InputForm) => {
        if(DateText === ""){
            return;
        } else {
            setHide(false);
            setTitle(String(DateText));
        };

        setValue("DateText", "");
    };

    return (
        <>
            <Container>
                <InputForm onSubmit={handleSubmit(onValid)}>
                    <input 
                        type="text" 
                        placeholder="D-Day 내용 입력" 
                        {...register("DateText", {required: true})}
                    />
                    <button>추가</button>
                </InputForm>
            </Container>
            {
                Hide ? null : (
                    <AddItemWrapper onClick={() => setHide(true)}>
                        <AddDayItems DateText={Title} />
                    </AddItemWrapper>
                )
            }
        </>
    );
};

export default Home;