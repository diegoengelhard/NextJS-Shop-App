import styled from 'styled-components'; 

export const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

export const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Price = styled.span`
  font-size: 1.4rem;
`;

export const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  height: 50vh;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5em;
`;

export const Container = styled.div`
    padding: 40px 0;
    font-family: 'Poppins', sans-serif;
`;

export const Heading = styled.h2`
    font-size: 32px;
    font-weight: 500;
    padding-top: 10px;
    padding-bottom: 15px;
`;

export const ProductName = styled.div`
    font-size: 22px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 4px;
`;

export const PriceDiscount = styled.div`
    font-size: 22px;
    font-weight: 400;
    padding: 10px 0;
    clear: both;

    span.line-through {
        text-decoration: line-through;
        margin-left: 10px;
        font-size: 14px;
        vertical-align: middle;
        color: #a5a5a5;
    }
`;

export const FormControl = styled.div`
    font-size: 15px;
`;

export const RoundBlackBtn = styled.a`
    border-radius: 4px;
    background: #212529;
    color: #fff;
    padding: 7px 45px;
    display: inline-block;
    margin-top: 20px;
    border: solid 2px #212529;
    transition: all 0.5s ease-in-out 0s;

    &:hover,
    &:focus {
        background: transparent;
        color: #212529;
        text-decoration: none;
    }
`;

export const SliderContainer = styled.div`
    .owl-carousel {
        // Add your slider styles here
    }

    .owl-carousel .item img {
        height: 300px; // Adjust the height as per your requirement
        width: auto;
        display: block;
        margin: 0 auto;
    }
`;

export const ThumbnailContainer = styled.div`
    .owl-carousel {
        // Add your thumbnail slider styles here
    }

    .owl-carousel .item img {
        height: 100px; // Adjust the height as per your requirement
        width: auto;
        display: flex;
        margin: 0 auto;
    }
`;

export const ProductInfo = styled.div`
    font-weight: 400;
`;  

export const Flex = styled.div`
    display: flex;
    gap: 20px;
`;

export const Carousel = styled.div``;
