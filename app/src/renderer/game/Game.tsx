/* eslint-disable no-empty-pattern */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from '../canvas/Canvas';
import draw from '../draw/draw';
import { GameWrapper, Score } from './Game.styles';
import ModalGameOver from './ModalGameOver';
import useGameLogic from './useGameLogic';
import scoreIcon from '../../../assets/reward.png';
import axios from 'axios';

interface GameProps {
  userId: string;
  token: string;
}

export enum GameState {
  RUNNING,
  GAME_OVER,
  PAUSED,
}

const Game: React.FC<GameProps> = ({ userId, token }) => {
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);
  const [openModalOver, setOpenModalOver] = useState<boolean>(false);

  const onGameOver = () => {
    axios
      .post(
        `http://localhost:5000/api/scores/${userId}/add`,
        { score: snakeBody.length },
        {
          headers: { 'Content-Type': 'application/json', Authorization: token },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setGameState(GameState.GAME_OVER);
  };

  const { snakeBody, onKeyDownHandler, foodPosition, resetGameState } =
    useGameLogic({
      canvasHeight: 150,
      canvasWidth: 300,
      onGameOver,
      gameState,
      setOpenModalOver,
    });

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    draw({ ctx, snakeBody, foodPosition });
  };

  const playAgain = () => {
    setGameState(GameState.RUNNING);
    resetGameState();
    setOpenModalOver(false);
  };

  return (
    <>
      <GameWrapper tabIndex={0} onKeyDown={onKeyDownHandler}>
        <Score>
          <img src={scoreIcon} alt="score-icon" />

          {snakeBody.length - 1}
        </Score>
        <Canvas ref={canvasRef} draw={drawGame} />
        <div>
          {gameState === GameState.GAME_OVER ? (
            <button
              style={{ marginTop: '20px' }}
              className="button-primary"
              type="button"
              onClick={playAgain}
            >
              Play Again
            </button>
          ) : (
            <button
              style={{ marginTop: '20px' }}
              className="button-primary"
              type="button"
              onClick={() => {
                setGameState(
                  gameState === GameState.RUNNING
                    ? GameState.PAUSED
                    : GameState.RUNNING
                );
              }}
            >
              {gameState === GameState.RUNNING ? 'pause' : 'play'}
            </button>
          )}
          <button
            style={{ marginTop: '20px', marginLeft: '20px' }}
            className="button-primary"
            type="button"
            onClick={() => navigate('/')}
          >
            home
          </button>
        </div>
      </GameWrapper>
      {openModalOver && <ModalGameOver playAgain={playAgain} />}
    </>
  );
};

export default Game;
