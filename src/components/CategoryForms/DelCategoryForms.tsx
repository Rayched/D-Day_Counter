import { useStore } from "zustand";
import InputLayout from "./InputLayout";
import { CategoryStore } from "../../stores";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const InputForm = styled.form``;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

export default function DelCategoryForms(){
    const {Categories, DeleteCategory} = useStore(CategoryStore);
    const {register, handleSubmit, setValue} = useForm();
    const [isTargetEmpty, setTargetEmpty] = useState(false);
    const [TargetIdx, setTargetIdx] = useState(0);

    const onValid = ({DeleteTarget}: {DeleteTarget?: string}) => {
        const Idx = Categories.findIndex((data) => data.CategoryId === DeleteTarget);

        if(Idx === -1){
            return;
        } else {
            setTargetIdx(Idx);
            setTargetEmpty(true);
        };
    };

    const onDelete = () => {
        const GetTargetData = Categories[TargetIdx];

        const confirm = window.confirm(
            `카테고리: ${GetTargetData.CategoryIcon} ${GetTargetData.CategoryId}를 삭제 하겠습니까?`
        );

        if(!confirm){
            alert("카테고리 삭제 취소");
        } else {
            alert("카테고리 삭제 완료");
            setValue("DeleteTarget", "");
            DeleteCategory(String(GetTargetData.CategoryId));
        }
        setTargetIdx(0);
        setTargetEmpty(false);
    };

    return (
        <InputLayout>
            <InputForm onSubmit={handleSubmit(onValid)}>
                <h4>삭제할 카테고리 선택</h4>
                <select key="TargetSelect" disabled={isTargetEmpty} {...register("DeleteTarget")}>
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
                <button disabled={isTargetEmpty}>선택</button>
            </InputForm>
            {
                isTargetEmpty ? (
                    <InputForm>
                        <h4>삭제할 카테고리</h4>
                        <InputBox>
                            <h4>카테고리 아이디</h4>
                            <input type="text" value={Categories[TargetIdx].CategoryId} disabled />
                        </InputBox>
                        <InputBox>
                            <h4>카테고리 이름</h4>
                            <input type="text" disabled value={Categories[TargetIdx].CategoryNm} />
                        </InputBox>
                        <InputBox>
                            <h4>카테고리 아이콘</h4>
                            <input type="text" value={Categories[TargetIdx].CategoryIcon} disabled/>
                        </InputBox>
                        <button onClick={onDelete}>카테고리 삭제</button>
                    </InputForm>
                ) : null
            }
            
        </InputLayout>
    );
}