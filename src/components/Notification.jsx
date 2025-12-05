import ReactDOM from "react-dom";
import "../styles/Notification.css";

const Notification = ({ message, type = "success" }) => {
  return ReactDOM.createPortal(
    <div className={`notification ${type}`}>
      {message}
    </div>,
    document.body
  );
};


export default Notification;
