import styled from "styled-components"
import FormLayout from "./components/FormLayout";

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
    const NowDate = new Date();

    const Year = NowDate.getFullYear();
    const Month = NowDate.getMonth() + 1;
    const Dates = NowDate.getDate();

    const modifys = (target: number) => {
        if(target > 9){
            return String(target);
        } else {
            return "0" + String(target);
        }
    };

    const FullDate = `${Year}-` + modifys(Month) + "-" + modifys(Dates);

    return (
        <FormLayout FormNm="D-Day 추가">
            <InputBox>
                <div className="InputLabel">D-Day 제목 *</div>
                <input type="text" placeholder="D-Day 제목을 입력해주세요." />
            </InputBox>
            <InputBox>
                <div className="InputLabel">목표일 / 기준일 *</div>
                <input type="date" value={FullDate}/>
            </InputBox>
            <InputBox>
                <div className="InputLabel">D-Day 내용</div>
                <input type="text" placeholder="D-Day와 관련된 내용을 입력해주세요." />
            </InputBox>
            <InputBoxT2>
                <input type="checkbox" />
                {`목표일(기준일) + 1`}
            </InputBoxT2>
            <button onClick={() => alert("추가 완료")}>일정 추가</button>
        </FormLayout>
    );
};