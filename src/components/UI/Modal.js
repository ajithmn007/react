import styles from "./Modal.module.css";
import ReactDom from "react-dom";

const OverlayModal = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseModal}></div>;
};
const Modal = (props) => {
  const portalElement = document.getElementById("overlay-modal");

  return (
    <>
      {ReactDom.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>, portalElement)}
      {ReactDom.createPortal(
        <OverlayModal>{props.children}</OverlayModal>,
        portalElement
      )}
    </>
  );
};

export default Modal;
