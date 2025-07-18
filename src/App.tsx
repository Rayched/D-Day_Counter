import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { I_Days, useDayCountStore } from './store';
import { DatesConvert } from './DayCounters';

export interface I_Forms {
  TargetDt?: string;
  DaysInfo?: string;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
`;

function App() {
  const {DayCounters, setDayCounters} = useDayCountStore();
  const {register, handleSubmit, setValue} = useForm();

  const onValid = ({TargetDt, DaysInfo}: I_Forms) => {
    if(TargetDt === ""){
      return;
    } else {
      const newDays = DatesConvert({TargetDt, DaysInfo}) as I_Days;
      setDayCounters(newDays);
    }
    setValue("TargetDt", "");
    setValue("DaysInfo", "");
  }

  return (
    <Wrapper>
      <InputForm onSubmit={handleSubmit(onValid)}>
        일정 내용: <input type='text' {...register("DaysInfo", {required: true})} />
        기준 일: <input type='date' {...register("TargetDt", {required: true})}/>
        <button>추가</button>
      </InputForm>
      <ul>
        {
          DayCounters.map((data) => {
            return (
              <li>
                <div>{data.DaysInfo} / {data.DiffDays}</div>
                <div>{`(기준 일: ${data.TargetDt})`}</div>
              </li>
            );
          })
        }
      </ul>
    </Wrapper>
  );
};

export default App;