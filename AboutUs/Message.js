import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './AboutUs.css';
import AuthContext from '../../context/AuthContext';
import Axios from 'axios';

export default function Message() {
  const [user, setUser] = useState(null);
  const [userMsg, setUserMsg] = useState({
    userName: '',
    email: '',
    topic: 'Enquiry',
    message: '',
  });
  const { token } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const authStr = 'Bearer ' + token;
      try {
        const result = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + '/users/getUserByLoginToken',
          {
            headers: { Authorization: authStr },
          }
        );
        setUser(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    token && fetchUser();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserMsg((prevEx) => {
      return {
        ...prevEx,
        [name]: value,
      };
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (user) {
      userMsg.userName = user.fname + ' ' + user.lname;
      userMsg.email = user.email;
    }
    try {
      await Axios.post(
        process.env.REACT_APP_BACKEND_URL + '/users/message',
        userMsg
      );
      history.push('/');
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  return (
    <div className='container'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb p-2'>
          <li className='breadcrumb-item'>
            <a href='/'>Home</a>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Message
          </li>
        </ol>
      </nav>

      <div className='p-3 my-3 note-style'>
        <h3>Message to True Tea</h3>
        <form onSubmit={handleSubmit}>
          <div className='form'>
            <label htmlFor='input-name'>Name: </label>
            {user === null ? (
              <input
                type='text'
                required
                className='form-control'
                id='input-name'
                name='userName'
                value={userMsg.userName}
                onChange={handleChange}
                placeholder='John Smith'
              />
            ) : (
              <input
                type='text'
                disabled
                className='form-control'
                id='input-name'
                name='userName'
                value={user.fname + ' ' + user.lname}
              />
            )}
          </div>
          <div className='form'>
            <label htmlFor='exampleFormControlInput1'>From email: </label>
            {user === null ? (
              <input
                type='email'
                required
                className='form-control'
                id='exampleFormControlInput1'
                name='email'
                value={userMsg.email}
                onChange={handleChange}
                placeholder='name@example.com'
              />
            ) : (
              <input
                type='email'
                disabled
                className='form-control'
                id='exampleFormControlInput1'
                name='email'
                value={user.email}
              />
            )}
          </div>
          <div className='form'>
            <label htmlFor='exampleFormControlSelect1'>Select a Topic: </label>
            <select
              className='form-select'
              id='exampleFormControlSelect1'
              defaultValue='Enquiry'
              name='topic'
              onChange={handleChange}
            >
              <option>Enquiry</option>
              <option>Information</option>
              <option>Buy</option>
              <option>Price</option>
              <option>Other</option>
            </select>
          </div>
          <hr />

          <div className='form'>
            <label htmlFor='exampleFormControlTextarea1'>Message: </label>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              required
              rows='5'
              name='message'
              value={userMsg.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <hr />
          <div>
            <button className='btn btn-success' type='submit'>
              Send to True Tea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
