import { useEffect, useState } from "react";
import style from "./Login.module.css";
import Button from "./ui/Button";
import Card from "./ui/Card";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("Field 'name' must not be empty");
  const [errorEmail, setErrorEmail] = useState(
    "Field 'e-mail' must not be empty"
  );
  const [errorPassword, setErrorPassword] = useState(
    "Field 'password' must not be empty"
  );
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
     if(errorName || errorEmail || errorPassword) {
        setFormIsValid(false)
     } else {
      setFormIsValid(true)
     }
  }, [errorName, errorEmail, errorPassword])


 const blurHandler = (e) => {
  switch (e.target.name) {
    case 'name' :
      setNameIsValid(true)
      break
    case 'email':
      setEmailIsValid(true)
      break
    case 'password':
      setPasswordIsValid(true)
    break    
  }
 }


  const nameChangeHandler = (event) => {
    setName(event.target.value);
    const validNameRegex = /[0-9]/
    if(!validNameRegex.test(event.target.value)){
      setErrorName('username must have digits')
    } else {
      setErrorName('')
    }
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      
   if(!validEmailRegex.test(event.target.value)) {
      setErrorEmail('e-mail is not valid')
   } else {
    setErrorEmail('')
   }
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    if(event.target.value.length < 5 || event.target.value.length > 5) {
      setErrorPassword('password must contain 5 characters')
    } else {
      setErrorPassword('')
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      name:name,
      email: email,
      password: (password.split('').reverse().join('') + password[0] + password[1])
    }
    
    console.log(data);
  
  
  };

  return (
    <Card className={style.login}>
      <form onSubmit={submitHandler}>
        <div className={style.control}>
          <label htmlFor="name">User Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => nameChangeHandler(e)}
            value={name}
            onBlur={(e) => blurHandler(e)}
          />
          {(nameIsValid && errorName) && (
            <label style={{ color: "red" }}>{errorName}</label>
          )}
        </div>
        <div className={style.control}>
          <label htmlFor="email">E-mail :</label>
          <input 
          type="email" 
          name="email"
          onChange={(e) => emailChangeHandler(e)} 
          value={email}
          onBlur={(e) => blurHandler(e) }
          />
          {(emailIsValid && errorEmail) && (
            <label style={{ color: "red" }}>{errorEmail}</label>
          )}
        </div>
        <div className={style.control}>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => passwordChangeHandler(e)}
            value={password}
            onBlur={(e) => blurHandler(e) }
          />
          {(passwordIsValid && errorPassword) && (
            <label style={{ color: "red" }}>{errorPassword}</label>
          )}
        </div>
        <div className={style.actions}>
          <Button disabled={!formIsValid}>Sign up</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
