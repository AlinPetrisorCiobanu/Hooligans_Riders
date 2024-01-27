import { Custom_Button } from "../../common/Button/Button";
import { Custom_Input } from "../../common/Input/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { Custom_Pagination } from "../../common/Pagination/Pagination";
import {deleteMessages,getAllMessage,newMessage} from "../../service/apiCalls";
import "./Contacto.scss"

export const Contacto = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const [newMessageData, setNewMessageData] = useState({
    name: "",
    last_name: "",
    data: "",
    message: "",
  });
  const user = useSelector(userDate).user;
  const [messages, setMessages] = useState([]);
  const [pages, setPages] = useState("");
  const [curent_page, setCurent_Page] = useState(1);

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setNewMessageData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewMessage = (data) => {
    newMessage(token, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //sacar todos los mensajes

  useEffect(() => {
    getAllMessage(token, curent_page)
      .then((res) => {
        setMessages(res.data);
        setPages(res.last_page);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [curent_page]);

  const pagination = (data) => {
    const cont = curent_page;
    if (data === "first_page") {
      setCurent_Page(1);
    } else if (data === "prev") {
      setCurent_Page(cont - 1);
    } else if (data === "next") {
      setCurent_Page(cont + 1);
    } else if (data === "last_page") {
      setCurent_Page(cont + 1);
    } else {
      setCurent_Page(data);
    }
  };

  //metodo para borrar mensajes
  const deleteMessage = (id) => {
    deleteMessages(token, id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Container_div_Principal">
      <div className="container_div_contact">
        {user.role === "user" || user.role === "rider" ? (
          <div className="div_contact">
            <div>
              <label htmlFor="name">Nombre</label>
              <Custom_Input type="text" name="name" handler={inputHandler} />
            </div>
            <div>
              <label htmlFor="last_name">Apellidos</label>
              <Custom_Input
                type="text"
                name="last_name"
                handler={inputHandler}
              />
            </div>
            <div>
              <label htmlFor="data">Detalle</label>
              <Custom_Input type="text" name="data" handler={inputHandler} />
            </div>
            <div>
              <label htmlFor="message">Mensaje</label>
              <Custom_Input type="text" name="message" handler={inputHandler} />
            </div>
            <div>
              <Custom_Button
                name={"Enviar"}
                clickHandler={createNewMessage}
                data={newMessageData}
              />
            </div>
          </div>
        ) : (
          <div>
            {messages.map((mess) => {
              return (
                <div key={mess.id} className="div_contact" >
                  <h1>{mess.name}</h1>
                  <h2>{mess.id}</h2>
                  <h3>{mess.last_name}</h3>
                  <h3>{mess.data}</h3>
                  <h3>{mess.message}</h3>
                  <div>
                    <Custom_Button
                      name={"Borrar"}
                      clickHandler={deleteMessage}
                      data={mess.id}
                    />
                  </div>
                  <hr />
                </div>
              );
            })}
            <Custom_Pagination
              pages={pages}
              curent_page={curent_page}
              handlerPages={pagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};
