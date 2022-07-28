import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FoF.scss";

const FourOFour = ({ authenticated }) => {
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
          {authenticated ? (
            <Modal.Title>ERROR 404: Page or Transaction not found!</Modal.Title>
          ) : (
            <Modal.Title>
              ERROR 404: You are not authorized to be here.
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {authenticated ? (
            <h3>Please check the URL and try again.</h3>
          ) : (
            <h3>Please sign in or sign up to view this page.</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          {authenticated ? (
            <Button
              variant="primary"
              onClick={() => {
                navigate("/authenticated/transactions");
              }}
            >
              Back to transactions
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to homepage
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default FourOFour;
