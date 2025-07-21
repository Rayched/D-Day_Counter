import { useState } from "react";
import { I_Forms } from "./App";
import { I_Days, useDayCountStore } from "./store";

//사용자가 입력한 D-Day 정보를 store에 저장하는 DatesConvert 함수
export function DatesConvert(){    
    /*
    const Targets = new Date(String(TargetDt)).getTime();
    const Todays = new Date().getTime();

    const {setDayCounters} = useDayCountStore();

    const Diffs = Math.floor((Targets - Todays) / (1000 * 60 * 60 * 24));

    const newDays: I_Days = {
        Id: `${TargetDt}_${DaysInfo}`,
        DaysInfo: DaysInfo,
        TargetDt: TargetDt,
        DiffDays: Diffs
    };

    setDayCounters(newDays);
    */
};