import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

export const Text = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: black;
  text-decoration: none;
  margin: 0;
`;

export const ShadowDiv = styled.div`
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
  padding: 20px;
  border-top: 4px solid #222;
  border-radius: 10px;
`;

export const Box = styled.div`
  border-radius: 10px;
  padding: 30px;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  margin: 20px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  background-color: #222;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
`;
