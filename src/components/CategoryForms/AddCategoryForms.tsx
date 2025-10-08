import { useForm } from "react-hook-form";
import InputLayout from "../FormLayouts/InputLayout";
import styled from "styled-components";
import { CategoryStore, FormTypeStore } from "../../stores";
import { useStore } from "zustand";
import { I_Category } from "../../Project-types";

interface I_AddFormProps {
    CategoryNm?: string;
    CategoryIcon?: string;
};

const AddForms = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

export default function AddCategoryForms(){
    const {register, handleSubmit, setValue} = useForm();
    const {setCategoryEdits} = useStore(FormTypeStore);
    const {Categories, AddNewCategory} = useStore(CategoryStore);

    const onValid = ({CategoryNm, CategoryIcon}: I_AddFormProps) => {
        const CategoryNums = Categories.length + 1;
        const create_C_Id = CategoryNums > 9 ? `category${CategoryNums}` : `category0${CategoryNums}`;
        const Format: I_Category = {
            CategoryId: create_C_Id,
            CategoryNm: CategoryNm,
            CategoryIcon: CategoryIcon
        };

        AddNewCategory(Format);

        setValue("CategoryNm", "");
        setValue("CategoryIcon", "");

        setCategoryEdits();
    };

    return (
        <InputLayout>
            <AddForms onSubmit={handleSubmit(onValid)}>
                <InputBox>
                    <h4>카테고리 아이디</h4>
                    <input type="text" disabled value={`category${Categories.length + 1}`} />
                </InputBox>
                <InputBox>
                    <h4>카테고리 이름 *</h4>
                    <input 
                        type="text" 
                        placeholder="카테고리 이름을 입력해주세요." 
                        {...register("CategoryNm", {required: true})}
                    />
                </InputBox>
                <InputBox>
                    <h4>카테고리 아이콘 (이모지)</h4>
                    <input 
                        type="text"  
                        placeholder="'window + R' => 이모지 입력" 
                        {...register("CategoryIcon")}
                    />
                </InputBox>
                <button>카테고리 추가</button>
            </AddForms>
        </InputLayout>
    );
};