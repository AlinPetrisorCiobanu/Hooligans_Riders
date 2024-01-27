import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { useNavigate } from "react-router-dom";

import "./Home.scss";

export const Home = () => {
  const navigate = useNavigate();
  const userData = useSelector(userDate).user;
  const name = userData.name;
  const token = useSelector(userDate).credentials;

  const login_user = () => {
    navigate("/login_user")
  }
  return (
    <div className="Container_div_Home">
      {token ? (
        <Container fluid className="container-background-home">
          <Container fluid className="container-background-black"></Container>
          <Container className="text-center container-home">
            <Row className="mt-5">
              <Col className="login_home">
                <h1>Hooligans~Riders</h1>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Row>
                  <h1>Bienvenido</h1>
                </Row>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Row>
                  <h1>{name}</h1>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      ) : (
        <Container fluid className="container-background-home">
          <Container fluid className="container-background-black"></Container>
          <Container className="text-center container-home">
            <Row className="mt-5">
              <Col className="login_home">
                <h1>Hooligans~Riders</h1>
                <Button
                  className="button_custom mt-5 mb-5"
                  onClick={login_user}
                >
                  Login
                </Button>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Row>
                  <Col>
                    <Button
                      className="button_custom"
                      href="https://www.facebook.com/groups/460968801996657"
                      target="blank"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="button_custom"
                      href="https://www.instagram.com/hooligan.riders/"
                      target="blank"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="button_custom"
                      href="https://www.tiktok.com/@hooligan.rider"
                      target="blank"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button className="button_custom" href="#" target="blank">
                      <i className="fa-brands fa-youtube"></i>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </div>
  );
};