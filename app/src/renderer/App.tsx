/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import Game from './game/Game';

import './App.scss';

function Homepage() {
  const [name, setName] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  const welcome = () => {
    return (
      <>
        <h1>{name}</h1>

        <button type="button" onClick={() => navigate('/play')}>
          play!
        </button>
      </>
    );
  };

  const signIn = () => {
    return (
      <>
        <form
          className="form-login"
          action="submit"
          style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}
        >
          <label htmlFor="userName">User Name</label>
          <input
            onChange={(e: any) => {
              e.preventDefault();
              setName(e.target.value);
            }}
            title="userName"
            name="username"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input title="password" name="password" type="text" />
        </form>
        <div
          className="button-group"
          style={{ marginTop: '10px', columnGap: '10px', display: 'flex' }}
        >
          <button
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Log in
          </button>
          <button>Sign up</button>
        </div>
      </>
    );
  };

  return (
    <div className="homepage-container">{isLogin ? welcome() : signIn()}</div>
  );
}

function Playground() {
  const navigate = useNavigate();
  return (
    <div className="playground-container">
      <h1>Playground</h1>
      <Game />
      <button type="button" onClick={() => navigate('/')}>
        Back to home!
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/play" element={<Playground />} />
      </Routes>
    </Router>
  );
}
