import "./log-component.css";

function LogComponent({ channel, category, name, email, phone, created }) {
  return (
    <div className="log-component">
      <p className="p info">
        Channel: '{channel}' ; Category: '{category}'
      </p>
      <p className="p user">
        '{name}' with email '{email}' and phone '{phone}'
      </p>
      <p className="p time">{created}</p>
    </div>
  );
}

export default LogComponent;
