import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddDateItems from "./AddDateForms";
import { useAddModeStore, useDateStore } from "../store";
import { useStore } from "zustand";

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
    const [Title, setTitle] = useState("");

    const {register, setValue, handleSubmit} = useForm();
    const {isAdds, setAdds} = useAddModeStore();

    /*
    * 이전 방식 (부족한 지식 선에서 생각난 방식)
    const {ConvertDates} = useDateStore();
    const DateOutputs = ConvertDates();
    */

    //Solution 1
    // 'const DateOutputs = useTestStore((state) => state.selector)'

    //Solution 2
    // 'const DateOutputs = useStore(useTestStore, selector)'

    const {ConvertDates} = useDateStore();

    const onValid = ({DateText}: I_InputForm) => {
        if(DateText === ""){
            return;
        } else {
            setAdds(true);
            setTitle(String(DateText));
        };

        setValue("DateText", "");
    };

    useEffect(() => console.log(ConvertDates()), [isAdds]);

    return (
        <>
            <Container>
                <InputForm onSubmit={handleSubmit(onValid)}>
                    <input 
                        type="text" 
                        placeholder="D-Day 내용 입력" 
                        autoComplete="off"
                        {...register("DateText", {required: true})}
                    />
                    <button>추가</button>
                </InputForm>
            </Container>
            {
                isAdds ? (
                    <AddItemWrapper>
                        <AddDateItems Titles={Title} />
                    </AddItemWrapper>
                ): null
            }
        </>
    );
};

export default Home;