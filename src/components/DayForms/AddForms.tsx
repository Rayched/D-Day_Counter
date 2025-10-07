import styled from "styled-components"
import FormLayout from "../FormLayout";
import { GetNowDate } from "../../modules/GetDateInfos";
import { useStore } from "zustand";
import { DayCountStore, FormTypeStore } from "../../stores";
import { useForm } from "react-hook-form";
import { I_DayCountTypes } from "../../Project-types";

interface I_AddFormProps {
    Title?: string;
    TargetDt?: string;
    BodyTexts?: string;
    isPlusOne?: boolean;
};

const InputForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;

    input {
        width: 50%;
        margin-left: 10px;
    }

    .InputLabel {
        width: 50%;
        font-weight: bold;
        margin-left: 10px;
        margin-bottom: 5px;
    }
`;

const InputBoxT2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin: 5px 0px;
`;

export default function AddForms(){
    const Todays = GetNowDate().join("-");
    const {register, handleSubmit, setValue} = useForm();

    const {setDayAdds} = useStore(FormTypeStore);
    const {AddNewDayCount} = useStore(DayCountStore);

    const onValid = ({Title, BodyTexts, TargetDt, isPlusOne}: I_AddFormProps) => {
        //Title, TargetDt가 공백인 경우 필터링
        if(Title === "" || TargetDt === ""){
            alert("D-Day 제목, 목표일(기준일)을 입력하지 않았습니다.");
        } else {
            const FormDataConvert: I_DayCountTypes = {
                CountTitle: Title,
                CountTargetDt: TargetDt,
                CountBodyText: BodyTexts,
                isStartDayPlusOne: isPlusOne
            };
            AddNewDayCount(FormDataConvert);
        };
        setDayAdds();
    };

    return (
        <FormLayout FormNm="D-Day 추가" setStateFn={setDayAdds}>
            <InputForm onSubmit={handleSubmit(onValid)}>
                <InputBox>
                    <div className="InputLabel">D-Day 제목 *</div>
                    <input 
                        type="text" 
                        placeholder="D-Day 제목을 입력해주세요." 
                        {...register("Title", {required: true})}
                    />
                </InputBox>
                <InputBox>
                    <div className="InputLabel">목표일 / 기준일 *</div>
                    <input 
                        type="date" 
                        {...register("TargetDt", {required: true})}
                        defaultValue={Todays}
                    />
                </InputBox>
                <InputBox>
                    <div className="InputLabel">D-Day 내용</div>
                    <input 
                        type="text" 
                        placeholder="D-Day와 관련된 내용을 입력해주세요."
                        {...register("BodyTexts")}
                    />
                </InputBox>
                <InputBoxT2>
                    <input 
                        type="checkbox" 
                        {...register("isPlusOne")}
                    />
                    {`목표일(기준일) + 1`}
                </InputBoxT2>
                <button>일정 추가</button>
            </InputForm>
        </FormLayout>
    );
};