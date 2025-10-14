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

const CategoryIdBox = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CategoryIdText = styled.div`
    width: 40%;
    border: 1px solid black;
    color: black;
    background-color: #bdc3c7;
    padding: 3px 0px;
    margin-left: 3px;
    font-size: 13px;
    text-align: center;
`;

const CreateCategoryId = (CustomLength: number) => {
    if(CustomLength > 10){
        return "category" + CustomLength;
    } else {
        return "category0" + CustomLength;
    };
};

export default function AddCategoryForms(){
    const {register, handleSubmit, setValue} = useForm();
    const {setCategoryEdits} = useStore(FormTypeStore);
    const {CustomCategories, AddNewCategory} = useStore(CategoryStore);
    const newCategoryId = CreateCategoryId(CustomCategories.length + 1);

    const onValid = ({CategoryNm, CategoryIcon}: I_AddFormProps) => {
        const Format: I_Category = {
            CategoryId: newCategoryId,
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
                <CategoryIdBox>
                    카테고리 아이디
                    <CategoryIdText>{newCategoryId}</CategoryIdText>
                </CategoryIdBox>
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