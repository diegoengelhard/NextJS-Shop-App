import styled from 'styled-components';

export const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  
  div:nth-child(1) {
    order: 2;
  }
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    
    div:nth-child(1) {
      order: 0;
    }
    
    img {
      max-width: 100%;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
