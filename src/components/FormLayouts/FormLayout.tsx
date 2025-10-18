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
    position: absolute;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
`;

const Container = styled.div`
    width: 380px;
    height: 550px;
    background-color: ${(props) => props.theme.FormBgColor};
    border: 2px solid ${(props) => props.theme.FormBgColor};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
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
    color: ${(props) => props.theme.TextColor};
`;

const FormBodys = styled.div`
    width: 96%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
                <FormBodys>
                    {children}
                </FormBodys>
            </Container>
        </FormsWrapper>
    );
};

export default FormLayout;