//D-Day Item 추가 Form Components

import { useForm } from "react-hook-form";
import styled from "styled-components";
import {useAddModeStore, useDateStore } from "../store";
import BasedForm from "./BasedForm";

export interface I_Forms {
  TargetDt?: string;
  Titles?: string;
  IsStartEdit?: boolean;
};

interface I_InputForms {
    targetDt?: string;
    StartEdit?: boolean;
};

const InputForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputBox = styled.div``;

export default function AddDateForms({Titles}: I_Forms){
    const {register, handleSubmit, setValue} = useForm<I_InputForms>();

    const {AddDate} = useDateStore();
    const {isAdds, setAdds} = useAddModeStore();

    const onValid = ({targetDt, StartEdit}: I_InputForms) => {
        const Converts: I_Forms = {
            Titles: Titles,
            TargetDt: targetDt,
            IsStartEdit: StartEdit
        };
        AddDate(Converts);
        setValue("StartEdit", false);
        setValue("targetDt", "");

        if(!isAdds){
            return;
        } else {
            setAdds(false);
        };
    };

    return (
        <BasedForm>
            <InputForm onSubmit={handleSubmit(onValid)}>
                <InputBox>
                    <label>내용</label>
                    <input type="text" value={Titles} disabled />
                </InputBox>
                <InputBox>
                    <label>* 목표 일</label>
                    <input type="date" {...register("targetDt", {required: true})}/>
                </InputBox>
                <InputBox>
                    <input type="checkbox" {...register("StartEdit")} />
                    <label>설정일로부터 1일</label>
                </InputBox>
                <button>추가</button>
            </InputForm>
        </BasedForm>
    );
}