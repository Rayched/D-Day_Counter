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

const FormBox = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputBox = styled.div``;

export default function DayEditForm(){
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
    };

    useEffect(() => console.log(Targets))

    return (
        <InputLayout>
            {

            Targets === undefined ? (<FormBox onSubmit={handleSubmit(TargetSelected)}>
                <h4>수정할 D-Day 선택</h4>
                <select {...register("DayCountId")}>
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
                </select>
                <button>D-Day 선택</button>
            </FormBox>
            ):(
                <FormBox onSubmit={handleSubmit(onValid)}>
                    <h4>D-Day 수정</h4>
                    <InputBox>
                        <h4>카테고리 선택</h4>
                        <select defaultValue={Targets?.Category} {...register("Category")}>
                            {
                            Categories.map((data) => {
                                    return (
                                        <option key={data.CategoryId} value={data.CategoryId}>
                                            {data.CategoryIcon} {data.CategoryNm}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </InputBox>
                    <InputBox>
                            <h4>목표일 / 기준일 *</h4>   
                            <input 
                            type="date" 
                            defaultValue={Targets?.CountTargetDt} 
                            {...register("NewTargetDt", {required: "날짜를 지정해주세요."})}
                        />
                    </InputBox>
                    <InputBox>
                        <h4>D-Day 이름 *</h4>
                        <input 
                            type="text"
                            defaultValue={Targets?.CountTitle}
                            placeholder="D-Day 이름을 입력해주세요."
                            {...register("NewTitle", {required: "D-Day 이름을 입력하지 않았습니다."})}
                        />
                    </InputBox>
                    <button>D-Day 수정하기</button>
                </FormBox>
                )
            }
        </InputLayout>
    );
}