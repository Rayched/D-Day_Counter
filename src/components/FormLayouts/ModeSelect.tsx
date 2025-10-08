import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .AddBtn {
        border-top-left-radius: 10px;
    };

    .DelBtn {
        border-top-right-radius: 10px;
    };
`;



export default function ModeSelect({children}: {children: React.ReactNode}){
    return (
        <Container>{children}</Container>
    );
}