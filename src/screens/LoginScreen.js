import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Action/userActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import Toast from "../components/LoadingError/Toast";
import { useNavigate} from 'react-router-dom'; 

const Login = ({history}) => {
  
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
const dispatch = useDispatch(); 

const navigate = useNavigate();
const userLogin = useSelector((state) =>state.userLogin)
const {error, loading, userInfo} = userLogin;

useEffect(() =>{
  if(userInfo){
 
  navigate("/HomeScreen");
  }
},[ userInfo,navigate])

  const submitHandler = (e) =>{
    e.preventDefault();
   dispatch(login(email,password));
  }
  return (
    <>
    <Toast/>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
        {error &&  <Message variant="alert-danger">{"Mot de passe ne pas correct"}</Message>}
        {loading && <Loading/> }

          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form   onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
