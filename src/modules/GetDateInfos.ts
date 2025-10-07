//날짜 관련 함수 모음집

//'0 ~ 9' 사이의 날짜를 '00' 형식으로 변환하는 함수
function ModifyDateNumber(modifyTargets: number){
    if(modifyTargets > 9){
        return String(modifyTargets);
    } else {
        return "0" + String(modifyTargets);
    }
};

//오늘 날짜 정보를 담은 배열을 반환하는 GetNowDate 함수
export function GetNowDate(){
    const NowDate = new Date();

    const FullYear = NowDate.getFullYear();
    const Month = NowDate.getMonth() + 1;
    const Days = NowDate.getDate();

    const DateInfos = [
        String(FullYear), ModifyDateNumber(Month), ModifyDateNumber(Days)
    ];

    return DateInfos;
};