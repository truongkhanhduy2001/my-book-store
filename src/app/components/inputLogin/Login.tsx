import "./InputLogin.css";

export default function InputLogin(props: {
  type: string;
  name: string;
  placeholder: string;
  style: string;
  value: any;
  onChange: any;
  RefEmail: any;
}) {
  return (
    <input
      className={`InputLogin ${props.style}`}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      ref={props.RefEmail}
    />
  );
}
