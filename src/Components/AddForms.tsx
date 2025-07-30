//D-Day Item 추가 Form Components

import { useForm } from "react-hook-form";
import styled from "styled-components";
import {InputFormStore, DateStore } from "../store";
import BasedForm, { CancelBtn, FormBtn, FormBtnsBox, InputForms, InputsBox } from "./BasedForm";
import { useStore } from "zustand";

export interface I_Forms {
  TargetDt?: string;
  Titles?: string;
  IsStartEdit?: boolean;
};

interface I_InputForms {
    targetDt?: string;
    StartEdit?: boolean;
};

export default function AddDateForms({Titles}: I_Forms){
    const {register, handleSubmit, setValue} = useForm<I_InputForms>();

    const {InputDone} = useStore(InputFormStore);
    const {AddDate} = useStore(DateStore);

    const onValid = ({targetDt, StartEdit}: I_InputForms) => {
        const Converts: I_Forms = {
            Titles: Titles,
            TargetDt: targetDt,
            IsStartEdit: StartEdit
        };
        AddDate(Converts);
        setValue("StartEdit", false);
        setValue("targetDt", "");

        InputDone();
    };

    return (
        <BasedForm Titles="추가">
            <InputForms onSubmit={handleSubmit(onValid)}>
                <InputsBox>
                    <label>내용</label>
                    <input type="text" value={Titles} disabled />
                </InputsBox>
                <InputsBox>
                    <label>* 목표 일</label>
                    <input type="date" {...register("targetDt", {required: true})}/>
                </InputsBox>
                <InputsBox>
                    <input type="checkbox" {...register("StartEdit")} />
                    <label>설정일로부터 1일</label>
                </InputsBox>
                <FormBtnsBox>
                    <FormBtn>추가</FormBtn>
                    <CancelBtn />
                </FormBtnsBox>
            </InputForms>
        </BasedForm>
    );
}