import { Modal, Button } from "react-bootstrap";

const TransactionModal = (props) => {
  return (
    <Modal
      className="transactionModal"
      show={props.Show}
      onHide={props.handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this transaction?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            props.handleDelete(props.id, props.index);
          }}
        >
          Confirm
        </Button>

        <Button variant="danger" onClick={props.handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;
