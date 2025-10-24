import { useForm } from "react-hook-form";
import InputLayout from "../FormLayouts/InputLayout";
import styled from "styled-components";
import { CategoryStore } from "../../stores";
import { useStore } from "zustand";
import { I_Category } from "../../Project-types";
import { I_CategoryFormProps } from "./CategoryForms";

interface I_AddFormProps {
    CategoryNm?: string;
    CategoryIcon?: string;
};

const AddForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const CategoryDataBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin-bottom: 10px;
`;

const InputTitle = styled.div`
    font-size: 15px;
    margin: 10px 0px;
    padding-left: 5px;
    font-weight: bold;
`;

const InputBox = styled.input`
    width: 200px;
    height: 23px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 1px 3px;
`;

const CategoryIdBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 23px;
    border: 2px solid #504e4e;
    border-radius: 10px;
    color: #504e4e;
    background-color: #bdc3c7;
    font-weight: bold;
    font-size: 15px;
`;

const SubmitBtn = styled.button`
    width: 120px;
    height: 25px;
    margin-top: 10px;
    border: 2px solid black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #504e4e;
`;

const CreateCategoryId = (CustomLength: number) => {
    if(CustomLength > 10){
        return "category" + CustomLength;
    } else {
        return "category0" + CustomLength;
    };
};

export default function AddCategoryForms({setCategoryEdit}: I_CategoryFormProps){
    const {register, handleSubmit, setValue} = useForm();
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

        setCategoryEdit(false);
    };

    return (
        <InputLayout>
            <AddForms onSubmit={handleSubmit(onValid)}>
                <CategoryDataBox>
                    <InputTitle>카테고리 아이디</InputTitle>
                    <CategoryIdBox>{newCategoryId}</CategoryIdBox>
                </CategoryDataBox>
                <CategoryDataBox>
                    <InputTitle>카테고리 이름 *</InputTitle>
                    <InputBox
                        type="text" 
                        placeholder="카테고리 이름을 입력해주세요." 
                        {...register("CategoryNm", {required: true})}
                    />
                </CategoryDataBox>
                <CategoryDataBox>
                    <InputTitle>카테고리 아이콘 (이모지)</InputTitle>
                    <InputBox
                        type="text"  
                        placeholder="'window + R' => 이모지 입력" 
                        {...register("CategoryIcon")}
                    />
                </CategoryDataBox>
                <SubmitBtn>카테고리 추가</SubmitBtn>
            </AddForms>
        </InputLayout>
    );
};