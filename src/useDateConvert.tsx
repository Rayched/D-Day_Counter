import { useState } from "react";
import { I_Days, useDayCountStore } from "./store";
import { I_Forms } from "./App";

interface I_useDateConvert {
    DateConverts: ({TargetDt, Titles}: I_Forms) => void;
};

export default function useDateConvert(): I_useDateConvert{
    const {setDayCounters} = useDayCountStore();

    const DataUpload = ({TargetDt, Titles}: I_Forms) => {
        if(TargetDt === "" || Titles === ""){
            return;
        } else {
            /**
             * 오늘 날짜, 목표 일 가져오고
             * 가져온 결과를 ms로 변환
             */
            const getTodays = new Date().getTime();
            const getTargets = new Date(String(TargetDt)).getTime();

            const Diffs = Math.floor(
                (getTargets - getTodays) / (1000 * 60 * 60 * 24)
            );

            const NewDates: I_Days = {
                Id: `${TargetDt?.split("-").join("")}_${Titles}`,
                TargetDt: TargetDt,
                Titles: Titles,
                DayInfos: ""
            };

            if(Diffs === 0){
                NewDates.DayInfos = "D-Day";
            } else if(Diffs > 0){
                NewDates.DayInfos = `D-${Diffs + 1}`;
            } else {
                NewDates.DayInfos = `D+${Math.abs(Diffs) + 1}`;
            };

            setDayCounters(NewDates);
        }
    };

    return { DateConverts: DataUpload };
}