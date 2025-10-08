import styled from "styled-components";
import motion from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface I_FormLayoutProps {
    FormNm: string;
    children: React.ReactNode;
    setStateFn: () => void;
};

const FormsWrapper = styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.8);
`;

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

function FormLayout({FormNm, children, setStateFn}: I_FormLayoutProps){
    return (
        <FormsWrapper>
            <Container>   
                <FormHeaders>
                    <FontAwesomeIcon 
                        icon={faCircleXmark} 
                        onClick={setStateFn}
                    />
                </FormHeaders>
                <FormTitle>{FormNm}</FormTitle>
                {children}
            </Container>
        </FormsWrapper>
    );
};

export default FormLayout;