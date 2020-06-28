import { API } from "./backend";

import React from "react";
import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const getJSON = (formdata) => {
  return fetch(`${API}/submit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formdata,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting the route!"));
};

export const ExportCSV = ({ csvData, fileName, disability }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant="warning"
      className="mt-2 ml-4"
      disabled={disability}
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Export
    </Button>
  );
};
