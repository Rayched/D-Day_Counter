import styled from "styled-components";
import BasedForm, { CancelBtn, FormBtn, FormBtnsBox, InputForms, InputsBox } from "./BasedForm";
import { useForm } from "react-hook-form";
import { DateStore, EditStore, I_DateInfos, InputFormStore} from "../store";
import { useStore } from "zustand";

interface I_Forms {
    titles?: string;
    targetDt?: string;
    StartEdit?: boolean;
};

export default function EditForms(){
    const {register, handleSubmit} = useForm();

    const {EditDate} = DateStore();
    const {InputDone} = useStore(InputFormStore);
    const {Targets, setTargets} = useStore(EditStore);

    const onValid = ({titles, targetDt, StartEdit}: I_Forms) => {
        if(titles === Targets.Titles && targetDt === Targets.TargetDt){
            alert("D-Day 데이터가 수정되지 않았습니다.");   
        } else {
            const newValues: I_DateInfos = {
                Id: `${targetDt?.split("-").join("")}_${titles}`,
                TargetDate: targetDt,
                isStartEdits: StartEdit,
                DayText: titles
            };
            EditDate(String(Targets.DateId), newValues);
        };
        setTargets({});
        InputDone();
    };

    return (
        <BasedForm Titles="수정">
            <InputForms onSubmit={handleSubmit(onValid)}>
                <InputsBox>
                    <label>내용</label>
                    <input type="text" defaultValue={Targets.Titles} {...register("titles", {required: true})} />
                </InputsBox>
                <InputsBox>
                    <label>목표일</label>
                    <input type="date" defaultValue={Targets.TargetDt} {...register("targetDt", {required: true})} />
                </InputsBox>
                <InputsBox>
                    <input type="checkbox" {...register("StartEdit")} />
                    <label>설정일로부터 1일</label>
                </InputsBox>
                <FormBtnsBox>
                    <FormBtn>수정</FormBtn>
                    <CancelBtn />
                </FormBtnsBox>
            </InputForms>
        </BasedForm>
    );
};