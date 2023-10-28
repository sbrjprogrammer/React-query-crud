import React, { useState } from "react";

import FileInput from "../compoonets/FileInput";
import FileConverter from "../compoonets/FileConverter";

function Pdf() {
  const [pdfFile, setPdfFile] = useState(null);
  
  return (
    <div style={{ height: "100vh" }}>
      <div className="d-flex" style={{ padding: "24px" }}>
        <div className="box">
        <FileInput onFileChange={(file) => setPdfFile(file)} />
        </div>
      </div>
      {pdfFile && (
        <div style={{ width: "100%" }}>
          <FileConverter pdfUrl={URL.createObjectURL(pdfFile)} fileName={pdfFile.name} />
        </div>
      )}
    </div>
  );
}

export default Pdf;
