import { motion } from "framer-motion";
import styled from "styled-components";

const InputLayoutContainer = styled(motion.div)`
    width: 90%;
    height: 90%;
`;

const InputLayoutVariants = {
    "initial": { y: 10, opacity: 0 },
    "animate": { y: 0, opacity: 1},
    "exit": {y: -10, opacity: 0}
};

export default function InputLayout({children}: {children: React.ReactNode}){
    return (
        <InputLayoutContainer
            variants={InputLayoutVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.2, delay: 0.3}}
        >
            {children}
        </InputLayoutContainer>
    );
};