import React from "react";
import * as css from "../index.css";

function capitalizeFirstLetter(string) {
  return typeof string === "string" || string instanceof String
    ? string[0].toUpperCase() + string.slice(1)
    : string;
}

export default function Card(props) {
  return (
    <div
      className={
        props.pos == "reverse" ? "container container-reverse" : "container"
      }
    >
      <div className="image">
        <div className="img">
          <img src={`../../DATA/images/${props.i["_image"]}.jpg`} alt="" />
        </div>{" "}
      </div>
      <div className={props.pos == "reverse" ? "data data-reverse" : "data"}>
        <div className="dataCon">
          {/* <div>Code : {props.code}</div>
          <div>Name : {props.name}</div>
          <div>Size : {props.size}</div>
          <div>color: {props.color}</div> */}
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
          {/* <div>
            Prize: &#8377;{" "}
            {props.i["_margin"]
              ? Math.round(
                  props.i["_prize"] +
                    (props.i["_margin"] * props.i["_prize"]) / 100
                )
              : props.i["_prize"]}
          </div> */}
        </div>
      </div>
    </div>
  );
}
