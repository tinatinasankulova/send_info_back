import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import { BASE_URL } from './utilies/general';

function App() {
const [userInfo, setUserInfo] = useState([])

const addHandler = (info) => {
  setUserInfo([...userInfo, info])
}


useEffect( () => {
  fetch(`${BASE_URL}/info.json`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-type': 'application/json'
    }
  })
 .then((response) => response.json)

}, [userInfo])


  return (
    <div className="App">
      <Login  onGet={addHandler}/>
    </div>
  );
}

export default App;
