//디데이 카운터에서 사용되는 데이터 typings

export interface I_DayCount {
    DayTitle?: string; //D-Day 제목
    DayBody?: string; //D-Day 내용
    targetDt?: string; //기준일 (목표일)
    isTodayStart?: boolean; 
    //기준일(목표일) + 1 체크 유무
};

export interface I_Category {
    CategoryIcon?: string;
    CategoryId?: string;
    CategoryNm?: string;
};

//D-Day Type
export interface I_DayCountTypes {
    CountId: string;
    CountTitle?: string;
    CountTargetDt?: string;
    CountBodyText?: string;
    isStartDayPlusOne?: boolean;
};