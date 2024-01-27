import { userDate } from "../../pages/userSlice";
import { useSelector } from "react-redux";
import { Custom_Button } from "../Button/Button";

export const Custom_Card = ({ user, modify, deleteTo, custom_card , custom_data_card }) => {
  const userLogued = useSelector(userDate).user;
  return (
    <>
      <div className={custom_card}>
        <h1>
          <span className={custom_data_card}>{user.name} {user.last_name}</span>
        </h1>
        {userLogued.role !== "user" && userLogued.role !== "rider" && (
          <h2>id de usuario: <span className={custom_data_card}>{user.id}</span></h2>
        )}
        <hr />
        <h2>fecha de nacimiento: <span className={custom_data_card}>{user.date}</span></h2>
        <h2>telefono: <span className={custom_data_card}>{user.phone}</span></h2>
        <h2>email: <span className={custom_data_card}>{user.email}</span></h2>
        <h2>nombre de usuario: <span className={custom_data_card}>{user.nickname}</span></h2>
        {userLogued.role !== "user" && userLogued.role !== "rider" && (
          <>
            <h2>rol: <span className={custom_data_card}>{user.role}</span></h2>
            <h2>borrado: <span className={custom_data_card}>{user.is_active}</span></h2>
            <h2>confirmado: <span className={custom_data_card}>{user.confirmed}</span></h2>
          </>
        )}
        <hr />
        <Custom_Button name={"modificar"} clickHandler={modify} />
        <Custom_Button name={"borrar"} clickHandler={deleteTo} />
      </div>
    </>
  );
};
