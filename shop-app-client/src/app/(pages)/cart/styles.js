import styled from 'styled-components';

export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }

  gap: 40px;
  margin-top: 40px;
`;

export const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

export const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

export const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;

  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

export const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
