import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  text-align: center;
  padding: 20px;
  animation: fadeIn 0.4s ease;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Image = styled.img`
  width: 320px;
  max-width: 90%;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    width: 220px;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  color: #282c3f;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #686b77;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 0 10px;
  }
`;

const Button = styled.button`
  margin-top: 25px;
  padding: 12px 24px;
  background: #20bd99;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #20bd99;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;

import { useNavigate } from "react-router-dom";
import notFoundImg from "../assets/images/404.svg";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Image src={notFoundImg} alt="Page not found" />

      <Title>404</Title>
      <Subtitle>
        Oops! The page you’re looking for doesn’t exist.
      </Subtitle>

      <Button onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Container>
  );
}