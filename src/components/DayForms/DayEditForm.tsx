import { Form, useForm } from "react-hook-form";
import InputLayout from "../FormLayouts/InputLayout";
import styled from "styled-components";
import { useState } from "react";
import { useStore } from "zustand";
import { CategoryStore, DayCountStore, FormTypeStore } from "../../stores";
import { I_DayCountTypes } from "../../Project-types";

export interface I_DayCountEditForms {
    oldCountId?: string;
    NewTitle?: string;
    NewBodyText?: string;
    NewTargetDt?: string;
    Category?: string;
    StartDtEdits?: boolean;
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
    const Default: I_DayCountTypes = {
        CountId: "",
        CountTitle: "",
        CountTargetDt: "",
        isStartDayPlusOne: false,
        CountBodyText: ""
    };

    const [Targets, setTargets] = useState<I_DayCountTypes>(Default);

    const {DayCounts, UpdateDayCount} = useStore(DayCountStore);
    const {Categories} = useStore(CategoryStore);
    const {setDayEdits} = useStore(FormTypeStore);

    const TargetSelected = ({DayCountId}: {DayCountId?: string}) => {
        const Idx = DayCounts.findIndex((data) => data.CountId === DayCountId);

        if(Idx === -1){
            alert("수정할 대상을 찾지 못했습니다.");
            return;
        } else {
            setTargets(DayCounts[Idx]);
        };
    };

    const onValid = (FormData: I_DayCountEditForms) => {
        console.log(FormData);
        const NewDayCountData: I_DayCountEditForms = {
            oldCountId: Targets.CountId,
            NewTitle: FormData.NewTitle,
            NewBodyText: FormData.NewBodyText,
            Category: FormData.Category,
            StartDtEdits: FormData.StartDtEdits,
            NewTargetDt: FormData.NewTargetDt
        };
        UpdateDayCount(NewDayCountData);
        setTargets(Default);
        setDayEdits();
    };

    return (
        <InputLayout>
            <FormBox key={"D-DaySelected"} onSubmit={handleSubmit(TargetSelected)}>
                <h4>수정할 D-Day 선택</h4>
                <select disabled={Targets?.CountId !== ""} {...register("DayCountId")}>
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
                <button disabled={Targets?.CountId !== ""}>D-Day 선택</button>
            </FormBox>
            {
                Targets?.CountId !== "" ? (
                    <FormBox key={"D-DayEditBox"} onSubmit={handleSubmit(onValid)}>
                        <h4>D-Day 수정</h4>
                        <InputBox>
                            <h4>카테고리 선택</h4>
                            <select defaultValue={Targets.Category} {...register("Category")}>
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
                                defaultValue={Targets.CountTargetDt} 
                                {...register("NewTargetDt", {required: "날짜를 지정해주세요."})}
                            />
                        </InputBox>
                        <InputBox>
                            <h4>D-Day 이름 *</h4>
                            <input 
                                type="text"
                                defaultValue={Targets.CountTitle}
                                placeholder="D-Day 이름을 입력해주세요."
                                {...register("NewTitle", {required: "D-Day 이름을 입력하지 않았습니다."})}
                            />
                        </InputBox>
                        <InputBox>
                            <h4>D-Day 내용</h4>
                            <input 
                                defaultValue={Targets.CountBodyText}
                                type="text" 
                                placeholder="D-Day와 관련된 설명을 입력하시면 됩니다." 
                                {...register("NewBodyText")}
                            />
                        </InputBox>
                        <InputBox>
                            <input 
                                type="checkbox" 
                                checked={Targets.isStartDayPlusOne}
                                {...register("StartDtEdits")}
                            />
                            목표일(기준일) + 1
                        </InputBox>
                        <button>D-Day 수정하기</button>
                    </FormBox>
                ) : null
            }
        </InputLayout>
    );
}