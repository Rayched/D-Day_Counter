import styled from "styled-components";
import InputLayout from "../FormLayouts/InputLayout";
import { useForm } from "react-hook-form";
import { useStore } from "zustand";
import { CategoryStore, DayCountStore, FormTypeStore} from "../../stores";
import { GetNowDate } from "../../modules/GetDateInfos";
import { I_DayCountTypes } from "../../Project-types";

interface I_DayCountForms {
    Category?: string;
    TargetDt?: string;
    Title?: string;
};

const FormBox = styled.form`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const SubmitBtn = styled.div`
    width: 100px;
    height: 20px;
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
            <FormBox onSubmit={handleSubmit(onValid)}>
                <FormDataBox key="CategoryBox">
                    <InputTitle>카테고리 선택</InputTitle>
                    <SelectBox {...register("Category")}>
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
                <FormDataBox key="TargetDtBox">
                    <InputTitle>목표일 / 기준일 *</InputTitle>
                    <InputBox
                        type="date" 
                        defaultValue={TodayDate}
                        {...register("TargetDt", {required: "날짜를 지정해주세요."})}
                    />
                </FormDataBox>
                <FormDataBox key="TitleBox">
                    <InputTitle>D-Day 이름 *</InputTitle>
                    <InputBox
                        type="text"
                        placeholder="D-Day 이름을 입력해주세요."
                        {...register("Title", {required: "D-Day 이름을 입력하지 않았습니다."})}
                    />
                </FormDataBox>
                <SubmitBtn>D-Day 등록</SubmitBtn>
            </FormBox>
        </InputLayout>
    );
}