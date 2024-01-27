import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate } from "../userSlice";
import { Custom_Input } from "../../common/Input/Input";
import { createNewEvent } from "../../service/apiCalls";
import { Custom_Button } from "../../common/Button/Button";
import "./Events.scss"

export const Creator_Events = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const [newEventData, setNewEventData] = useState({
    date: "",
    kms: "",
    img: "",
    maps: "",
  });

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx || user.role === "user" || user.role === "rider") {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setNewEventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createEventHand = (data) => {
    createNewEvent(token , data)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div className="Container_div_Principal">
        <div className="container_events_options">
        <div>
          <label htmlFor="date">Fecha</label>
          <Custom_Input type="text" name="date" handler={inputHandler} />
        </div>
        <div>
          <label htmlFor="kms">Kilometros aproximados</label>
          <Custom_Input type="text" name="kms" handler={inputHandler} />
        </div>
        <div>
          <label htmlFor="img">Imagen de la zona</label>
          <Custom_Input type="text" name="img" handler={inputHandler} />
        </div>
        <div>
          <label htmlFor="maps">Mapa</label>
          <Custom_Input type="text" name="maps" handler={inputHandler} />
        </div>
        <div>
          <Custom_Button
            name={"Crear Evento"}
            clickHandler={createEventHand}
            data={newEventData}
          />
        </div>
        </div>

    </div>
  );
};
