import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import {
  addParticipant,
  getEvents,
  removeParticipant,
} from "../../service/apiCalls";
import { Custom_Pagination } from "../../common/Pagination/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Custom_Button } from "../../common/Button/Button";
import "./Events.scss";
import dayjs from "dayjs";

export const Events_Page = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const userData = useSelector(userDate).user;
  const [events, setEvents] = useState([]);
  const [pages, setPages] = useState("");
  const [curent_page, setCurent_Page] = useState(1);
  const [participants, setParticipants] = useState(1);

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/login_user");
    }
  };

  useEffect(() => {
    tokenExist(token);
  }, [token]);

  useEffect(() => {
    getEvents_useEffect()
  }, [curent_page]);

  useEffect(() => {
    getEvents_useEffect()
  }, [participants]);

  const getEvents_useEffect = () => {
    getEvents(token, curent_page)
      .then((res) => {
        setEvents(res.docs);
        setPages(res.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  const getInHand = (id) => {
    addParticipant(token, id)
      .then((res) => {
        setParticipants("a")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOutHand = (id) => {
    
    removeParticipant(token, id)
      .then((res) => {
        setParticipants("b")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Container_div_Principal">
      <div className="container_events">
        {events.map((event) => {
          return (
            <div key={event._id} className="card_event">
              <h1 className="text-center">Evento : {event.name}</h1>
              <h2 className="text-center">
                El {`${dayjs(event.date).format("DD-MM-YYYY")}`} a las {event.hour} en{" "}
                {event.maps}
              </h2>
              <Container>
                <Row>
                  <Col>
                    <div className="image_event">
                      {event.img ? (
                        <img src={event.img} alt="imagen database" />
                      ) : (
                        <img
                          src="ruta/a/imagen/default.jpg"
                          alt="imagen por defecto"
                        />
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <h2>{event.maps}</h2>
                      <h2>{event.data}</h2>
                      <h2>Detalles : {event.details}</h2>
                      <h2>Numero de participantes : {event.participants}</h2>
                      <h2>
                        Evento activo : {event.is_active === true ? "Si" : "No"}
                      </h2>

                      <div>
                        {event.participants_ids.includes(userData._id) ? (
                          <h2>Apuntado: Si</h2>
                        ) : (
                          <h2> Apuntado: No </h2>
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                    {event.participants_ids.includes(userData._id) ? (
                      <Custom_Button
                        name={"Desapuntarme"}
                        clickHandler={getOutHand}
                        data={event._id}
                      />
                    ) : (
                      <Custom_Button
                        name={"Apuntarme"}
                        clickHandler={getInHand}
                        data={event._id}
                      />
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })}
        <Custom_Pagination
          pages={pages}
          curent_page={curent_page}
          handlerPages={pagination}
        />
      </div>
    </div>
  );
};
