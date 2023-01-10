import React from "react";
import * as css from "../css/multiCard.css";

function capitalizeFirstLetter(string) {
  return typeof string === "string" || string instanceof String
    ? string[0].toUpperCase() + string.slice(1)
    : string;
}

export default function MultiCard(props) {
  const { img } = props;
  console.log(props);
  return (
    <div className="container-multi">
      <div className="image-multi">
        {img.map((item, key) => {
          console.log(item);
          return (
            <div key={key} className="img-multi">
              <img src={`../../DATA/images/${item}.jpg`} alt="" />
            </div>
          );
        })}
      </div>
      <div className="data-multi">
        <span id="Name"> Item: {props.i["name"]} </span>
        <div className="dataCon-multi">
          {Object.keys(props.i).map((val, key) => {
            return (
              <div key={key}>
                {val[0] !== "_" ? (
                  <div>
                    {capitalizeFirstLetter(val)} :{" "}
                    {capitalizeFirstLetter(props.i[val])}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
