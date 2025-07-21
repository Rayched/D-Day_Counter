import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { I_Days, useDayCountStore } from './store';
import useDateConvert from './useDateConvert';

export interface I_Forms {
  TargetDt?: string;
  Titles?: string;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
`;

function App() {
  const {DayCounters} = useDayCountStore();
  const {DateConverts} = useDateConvert();
  const {register, handleSubmit, setValue} = useForm();

  const onValid = ({TargetDt, Titles}: I_Forms) => {
    if(TargetDt === "" || Titles === ""){
      return;
    } else {
      DateConverts({TargetDt, Titles});
    }
    setValue("TargetDt", "");
    setValue("Titles", "");
  };

  return (
    <Wrapper>
      <InputForm onSubmit={handleSubmit(onValid)}>
        일정 내용: <input type='text' {...register("Titles", {required: true})} />
        기준 일: <input type='date' {...register("TargetDt", {required: true})}/>
        <button>추가</button>
      </InputForm>
      <ul>
        {
          DayCounters.map((data) => {
            return (
              <li>
                <span>{data.Titles} / {`(Id: ${data.Id})`}</span>
                <div>{data.DayInfos} {`(기준 일: ${data.TargetDt})`}</div>
              </li>
            );
          })
        }
      </ul>
    </Wrapper>
  );
};

export default App;