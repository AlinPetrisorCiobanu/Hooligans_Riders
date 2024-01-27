import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Custom_Modal = ({show , onHide , confirm }) => {

  const props = { show, onHide };

    return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Borrar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Estas Seguro?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={confirm}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
    );
  };