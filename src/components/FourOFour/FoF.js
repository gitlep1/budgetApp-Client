import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FoF.scss";

const FourOFour = () => {
  const navigate = useNavigate();

  const [Show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  });

  return (
    <section>
      <Modal className="FoFModal" show={Show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>ERROR 404: Page or Transaction not found!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Please check the URL and try again.</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/authenticated/transactions");
            }}
          >
            Back to transactions
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to homepage
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default FourOFour;
