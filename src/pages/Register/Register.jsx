import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogin } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Custom_Input } from "../../common/Input/Input";
import { login, register } from "../../service/apiCalls";
import { Custom_Button } from "../../common/Button/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validate } from "../../service/useFul";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorData, setErrorData] = useState({
    nameError: "",
    last_nameError: "",
    dateError: "",
    phoneError: "",
    emailError: "",
    nicknameError: "",
    passwordError: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    last_name: "",
    date: "",
    phone: "",
    email: "",
    nickname: "",
    password: "",
  });
  const [date, setDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );
  const [dateError, setDateError] = useState("");
  const [otherError, setOtherError] = useState("");

  //si tienes token te manda a la pagina de inicio
  const token = useSelector(userDate).credentials;
  const tokenExist = (tokenEx) => {
    if (tokenEx) {
      navigate("/profile_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //chequeo de errores para los inputs
  const checkError = (e) => {
    let error = "";
    error = validate(e.target.name, e.target.value);
    setErrorData((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const showError = (error) => {
    if (error !== "") {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    showError(errorData.nameError);
    showError(errorData.last_nameError);
    showError(errorData.dateError);
    showError(errorData.phoneError);
    showError(errorData.emailError);
    showError(errorData.nicknameError);
    showError(errorData.passwordError);
  }, [errorData]);
  useEffect(() => {
    showError(dateError);
  }, [dateError]);

  useEffect(() => {
    const currentDate = dayjs();
    const inputDate = dayjs(date);

    if (inputDate.isAfter(currentDate)) {
      setDateError("No puedes haber nacido en el futuro... ¿o sí?");
    } else if (currentDate.diff(inputDate, "years") > 100) {
      setDateError("No puedes ser mayor de 100 años... ¿o sí?");
    } else if (currentDate.diff(inputDate, "years") < 16) {
      setDateError("Tienes que ser mayor de 16 años");
    } else {
      setDateError("");
    }
  }, [date]);

  const registerHand = (data) => {
    data.date = `${dayjs(date).format("DD/MM/YYYY")}`;
    data.email = data.email.toLowerCase()
    if (
      errorData.nameError === "" &&
      errorData.last_nameError === "" &&
      errorData.phoneError === "" &&
      errorData.emailError === "" &&
      errorData.nicknameError === "" &&
      errorData.passwordError === "" &&
      dateError === ""
    ) {
      if (
        data.name !== "" &&
        data.last_name !== "" &&
        data.phone !== "" &&
        data.email !== "" &&
        data.nickname !== "" &&
        data.password !== ""
      ) {
        register(data)
          .then(() => {
            const dataToLogin = {
              email: data.email,
              password: data.password,
            };
            login(dataToLogin)
              .then((res) => {
                dispatch(userLogin({ credentials: res.token, user: res.data }));
              })
              .catch(() => {
                navigate("/");
              });
          })
          .catch((err) => {
            setOtherError(err);
          });
      } else {
        showError("Faltan datos");
      }
    } else {
      showError("Hay Errores");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center Container_div_Principal">
      <div className="register_container">
        <Container>
          <Row className="row_file_register flex-wrap justify-content-center">
            <div className="col-md-6 input_options ">
              <label htmlFor="name" className="mb-2">
                Nombre
              </label>
              {errorData.nameError !== "" ? (
                <Custom_Input
                  type="text"
                  name="name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              ) : (
                <Custom_Input
                  type="text"
                  name="name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"input_custom"}
                />
              )}
            </div>
            <div className="col-md-6 input_options">
              <label htmlFor="last_name" className="mb-2">
                Apellidos
              </label>
              {errorData.last_nameError !== "" ? (
                <Custom_Input
                  type="text"
                  name="last_name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              ) : (
                <Custom_Input
                  type="text"
                  name="last_name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"input_custom"}
                />
              )}
            </div>
            <div className="col-md-6 input_options">
              <label htmlFor="date" className="mb-2">
                Fecha de Nacimiento
              </label>
              {dateError !== "" ? (
                <DatePicker
                  className="date_picker_custom date_picker_error"
                  selected={date}
                  name="date"
                  onChange={(date) => setDate(date)}
                />
              ) : (
                <DatePicker
                  className="date_picker_custom date_picker_color"
                  selected={date}
                  name="date"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setDate(date)}
                />
              )}
            </div>
            <div className="col-md-6 input_options">
              <label htmlFor="phone" className="mb-2">
                Telefono
              </label>
              {errorData.phoneError !== "" ? (
                <Custom_Input
                  type="text"
                  name="phone"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              ) : (
                <Custom_Input
                  type="text"
                  name="phone"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"input_custom"}
                />
              )}
            </div>
            <div className="col-md-6 input_options">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              {errorData.emailError !== "" ? (
                <Custom_Input
                  type="text"
                  name="email"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              ) : (
                <Custom_Input
                  type="text"
                  name="email"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"input_custom"}
                />
              )}
            </div>
            <div className="col-md-6 input_options">
              <label htmlFor="nickname" className="mb-2">
                Nombre de Usuario
              </label>
              {errorData.nicknameError !== "" ? (
                <Custom_Input
                  type="text"
                  name="nickname"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              ) : (
                <Custom_Input
                  type="text"
                  name="nickname"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"input_custom"}
                />
              )}
            </div>
            <div className="col-md-6 input_options">
              <label htmlFor="password" className="mb-2">
                Contraseña
              </label>
              {errorData.passwordError !== "" ? (
                <Custom_Input
                  type="password"
                  name="password"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              ) : (
                <Custom_Input
                  type="password"
                  name="password"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"input_custom"}
                />
              )}
            </div>
            <div className="col-md-12 mt-4">
              <Custom_Button
                name={"Registrar"}
                clickHandler={registerHand}
                data={registerData}
              />
            </div>
          </Row>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
