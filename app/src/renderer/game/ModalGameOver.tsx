import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  background-color: black;
  z-index: 100;
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  z-index: 101;
  background: rgb(238, 174, 202);
  /* background-color: white; */
  border-radius: 20px;
  opacity: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);

  flex-direction: column;

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

interface Props {
  playAgain: () => void;
}

function ModalGameOver({ playAgain }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <Backdrop />
      <Container>
        <h3>You lose!</h3>
        <div className="button-group">
          <button type="button" onClick={() => navigate('/')}>
            Home
          </button>
          <button type="button" onClick={playAgain}>
            Play Again
          </button>
          <button type="button" onClick={() => navigate('/top-score')}>
            Top Score
          </button>
        </div>
      </Container>
    </>
  );
}

export default ModalGameOver;
