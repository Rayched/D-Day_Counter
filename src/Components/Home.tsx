import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddDateItems from "./AddDateForms";
import { EditModeStore, useAddModeStore } from "../store";
import Counters from "./Counters";
import { useStore } from "zustand";
import EditForms from "./EditForms";

interface I_InputForm {
    DateText?: string;
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
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

    const EditMode = useStore(EditModeStore, (state) => state.isEdits);

    const onValid = ({DateText}: I_InputForm) => {
        if(DateText === ""){
            return;
        } else {
            setAdds(true);
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
                        autoComplete="off"
                        {...register("DateText", {required: true})}
                    />
                    <button>추가</button>
                </InputForm>
                <Counters />
            </Container>
            { isAdds ? <AddDateItems Titles={Title} /> : null }
            { EditMode ? <EditForms /> : null}
        </>
    );
};

export default Home;