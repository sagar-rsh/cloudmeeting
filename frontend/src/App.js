import React from 'react';
import './App.css';
import Sidebar from './components/dashboard/Sidebar';
import Chat from './components/dashboard/Chat';
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './components/dashboard/firebase';
import { login, logout } from './features/userSlice'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './components/whiteboard/container/Container';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {

      console.log(authUser)

      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  console.log(user)

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>

      ) : (
          <Login />
        )}
      <BrowserRouter>
        <Switch>
          <Route path="/whiteboard">
            <Container />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;