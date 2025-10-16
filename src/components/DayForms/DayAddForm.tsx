import styled from "styled-components";
import InputLayout from "../FormLayouts/InputLayout";
import { useForm } from "react-hook-form";
import { useStore } from "zustand";
import { CategoryStore, DayCountStore, FormTypeStore } from "../../stores";
import { GetNowDate } from "../../modules/GetDateInfos";
import { I_DayCountTypes } from "../../Project-types";

interface I_DayCountForms {
    Category?: string;
    TargetDt?: string;
    Title?: string;
};

const FormBox = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputBox = styled.div``;

export default function DayAddForm(){
    const {register, handleSubmit} = useForm();

    const Categories = useStore(CategoryStore).SelectedList();
    const {setDayEdits} = useStore(FormTypeStore);
    const {DayCounts, AddNewDayCount} = useStore(DayCountStore);

    const TodayDate = GetNowDate().join("-");

    const onValid = (FormData: I_DayCountForms) => {
        console.log(FormData);
        const DayId = String(FormData.TargetDt).split("-").join("") + `DayCount${DayCounts.length + 1}`;
        const NewDayCount: I_DayCountTypes = {
            CountId: DayId,
            CountTitle: FormData.Title,
            CountTargetDt: FormData.TargetDt,
            Category: FormData.Category
        };
        AddNewDayCount(NewDayCount);
        setDayEdits();
    };

    return (
        <InputLayout>
            <h4>* : 필수 입력</h4>
            <FormBox onSubmit={handleSubmit(onValid)}>
                <InputBox key="CategoryBox">
                    <h4>카테고리 선택</h4>
                    <select {...register("Category")}>
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
                <InputBox key="TargetDtBox">
                    <h4>목표일 / 기준일 *</h4>
                    <input 
                        type="date" 
                        defaultValue={TodayDate}
                        {...register("TargetDt", {required: "날짜를 지정해주세요."})}
                    />
                </InputBox>
                <InputBox key="TitleBox">
                    <h4>D-Day 이름 *</h4>
                    <input 
                        type="text"
                        placeholder="D-Day 이름을 입력해주세요."
                        {...register("Title", {required: "D-Day 이름을 입력하지 않았습니다."})}
                    />
                </InputBox>
                <button>D-Day 등록하기</button>
            </FormBox>
        </InputLayout>
    );
}