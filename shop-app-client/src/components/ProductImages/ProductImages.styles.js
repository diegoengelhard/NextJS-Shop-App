import styled from 'styled-components';

// Styled components definitions
export const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;

export const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
`;

export const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
        border-color: #ccc;
    ` : `
        border-color: transparent;
    `}
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
`;

export const BigImageWrapper = styled.div`
    text-align: center;
`;
