import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import MultiCard from "./components/MultiCard";
import { read, utils } from "xlsx";

let x = 0;

export default function App() {
  const [data, setData] = useState(null);
  const [pb, setPb] = useState(0);
  const [excelData, setexcelData] = useState();
  const [imgData, setImgData] = useState(null);
  const [imgName, setImgName] = useState(null);

  // const queryParameters = new URLSearchParams(window.location.search);
  // const filterType = queryParameters.get("filterType");
  // const filterVal = queryParameters.get("filterVal");
  // const margin = queryParameters.get("filterVal");

  async function excelJson() {
    const file = excelData;
    const data = await file.arrayBuffer();
    const wb = read(data); // parse the array buffer
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const De = utils.sheet_to_json(ws);
    setData(De);
    return De;
  }

  useEffect(() => {
    excelJson("DATA/daat.xlsx");
  }, [excelData]);

  const fileInput = (e) => {
    setexcelData(e.target.files[0]);
  };
  const folderInput = (e) => {
    // console.log(e.target.files[0].name);
    const files = e.target.files;
    setImgData(files);
    let fileList = "{";
    for (let i = 0; i < files.length; i++) {
      fileList += `"${files[i].name}":${i}`;
      if (i !== files.length - 1) {
        fileList += ",";
      }
      if (i === files.length - 1) {
        fileList += "}";
      }
    }
    setImgName(JSON.parse(fileList));

    // const value = files.map((val, index) => {
    //   const name = val.name;
    //   return { name: val.name };
    // });
  };
  return (
    <div className="main">
      {data && imgData && imgName ? (
        data.map((item, key) => {
          let img = item["_image"].split(",");
          let images = [];
          if (img.length === 1) {
            x += 1;
          }
          for (let index = 0; index < img.length; index++) {
            let imgIndex = imgName[`${img[index]}.jpg`];
            images.push(imgData[imgIndex]);
          }

          return (
            <div key={key}>
              {img.length === 1 ? (
                <>
                  {x % 2 == 0 ? (
                    <>
                      {console.log(x)}
                      <Card pos="reverse" i={{ ...item }} images={images} />
                    </>
                  ) : (
                    <Card i={{ ...item }} images={images} />
                  )}
                  <div className="margin-10"></div>

                  {x % 2 == 0 && x != data.length ? (
                    <>
                      <div className="waterMark">PTC TOYS CATALOGUE</div>{" "}
                      <div className="page-break"></div>{" "}
                    </>
                  ) : null}
                  {/* {setPb(pb + 1)} */}
                </>
              ) : (
                <>
                  <MultiCard images={images} i={{ ...item }} />
                  <div className="waterMark">PTC TOYS CATALOGUE</div>{" "}
                  <div className="page-break"></div>{" "}
                </>
              )}
            </div>
          );
        })
      ) : (
        <>
          <button>
            <input type="file" name="xlsx" id="" onChange={fileInput} />
          </button>
          <button>
            <input
              id="Images"
              type="file"
              multiple
              name="img"
              onChange={folderInput}
            />
          </button>
        </>
      )}
    </div>
  );
}
