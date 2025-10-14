import { useStore } from "zustand";
import InputLayout from "../FormLayouts/InputLayout";
import { CategoryStore } from "../../stores";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { I_Category } from "../../Project-types";


interface I_EditFormProps {
    EditNm?: string;
    EditIcon?: string;
};

const InputForm = styled.form``;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

export default function EditCategoryForms(){
    const {CustomCategories, EditCategory} = useStore(CategoryStore);
    const [isTargetEmpty, setTargetEmpty] = useState(false);
    const [EditTargetId, setEditTargetId] = useState("");

    const {register, handleSubmit, setValue} = useForm();

    /**
     * 카테고리 수정 Tab
     * - 수정할 대상 고르는 form
     *  - 대상 미 선택 시 아래 form 랜더링 X
     *    option 고르고, 선택 버튼 누르면
     *    하단에 카테고리 입력 form 랜더링
     * - 수정할 카테고리 정보 입력하는 form
     */

    const targetSelected = ({targets}: {targets?: string}) => {
        //targets => 수정 대상 카테고리의 Id 값을 받음 (categoryId)
        console.log(`Target CategoryId: ${targets}`);
        setEditTargetId(String(targets));
        setTargetEmpty(true);
    };

    const onValid = ({EditNm, EditIcon}: I_EditFormProps) => {
        const confirm = window.confirm("카테고리를 수정하겠습니까?");      

        const Idx = CustomCategories.findIndex((data) => data.CategoryId === EditTargetId);

        if(!confirm){
            alert("카테고리 수정 취소");
        } else if(confirm && Idx === -1){
            alert(`'${EditIcon} ${EditNm}', 카테고리를 찾지 못했습니다.`);
        } else if(confirm && Idx !== -1){
            const newValue: I_Category = {
                CategoryId: CustomCategories[Idx].CategoryId,
                CategoryNm: EditNm,
                CategoryIcon: EditIcon
            };
            EditCategory(newValue);
            setValue("EditNm", "");
            setValue("EditIcon", "");
        }
        setTargetEmpty(false);
        setEditTargetId("");
    };    

    return (
        <InputLayout>
            <InputForm onSubmit={handleSubmit(targetSelected)}>
                <InputBox>
                    <h4>수정할 카테고리 선택</h4>
                    <select key="Categorys" {...register("targets")} disabled={isTargetEmpty}>
                        <option value="" disabled>-- 수정할 카테고리를 선택해주세요. --</option>
                        <optgroup label="수정 가능한 카테고리 목록">
                            {
                                CustomCategories.map((data) => {
                                    return (
                                        <option key={data.CategoryId} value={data.CategoryId}>
                                            {data.CategoryIcon} {data.CategoryNm}
                                        </option>
                                    );
                                })
                            }
                        </optgroup>
                    </select>
                    <button disabled={isTargetEmpty}>선택</button>
                </InputBox>
            </InputForm>
            {
                isTargetEmpty ? (
                    <InputForm onSubmit={handleSubmit(onValid)}>
                        <h3>카테고리 수정</h3>
                        <InputBox>
                            <h4>카테고리 아이디</h4>
                            <input 
                                type="text" 
                                value={EditTargetId} 
                                disabled 
                            />
                        </InputBox>
                        <InputBox>
                            <h4>카테고리 이름 *</h4>
                            <input 
                                type="text" 
                                placeholder="카테고리 이름을 입력해주세요." 
                                {...register("EditNm", {required: true})} 
                            />
                        </InputBox>
                        <InputBox>
                            <h4>카테고리 아이콘 (이모지)</h4>
                            <input 
                                type="text"  
                                placeholder="'window + R' => 이모지 입력" 
                                {...register("EditIcon")}
                            />
                        </InputBox>
                        <button>카테고리 수정</button>
                    </InputForm>
                ) : null
            }
        </InputLayout>
    );
}