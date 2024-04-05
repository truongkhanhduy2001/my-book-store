import "./titlePage.css";

export default function TitlePage(props: { title: string }) {
  return <h2 className="title">{props.title}</h2>;
}
