import React from "react";
import { authService, firebaseInstance } from "fBase";

const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newAccount, setNewAccount] = React.useState(true);
  const [error, setError] = React.useState("");

  const onChange = React.useCallback((e) => {
    const { target: {name, value}} = e;
    if(name ==="email"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    }
  }, []);

  const onSubmit = async (e:any) => {
    e.preventDefault(); // submit 시 새로고침 방지
    let data
    try {
      if(newAccount){
        //create account
        data = await authService.createUserWithEmailAndPassword(email, password); // 계정 만들고 로그인도 됨
      } else {
        //log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch(error) {
      setError(error.message); // 에러 발생
    }
  };
  const toggleAccount = () => {setNewAccount(prev => !prev)}
  const onSocialClick = async (e:any) => {
    const {
      target: { name },
    } = e;
    let provider: any;
    if(name === "google"){ 
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github"){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
  <span onClick={toggleAccount}>{newAccount ? "Sign In": "Create Account"}</span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
