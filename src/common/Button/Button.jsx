import "./Button.scss"

export const Custom_Button = ({ name, clickHandler, data }) => {
  return (
    <>
      <button className="custom_button" onClick={() => clickHandler(data)}>{name}</button>
    </>
  );
};
