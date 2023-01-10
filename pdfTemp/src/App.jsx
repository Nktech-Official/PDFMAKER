import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import MultiCard from "./components/MultiCard";
import { read, utils } from "xlsx";

export default function App() {
  const [data, setData] = useState([]);
  const [pb, setPb] = useState(0);
  // const queryParameters = new URLSearchParams(window.location.search);
  // const filterType = queryParameters.get("filterType");
  // const filterVal = queryParameters.get("filterVal");
  // const margin = queryParameters.get("filterVal");

  async function check(IMG) {
    // img.src = `../DATA/images/${IMG}.jpg`;
    // var image = new Image();
    // var url_image = `../DATA/images/${IMG}.jpg`;
    // image.src = url_image;
    // if (image.width == 0) {
    //    return false;
    // } else {
    //    return true;
    // }
    try {
      const img = require(`../DATA/images/${IMG}.jpg`);
      console.log(`../DATA/images/${IMG}.jpg`);
      console.log(img);
    } catch {}
    console.log("er");
  }

  async function excelJson(file) {
    const f = await (
      await fetch(`http://localhost:5173/${file}`)
    ).arrayBuffer();
    const wb = read(f); // parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const De = utils.sheet_to_json(ws);
    setData(De);
    return De;
  }

  useEffect(() => {
    excelJson("DATA/daat.xlsx");
    // console.log(`${filterType}: ${filterVal}`);
    // console.log(queryParameters);
  }, []);

  return (
    <div className="main">
      {data.map((item, key) => {
        const img = item["_image"].split(",");
        if (img.length !== 1) {
        }

        console.log(img);
        return (
          <div key={key}>
            {img.length === 1 ? (
              <>
                {(key + 1) % 2 == 0 ? (
                  <Card pos="reverse" i={{ ...item }} />
                ) : (
                  <Card i={{ ...item }} />
                )}
                <div className="margin-10"></div>

                {(key + 1) % 2 == 0 && key + 1 != data.length ? (
                  <>
                    <div className="waterMark">PTC TOYS CATALOGUE</div>{" "}
                    <div className="page-break"></div>{" "}
                    <div className="margin"></div>
                  </>
                ) : null}
                {/* {setPb(pb + 1)} */}
              </>
            ) : (
              <>
                <MultiCard img={img} i={{ ...item }} />
                <div className="waterMark">PTC TOYS CATALOGUE</div>{" "}
                <div className="page-break"></div>{" "}
                <div className="margin"></div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
