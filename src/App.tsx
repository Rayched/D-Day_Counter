import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDateStore } from './store';
import Home from './Components/Home';

export interface I_Forms {
  TargetDt?: string;
  Titles?: string;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titles = styled.header`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
`;

function App() {
  const {register, handleSubmit, setValue} = useForm();
  const {AddDate, ConvertDates} = useDateStore();

  const onValid = ({TargetDt, Titles}: I_Forms) => {
    if(TargetDt === "" || Titles === ""){
      return;
    } else {
      AddDate({TargetDt, Titles});
    }
    setValue("TargetDt", "");
    setValue("Titles", "");
  };

  const Outputs = ConvertDates();

  return (
    <Wrapper>
      <Titles>D-Day 카운터</Titles>
      <Home />
    </Wrapper>
  );
};

export default App;

/**
 * <InputForm onSubmit={handleSubmit(onValid)}>
        일정 내용: <input type='text' {...register("Titles", {required: true})} />
        기준 일: <input type='date' {...register("TargetDt", {required: true})}/>
        <button>추가</button>
      </InputForm>
      <ul>
        {
          Outputs.map((data) => {
            return (
              <li>
                <span>{data.Titles} / {`(Id: ${data.DateId})`}</span>
                <div>{data.DiffDays} {`(기준 일: ${data.TargetDt})`}</div>
              </li>
            );
          })
        }
      </ul>
 */