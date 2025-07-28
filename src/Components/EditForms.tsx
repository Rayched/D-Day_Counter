import styled from "styled-components";
import BasedForm from "./BasedForm";
import { useForm } from "react-hook-form";

const InputForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function EditForms(){
    const {register, setValue, handleSubmit} = useForm();

    const onValid = () => {};

    return (
        <BasedForm>
            <InputForms></InputForms>
        </BasedForm>
    );
};