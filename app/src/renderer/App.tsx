/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable promise/always-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Howl } from 'howler';

import Game from './game/Game';

import crownIcon from '../../assets/crown-icon.png';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

enum Status {
  Login = 1,
  Signup = 2,
}

const music = {
  overworld: new Howl({
    src: ['https://assets.codepen.io/21542/howler-demo-bg-music.mp3'],
  }),
};

const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function Homepage() {
  const [status, setStatus] = useState(Status.Login);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateEmail = (e: any) => {
    console.log(e.target.value);
    if (e.target?.value && !e.target.value.match(isValidEmail)) {
      // showNoValidEmail(false);
      toast.error('Please input valid email');
    }
  };

  const validateForm = (): boolean => {
    if (form.password && form.password.length < 6) {
      toast.error('Password must be more than 6 words');
      return false;
    }
    if (form.email && !form.email.match(isValidEmail)) {
      toast.error('Please input valid email');
      return false;
    }
    return true;
  };

  const welcome = () => {
    return (
      <>
        <h1>Welcome {form.name}!</h1>

        <div className="welcome-button-group">
          <button
            className="button-primary"
            style={{
              padding: '10px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.5s',
            }}
            type="button"
            onClick={() => navigate('/play')}
          >
            play!
          </button>
          <button
            className="button-primary"
            style={{
              padding: '10px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.5s',
            }}
            type="button"
            onClick={() => navigate('/top-score')}
          >
            Top Score
          </button>
          <button
            className="button-primary"
            style={{
              padding: '10px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.5s',
            }}
            type="button"
            onClick={() => setIsLogin(false)}
          >
            Log out
          </button>
        </div>
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
          {status === Status.Signup ? (
            <>
              <label htmlFor="name">Name</label>
              <input
                onChange={(e: any) => {
                  e.preventDefault();
                  setForm({ ...form, name: e.target.value });
                }}
                title="name"
                name="name"
                type="text"
              />
            </>
          ) : null}

          <label htmlFor="Email">Email</label>
          <input
            onChange={(e: any) => {
              e.preventDefault();
              setForm({ ...form, email: e.target.value });
            }}
            title="Email"
            name="Email"
            type="email"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={(e: any) =>
              setForm({ ...form, password: e.target.value })
            }
            title="password"
            name="password"
            type="password"
          />
        </form>

        <div
          className="button-group"
          style={{ marginTop: '10px', columnGap: '10px', display: 'flex' }}
        >
          <button
            type="button"
            onClick={() => {
              // if (status === Status.Login) {
              //   if (validateForm() === false) return;
              //   // api regis account
              //   axios
              //     .post(
              //       'https://snake-api-22730036.herokuapp.com/api/users/auth/login',
              //       { email: form.email, password: form.password }
              //     )
              //     .then((response) => {
              //       console.log(response);
              //       if (response.status === 201) {
              //         setIsLogin(true);
              //         toast.success('Log in success');
              //       }
              //     })
              //     .catch((error) => {
              //       console.log(error);
              //       toast.error('Something went wrong!');
              //     });
              // } else if (status === Status.Signup) {
              //   setStatus(Status.Login);
              // }
              setIsLogin(true);
            }}
          >
            {status === Status.Signup ? 'Back' : 'Log in'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (status === Status.Signup) {
                // api regis account
                axios
                  .post(
                    'https://snake-api-22730036-pke9.vercel.app/api/users/auth/create',
                    form
                  )
                  .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                      toast.success('Sign up success');
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    toast.error('Something went wrong!');
                  });
              } else if (status === Status.Login) {
                setStatus(Status.Signup);
              }
            }}
          >
            Sign up
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="homepage-container">{isLogin ? welcome() : signIn()}</div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

function Playground() {
  const navigate = useNavigate();

  // init sound
  // music.overworld.play();
  return (
    <div className="playground-container">
      <h1>Playground</h1>
      <Game />
    </div>
  );
}

const mockScore = [
  { name: 'Long', score: '100' },
  { name: 'Tai', score: '110' },
  { name: 'Khang', score: '120' },
  { name: 'Khanh', score: '130' },
  { name: 'Hien', score: '140' },
];

function TopScore() {
  const navigate = useNavigate();
  return (
    <div className="playground-container">
      <h1>Top score</h1>
      <ul className="score-list">
        {mockScore.map((e, index) => (
          <li key={index}>
            {index === 0 ? (
              <span style={{ marginLeft: '-30px', marginTop: '-3px' }}>
                <img
                  style={{ width: '20px', height: '20px' }}
                  src={crownIcon}
                  alt="crown-icon"
                />
              </span>
            ) : null}

            <span className="first-span">{index + 1}</span>
            <span className="second-span">{e.name}</span>
            <span>{e.score}</span>
          </li>
        ))}
      </ul>
      <button
        style={{ marginTop: '30px' }}
        className="button-primary"
        type="button"
        onClick={() => navigate('/')}
      >
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
        <Route path="/top-score" element={<TopScore />} />
      </Routes>
    </Router>
  );
}
