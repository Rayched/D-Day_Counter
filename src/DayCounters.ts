import { useState } from "react";
import { I_Forms } from "./App";
import { I_Days } from "./store";

export function DatesConvert({TargetDt, DaysInfo}: I_Forms){    
    const Targets = new Date(String(TargetDt)).getTime();
    const Todays = new Date().getTime();

    const Diffs = Math.floor((Targets - Todays) / (1000 * 60 * 60 * 24));

    const DayInfos: I_Days = {
        Id: `0000${TargetDt}`,
        TargetDt: TargetDt,
        DaysInfo: DaysInfo,
        DiffDays: ""
    };

    if(Diffs > 0){
        DayInfos.DiffDays = `D-${Diffs}`;
    } else if(Diffs === 0){
        DayInfos.DiffDays = "D-Day";
    } else {
        DayInfos.DiffDays = `D+${Math.abs(Diffs)}`
    }
    return DayInfos
};