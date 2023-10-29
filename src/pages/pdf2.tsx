import React, { useEffect, useState } from "react";
// import "./styles.css";
 import {pdfjs} from 'pdfjs-dist/build/pdf';
// const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = ('pdfjs-dist/build/pdf.worker.entry');;



const PDFJS = (window as any).pdfjsLib;

interface PageState {
  pdf: any;
  width: number;
  images: string[];
  height: number;
  totalPages: number;
  currentPage: number;
  pdfRendering: boolean;
  pageRendering: boolean;
}

export default function PdfNew() {
  const [pageState, setPageState] = useState<PageState>({
    pdf: "",
    width: 0,
    images: [],
    height: 0,
    totalPages: 1,
    currentPage: 1,
    pdfRendering: false,
    pageRendering: false,
  });

  async function showPdf(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setPageState((prevState) => ({ ...prevState, pdfRendering: true }));
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      const _PDF_DOC = await PDFJS.getDocument({ url: uri });
      setPageState((prevState) => ({
        ...prevState,
        pdf: _PDF_DOC,
        pdfRendering: false,
      }));
      document.getElementById("file-to-upload")?.setAttribute("value", "");
    } catch (error) {
      alert(error.message);
    }
  }

  function changePage(newPage: number) {
    setPageState((prevState) => ({ ...prevState, currentPage: newPage }));
  }

  async function renderPage() {
    setPageState((prevState) => ({ ...prevState, pageRendering: true }));
    const imagesList: string[] = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const canv = document.querySelector(".canv");

    for (let i = 1; i <= pageState.pdf.numPages; i++) {
      const page = await pageState.pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      console.log("page length", pageState.pdf.numPages);
      setPageState((prevState) => ({
        ...prevState,
        width: viewport.width,
        height: viewport.height,
      }));
      await page.render(render_context).promise;
      const img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setPageState((prevState) => ({
      ...prevState,
      images: imagesList,
      pageRendering: false,
    }));
  }

  useEffect(() => {
    if (pageState.pdf) {
      renderPage();
    }
  }, [pageState.pdf, pageState.currentPage]);

//   const styles: React.CSSProperties = {
//     wrapper: {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "5px",
//     },
//     imageWrapper: {
//       border: "1px solid rgba(0,0,0,0.15)",
//       borderRadius: "3px",
//       boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
//       padding: "0",
//     },
//   };

  return (
    <div className="App">
      <button
        id="upload-button"
        onClick={() => document.getElementById("file-to-upload")?.click()}
      >
        Select PDF
      </button>
      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      <div id="pdf-main-container">
        <div id="pdf-loader" hidden={!pageState.pdfRendering}>
          Loading document ...
        </div>
        <div id="page-count-container">
          Page {pageState.currentPage} of{" "}
          <div id="pdf-total-pages">{pageState.totalPages}</div>
        </div>
        <div id="pdf-contents">
          <div id="pdf-meta">
            <div id="pdf-buttons">
              <button
                id="pdf-prev"
                onClick={() => changePage(pageState.currentPage - 1)}
              >
                Previous
              </button>
              <button
                id="pdf-next"
                onClick={() => changePage(pageState.currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
          <div id="image-convas-row">
            <div >
              {pageState.images.map((image, idx) => (
                <div key={idx} >
                  <img
                    id="image-generated"
                    src={image}
                    alt="pdfImage"
                    style={{
                      width: "100%",
                      height: "100%",
                      margin: "0",
                      border: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div id="page-loader" hidden={!pageState.pageRendering}>
            Loading page ...
          </div>
          <button>Show PNG</button>
          <button>Download PNG</button>
        </div>
      </div>
    </div>
  );
}
