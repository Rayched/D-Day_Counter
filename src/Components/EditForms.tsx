import styled from "styled-components";
import BasedForm from "./BasedForm";
import { useForm } from "react-hook-form";
import { EditModeStore, I_DateInfos, useDateStore } from "../store";
import { InferencePriority } from "typescript";

interface I_Forms {
    titles?: string;
    targetDt?: string;
    StartEdit?: boolean;
};

const InputForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputBox = styled.div``;

export default function EditForms(){
    const {register, setValue, handleSubmit} = useForm();

    const {EditDate} = useDateStore();
    const {targetData, setData, setEdits} = EditModeStore();

    const onValid = ({titles, targetDt, StartEdit}: I_Forms) => {
        if(titles === targetData.Titles && targetDt === targetData.TargetDt){
            alert("D-Day 데이터가 수정되지 않았습니다.");   
        } else {
            const newValues: I_DateInfos = {
                Id: `${targetDt?.split("-").join("")}_${titles}`,
                TargetDate: targetDt,
                isStartEdits: StartEdit,
                DayText: titles
            };
            EditDate(String(targetData.DateId), newValues);
        };
        setData({});
        setEdits(false);
    };

    return (
        <BasedForm>
            <InputForms onSubmit={handleSubmit(onValid)}>
                <InputBox>
                    <label>내용</label>
                    <input type="text" defaultValue={targetData.Titles} {...register("titles", {required: true})} />
                </InputBox>
                <InputBox>
                    <label>목표일</label>
                    <input type="date" defaultValue={targetData.TargetDt} {...register("targetDt", {required: true})} />
                </InputBox>
                <InputBox>
                    <input type="checkbox" {...register("StartEdit")} />
                    <label>설정일로부터 1일</label>
                </InputBox>
                <button>수정</button>
            </InputForms>
        </BasedForm>
    );
};