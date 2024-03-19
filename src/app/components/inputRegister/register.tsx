import "./InputRegister.css";

export default function InputRegister(props: {
  type: string;
  name: string;
  placeholder: string;
  style: string;
  value: any;
  onChange: any;
  RefName: any;
}) {
  return (
    <input
      className={`InputRegister ${props.style}`}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      ref={props.RefName}
    />
  );
}
