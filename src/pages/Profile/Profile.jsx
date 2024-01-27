import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate, userLogin, userLogout } from "../userSlice";
import { Custom_Card } from "../../common/Card/Card";
import { Custom_Modal } from "../../common/Modal/Modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../service/apiCalls";
import "./Profile.scss";

export const Profile = () => {
  //declaro constantes
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const [modalShow, setModalShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  const modify = () => {
    dispatch(userLogin({ ID_Perfil_to_modify: "" }));
    navigate("/profile_user_edit")
  };
  const deleteTo = () => {
    setModalShow(true);
  };
  useEffect(() => {
    if(confirm === true){
      deleteUser(token)
        .then(() => {
          setModalShow(false)
          dispatch(userLogout({ credentials: "" }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [confirm]);
console.log(user)
  return (
    <>
      <Custom_Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirm={() => setConfirm(true)}
      />

      <div className="Container_div_Principal d-flex justify-content-center align-items-center text-center">
        <div className="container_card">
          <Custom_Card
            user={user}
            modify={modify}
            deleteTo={deleteTo}
            custom_card={"custom_card"}
            custom_data_card={"custom_data_card"}
          />
        </div>
      </div>
    </>
  );
};
