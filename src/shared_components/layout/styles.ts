import styled from "styled-components";

export const StyledContent = styled.div`
    flex: 1;
    padding: 24px 32px;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    background-color: #f8f9fc;
`;

export const StyledHeader = styled.header`
    display: flex;
    position: fixed;
    top: 0;
    z-index: 50;
    width: 100%;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
`;

export const StyledFooter = styled.footer``;