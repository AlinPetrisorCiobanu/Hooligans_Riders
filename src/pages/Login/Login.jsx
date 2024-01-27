import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataUser, login } from "../../service/apiCalls";
import { userDate, userLogin } from "../userSlice";
import { Custom_Input } from "../../common/Input/Input";
import { Custom_Button } from "../../common/Button/Button";
import "./Login.scss";

export const Login = () => {
  //declaro constantes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    nickname: "",
    password: "",
  });
  const [nicknameOrEmail, setNicknameOrEmail] = useState(1);

  //si tienes token te manda a la pagina de inicio
  const token = useSelector(userDate).credentials;
  const tokenExist = (tokenEx) => {
    if (tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  const checkEmail = () => {
    if (nicknameOrEmail === 1) {
      setNicknameOrEmail(0);
    } else {
      setNicknameOrEmail(1);
    }
  };

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //comprueba en la base de datos si email o nickname y pass estan bien y guardo el token en redux
  const loginHand = (data) => {
    if (data.nickname !== "" || data.email !== "" || data.password !== "") {
      let dataToSend = {};
      if (nicknameOrEmail === 1) {
        dataToSend = {
          nickname: data.nickname,
          password: data.password,
        };
      } else {
        dataToSend = {
          email: data.email,
          password: data.password,
        };
      }
      login(dataToSend)
        .then((res) => {
          const token = res.token;
          if(!token){
            console.log("su cuenta ha sido borrada")
          }else{
            getDataUser(token)
              .then((data) => {
                  dispatch(userLogin({ credentials: token, user: data.data }));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Error: campos vacíos");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center Container_div_Principal">
    <div className="login_container">
      <h1>Login</h1>
      <hr />
      {loginData.nickname || loginData.email ? (
        <div></div>
      ) : (
        <div>
          <input
            type="checkbox"
            name="checkEmail"
            onChange={() => checkEmail()}
          />
          <label className="m-3" htmlFor="checkEmail">iniciar sesion con email</label>
        </div>
      )}

      {nicknameOrEmail === 1 ? (
        <div>
          <label htmlFor="nickname">Nombre de Usuario</label>
          <Custom_Input type="text" name="nickname" handler={inputHandler} custom={"input_custom"}/>
        </div>
      ) : (
        <div>
          <label htmlFor="email">Email</label>
          <Custom_Input type="text" name="email" handler={inputHandler} custom={"input_custom"}/>
        </div>
      )}
      <div>
        <label htmlFor="password">Contraseña</label>
        <Custom_Input type="password" name="password" handler={inputHandler} custom={"input_custom"}/>
      </div>
      <div>
        <Custom_Button name={"Login"} clickHandler={loginHand} data={loginData}/>
      </div>
    </div>
    </div>
  );
};
