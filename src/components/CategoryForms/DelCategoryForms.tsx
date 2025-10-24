import styled from "styled-components";
import InputLayout from "../FormLayouts/InputLayout";
import { useStore } from "zustand";
import { CategoryStore, DayCountStore } from "../../stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteFormTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
`;

const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 80%;
    margin-top: 10px;
`;

const CategoryItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: #504e4e;
    font-weight: bold;
    border: 2px solid #504e4e;
    border-radius: 10px;
    width: 90%;
    padding: 2px 5px;
`;

const CategoryData = styled.div`
    width: 70%;
    text-align: center;
    align-items: center;
`;

const DeleteBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    width: 20px;
    height: 20px;
    border-radius: 25px;
`;

export default function DelCategoryForms(){
    const {DeleteCategoryWithCounts} = useStore(DayCountStore);
    const {CustomCategories, DeleteCategory} = useStore(CategoryStore);

    const isDeleteCategory = (targetId: string) => {
        const Targets = CustomCategories.find((data) => data.CategoryId === targetId);
        const FirstConfirm = window.confirm(
           `'${Targets?.CategoryIcon} ${Targets?.CategoryNm}' 카테고리를 삭제 하겠습니까?`
        );

        const LastedConfirm = window.confirm(
            `'${Targets?.CategoryIcon} ${Targets?.CategoryNm}' 카테고리에 포함된 D-Day도 같이 삭제됩니다.\n정말로 '${Targets?.CategoryIcon} ${Targets?.CategoryNm}' 카테고리를 삭제 하겠습니까?`
        );

        if(FirstConfirm && LastedConfirm){
            alert(`'${Targets?.CategoryIcon} ${Targets?.CategoryNm}' 카테고리\n해당 카테고리에 포함된 D-Day 전체 삭제 완료`);
            DeleteCategoryWithCounts(targetId);
            DeleteCategory(targetId);
        } else {
            alert("카테고리 삭제를 취소 했습니다.");
            return;
        };
    };

    return (
        <InputLayout>
            <DeleteFormTitle>삭제 가능한 카테고리 목록</DeleteFormTitle>
            <CategoryList>
                {
                    CustomCategories.map((data) => {
                        return (
                            <CategoryItem key={data.CategoryId}>
                                <CategoryData>{data.CategoryIcon} {data.CategoryNm}</CategoryData>
                                <DeleteBtn onClick={() => isDeleteCategory(String(data.CategoryId))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#ffffff" width="15" height="15">
                                        <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                                    </svg>
                                </DeleteBtn>
                            </CategoryItem>
                        );
                    })
                }
            </CategoryList>
        </InputLayout>
    );
}