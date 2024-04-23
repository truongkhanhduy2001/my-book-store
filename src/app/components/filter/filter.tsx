import "./filter.css";
import { useEffect, useRef, useState } from "react";
export default function SideBar(props: any) {
  const { parent, parentRemoveType, typeDefault } = props;
  const typeCategories = [
    {
      type: "Adenture",
    },
    {
      type: "Comedy",
    },
    {
      type: "Horror",
    },
    {
      type: "Science",
    },
    {
      type: "Romance",
    },
    {
      type: "Thriller",
    },
  ];

  const typeWriter = [
    {
      type: "John",
    },
    {
      type: "Quang",
    },
    {
      type: "Duy",
    },
    {
      type: "Arthur",
    },
  ];

  const refInput = useRef<HTMLInputElement | null>(null);
  const handleClick = (e: any) => {
    const value = e.target.value;
    // console.log(refInput.current);
    if (e.target.getAttribute("checked") == "checked") {
      e.target.removeAttribute("checked");
      parentRemoveType(value);
    } else {
      e.target.setAttribute("checked", "checked");
      parent(value);
    }
  };

  return (
    <>
      <section className="sidebar">
        <div className="writer">
          <h2 className="writer-title">Writer</h2>
          <div className="writer-container">
            {/* {typeWriter.map((type, index) => {
              return (
                <div key={index} className="writer-label">
                  <input type="checkbox" name="check" value={type.type} />
                  <span className="check"></span>
                  {type.type}
                </div>
              );
            })} */}
          </div>
        </div>
        <div className="categories">
          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            {typeCategories.map((type, index) => {
              return (
                <div key={index} className="categories-label">
                  <input
                    ref={refInput}
                    id={type.type}
                    type="checkbox"
                    className="typeCheck"
                    name="check"
                    value={type.type}
                    defaultChecked={false}
                    onChange={(e) => handleClick(e)}
                  />
                  {type.type}
                </div>
              );
            })}
          </div>
        </div>
        <div className="prices">
          <header>
            <h2>Price</h2>
            <p>Use slider or enter min and max price</p>
          </header>
        </div>
      </section>
    </>
  );
}
