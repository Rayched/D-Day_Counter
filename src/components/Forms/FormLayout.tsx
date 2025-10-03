import styled from "styled-components";
import motion from "framer-motion";
import { useStore } from "zustand";
import { ShowFormStore } from "../../stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface I_FormLayoutProps {
    FormNm: string;
    children: React.ReactNode;
};

const Container = styled.div`
    width: 400px;
    height: 600px;
    background-color: white;
    border: 2px solid white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormHeaders = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 0px;

    svg {
        color: red;
        width: 25px;
        height: 20px;

        &:hover {
            color: #eb4d4b;
        };
    };
`;

const FormTitle = styled.div`
    width: 90%;
    align-items: center;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 2px solid #bdc3c7;
`;

function FormLayout({FormNm, children}: I_FormLayoutProps){
    const {setShowForms} = useStore(ShowFormStore);

    return (
        <Container>   
            <FormHeaders>
                <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    onClick={() => setShowForms(false)}
                />
            </FormHeaders>
            <FormTitle>{FormNm}</FormTitle>
            {children}
        </Container>
    );
};

export default FormLayout;