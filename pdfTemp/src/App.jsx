import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { read, utils } from "xlsx";

export default function App() {
  const [data, setData] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const filterType = queryParameters.get("filterType");
  const filterVal = queryParameters.get("filterVal");
  const margin = queryParameters.get("filterVal");

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
    excelJson("DATA/daat.ods");
    // console.log(`${filterType}: ${filterVal}`);
    // console.log(queryParameters);
  }, []);

  return (
    <>
      <div className="main">
        <h1 className="hi">PTC Toys Catalogue</h1>
        {data.map((item, key) => {
          return (
            <div key={key}>
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
            </div>
          );
        })}
      </div>
    </>
  );
}
