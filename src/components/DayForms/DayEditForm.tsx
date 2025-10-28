import { Form, useForm } from "react-hook-form";
import InputLayout from "../FormLayouts/InputLayout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { CategoryStore, DayCountStore, FormTypeStore } from "../../stores";
import { I_DayCountTypes } from "../../Project-types";

export interface I_DayCountEditForms {
    oldCountId?: string;
    Category?: string;
    NewTitle?: string;
    NewTargetDt?: string;
};

interface I_DayEditFormProps {
    CloseForms: Function;
};

const LoadingBox = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
`;

const TargetSelectBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    button {
        margin: 0px 3px;
    };
`;

const EditFormBox = styled.form`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormDataBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    font-weight: bold;
`;

const InputTitle = styled.div`
    font-size: 15px;
    margin: 10px 0px;
    padding-left: 5px;
`;

const SelectBox = styled.select`
    width: 200px;
    height: 23px;
    text-align: center;
    border: 2px solid black;
    border-radius: 10px;
`;

const InputBox = styled.input`
    width: 200px;
    height: 23px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 2px 3px;
`;

const SubmitBtn = styled.button`
    width: 100px;
    height: 25px;
    margin-top: 10px;
    border: 2px solid black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    background-color: darkgray;

    &:hover {
        background-color: #c9c7c7;
    }
`;

export default function DayEditForm({CloseForms}: I_DayEditFormProps){
    const {register, handleSubmit} = useForm();
   
    const [Targets, setTargets] = useState<I_DayCountTypes>();

    const {DayCounts, UpdateDayCount} = useStore(DayCountStore);
    const Categories = useStore(CategoryStore).SelectedList();
    const {setDayEdits} = useStore(FormTypeStore);

    const TargetSelected = ({DayCountId}: {DayCountId?: string}) => {
        const Idx = DayCounts.findIndex((data) => data.CountId === DayCountId);
        console.log(Idx);

        if(Idx === -1){
            alert("수정할 대상을 찾지 못했습니다.");
            return;
        } else {
            setTargets(DayCounts[Idx]);
        };
    };

    const onValid = (FormData: I_DayCountEditForms) => {
        const NewDayCountData: I_DayCountEditForms = {
            oldCountId: Targets?.CountId,
            NewTitle: FormData.NewTitle,
            Category: FormData.Category,
            NewTargetDt: FormData.NewTargetDt
        };
        UpdateDayCount(NewDayCountData);
        setDayEdits();
        alert("D-Day 수정 완료");
        CloseForms();
    };

    return (
        <InputLayout>
            {DayCounts.length === 0 ? ( <LoadingBox>수정 가능한 D-Day가 없습니다.</LoadingBox>) : null}
            { 
                DayCounts.length > 0 && Targets === undefined ? (
                    <EditFormBox onSubmit={handleSubmit(TargetSelected)}>
                        <InputTitle>수정할 D-Day 선택</InputTitle>
                            <TargetSelectBox>
                            <SelectBox {...register("DayCountId")}>
                                {
                                    DayCounts.map((data) => {
                                        return (
                                            <option key={data.CountId} value={data.CountId}>
                                                {data.CountTitle}
                                                / 목표일 {data.CountTargetDt}
                                            </option>
                                        );
                                    })
                                }
                            </SelectBox>
                            <button>선택</button>
                            </TargetSelectBox>
                    </EditFormBox>
            ): null}
            {
                Targets !== undefined ? (
                    <EditFormBox onSubmit={handleSubmit(onValid)}>
                        <h4>새로운 데이터 입력</h4>
                        <FormDataBox>
                            <InputTitle>카테고리 선택</InputTitle>
                            <SelectBox defaultValue={Targets?.Category} {...register("Category")}>
                                {
                                    Categories.map((data) => {
                                        return (
                                            <option key={data.CategoryId} value={data.CategoryId}>
                                                {data.CategoryIcon} {data.CategoryNm}
                                            </option>
                                        );
                                    })
                                }
                            </SelectBox>
                        </FormDataBox>
                        <FormDataBox>
                                <InputTitle>목표일 / 기준일 *</InputTitle>   
                                <InputBox 
                                type="date" 
                                defaultValue={Targets?.CountTargetDt} 
                                {...register("NewTargetDt", {required: "날짜를 지정해주세요."})}
                            />
                        </FormDataBox>
                        <FormDataBox>
                            <InputTitle>D-Day 이름 *</InputTitle>
                            <InputBox 
                                type="text"
                                defaultValue={Targets?.CountTitle}
                                placeholder="D-Day 이름을 입력해주세요."
                                {...register("NewTitle", {required: "D-Day 이름을 입력하지 않았습니다."})}
                            />
                        </FormDataBox>
                        <SubmitBtn>수정하기</SubmitBtn>
                </EditFormBox>
                ) : null
            }
        </InputLayout>
    );
}