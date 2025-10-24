import { useStore } from "zustand";
import InputLayout from "../FormLayouts/InputLayout";
import { CategoryStore } from "../../stores";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { I_Category } from "../../Project-types";
import { I_CategoryFormProps } from "./CategoryForms";

interface I_EditFormProps {
    EditNm?: string;
    EditIcon?: string;
};

const EditFormBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SelectTitle = styled.div`
    font-size: 15px;
    margin: 10px 0px;
    padding-left: 5px;
    font-weight: bold;
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SelectBox = styled.select`
    width: 200px;
    height: 23px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 2px 3px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
`;

const EditDataBox = styled.div`
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


export default function EditCategoryForms({setCategoryEdit}: I_CategoryFormProps){
    const {CustomCategories, EditCategory} = useStore(CategoryStore);
    const [isTargetEmpty, setTargetEmpty] = useState(false);
    const [prevCategory, setPrevCategory] = useState<I_Category>();

    const {register, handleSubmit} = useForm();

    const targetSelected = ({targets}: {targets?: string}) => {
        //targets => 수정 대상 카테고리의 Id 값을 받음 (categoryId)
        console.log(targets);
        if(targets === ""){
            return;
        } else {
            const GetTarget = CustomCategories.find((data) => data.CategoryId === targets);
            setPrevCategory(GetTarget);
            setTargetEmpty(true);
        }
    };

    const onValid = ({EditNm, EditIcon}: I_EditFormProps) => {
        const confirm = window.confirm("카테고리를 수정하겠습니까?");      
        if(!confirm){
            alert("카테고리 수정 취소");
            setTargetEmpty(false);
        } else {
            const EditData: I_Category = {
                CategoryId: prevCategory?.CategoryId,
                CategoryNm: EditNm,
                CategoryIcon: EditIcon
            };
            alert("카테고리 수정 완료");
            EditCategory(EditData);
        }
        setCategoryEdit(false);
    };    
    return (
        <InputLayout>
            {
                !isTargetEmpty ? (
                    <EditFormBox onSubmit={handleSubmit(targetSelected)}>
                        <SelectTitle>수정할 카테고리 선택</SelectTitle>
                        <SelectContainer>
                            <SelectBox {...register("targets")}>
                                <option key={"Defaults"} value={""}>
                                    -- 카테고리를 선택해주세요. --
                                </option>
                                {
                                    CustomCategories.map((data) => {
                                        return (
                                            <option key={data.CategoryId} value={data.CategoryId}>
                                                {data.CategoryIcon} {data.CategoryNm}
                                            </option>                              
                                        );
                                    })
                                }
                            </SelectBox>
                            <button>선택</button>
                        </SelectContainer>
                    </EditFormBox>
                ) : (
                    <EditFormBox onSubmit={handleSubmit(onValid)}>
                        <EditDataBox>
                            <InputTitle>(기존) 카테고리 아이디</InputTitle>
                            <CategoryIdBox>{prevCategory?.CategoryId}</CategoryIdBox>
                        </EditDataBox>
                        <EditDataBox>
                            <InputTitle>카테고리 이름</InputTitle>
                            <InputBox 
                                type="text"
                                placeholder="카테고리 이름을 입력해주세요."
                                defaultValue={prevCategory?.CategoryNm}
                                {...register("EditNm", {required: true})}
                            />
                        </EditDataBox>
                        <EditDataBox>
                            <InputTitle>카테고리 아이콘</InputTitle>
                            <InputBox 
                                type="text"
                                placeholder="'window + R' => 이모지 입력"
                                defaultValue={prevCategory?.CategoryIcon}
                                {...register("EditIcon", {required: true})}
                            />
                        </EditDataBox>
                        <SubmitBtn>카테고리 수정</SubmitBtn>
                    </EditFormBox>
                )
            }
        </InputLayout>
    );
}