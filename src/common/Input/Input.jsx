import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const Custom_Input = ({
  name,
  type,
  pat,
  handler,
  handlerError,
  defaultValue,
  custom
}) => {
  return (
    <>
        <InputGroup className="mb-3 custom_input">
          <Form.Control
            type={type}
            placeholder={""}
            name={name}
            pattern={pat}
            onChange={handler}
            onBlur={handlerError}
            value={defaultValue}
            className={custom}
            maxLength={50}
          />
        </InputGroup>
    </>
  );
};
