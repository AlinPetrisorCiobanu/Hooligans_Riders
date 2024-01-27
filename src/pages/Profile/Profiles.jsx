import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate, userLogin } from "../userSlice";
import { getDataUsers } from "../../service/apiCalls";
import { Custom_Pagination } from "../../common/Pagination/Pagination";
import { Custom_Button } from "../../common/Button/Button";
import { Form, Row, Col } from "react-bootstrap";
import "./Profile.scss";
import { Custom_Input } from "../../common/Input/Input";

export const Profiles = () => {
  //declaro constantes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState("");
  const [curent_page, setCurent_Page] = useState(1);
  const [searchData, setSearchData] = useState({
    phone: "",
    email: "",
    nickname: "",
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

  useEffect(() => {
    getDateBBD();
  }, [curent_page]);

  useEffect(() => {
    getDateBBD();
  }, [searchData]);

  const getDateBBD = () => {
    getDataUsers(token, curent_page)
      .then((res) => {
        if (
          searchData.phone === "" &&
          searchData.email === "" &&
          searchData.nickname === ""
        ) {
          setUsers(res.data.data);
          setPages(res.data.last_page);
        } else {
          const filtered = res.data.data.filter((profile) => {
            let phoneMatch = true;
            let emailMatch = true;
            let nicknameMatch = true;

            if (searchData.phone !== "") {
              phoneMatch = profile.phone.includes(searchData.phone);
            }
            if (searchData.email !== "") {
              emailMatch = profile.email
                .toLowerCase()
                .includes(searchData.email);
            }
            if (searchData.nickname !== "") {
              nicknameMatch = profile.nickname.includes(searchData.nickname);
            }

            return phoneMatch && emailMatch && nicknameMatch;
          });

          setUsers(filtered);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setSearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const modify = (id) => {
    dispatch(userLogin({ ID_Perfil_to_modify: id }));
    navigate("/profile_user_edit");
  };
  const deleteTo = (id) => {
    console.log(id);
  };

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

  return (
    <div className="Container_div_Principal">
      <div className="Contianer_div_Profiles">
        <h1 className="text-center m-4">Profiles</h1>
        <div className="shearch_bar_user">
          <div>
            <Form>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="phone">
                  <Form.Label>Telefono</Form.Label>
                  <Custom_Input
                    type="text"
                    name="phone"
                    handler={inputHandler}
                    custom={"input_custom"}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Custom_Input
                    type="text"
                    name="email"
                    handler={inputHandler}
                    custom={"input_custom"}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="nickname">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Custom_Input
                    type="text"
                    name="nickname"
                    handler={inputHandler}
                    custom={"input_custom"}
                  />
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>
        <table className="Table_Profile_Custom">
          <thead>
            <tr className="text-center">
              <th className="border_table">ID</th>
              <th className="border_table">Nombre</th>
              <th className="border_table">Apellidos</th>
              <th className="border_table">Fecha</th>
              <th className="border_table">Teléfono</th>
              <th className="border_table">Email</th>
              <th className="border_table">Usuario</th>
              <th className="border_table">Rol</th>
              <th className="border_table">Borr</th>
              <th className="border_table">Conf</th>
              <th>Modificar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td className="text-center border_table">{user.id}</td>
                  <td className="border_table">{user.name}</td>
                  <td className="border_table">{user.last_name}</td>
                  <td className="border_table">{user.date}</td>
                  <td className="border_table">{user.phone}</td>
                  <td className="border_table">{user.email}</td>
                  <td className="border_table">{user.nickname}</td>
                  <td>{user.role}</td>
                  <td className="text-center border_table">{user.is_active}</td>
                  <td className="text-center border_table">{user.confirmed}</td>
                  <td className="text-center">
                    <Custom_Button
                      name={"modificar"}
                      clickHandler={modify}
                      data={user.id}
                    />
                  </td>
                  <td className="text-center">
                    <Custom_Button
                      name={"borrar"}
                      clickHandler={deleteTo}
                      data={user.id}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="m-4">
          <Custom_Pagination
            pages={pages}
            curent_page={curent_page}
            handlerPages={pagination}
          />
        </div>
      </div>
    </div>
  );
};
