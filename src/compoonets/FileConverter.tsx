import React, { useEffect, useMemo, useState, useRef } from "react";
var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc = "./assets/js/pdf.worker.js";



interface FileConverterProps {
  pdfUrl: string;
  fileName: string;
}

interface ImageData {
  url: string;
  index: number;
}

const FileConverter: React.FC<FileConverterProps> = ({ pdfUrl, fileName }) => {
  const myRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    setLoading(false);
  }, [imageUrls]);

  const handleClickOpen = (url: string, index: number) => {
    setSelectedImage({ url, index });
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const UrlUploader = (url: string) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let reader = new FileReader();
        reader.onload = (e) => {
          const data = atob((e.target.result as string).replace(/.*base64,/, ""));
          renderPage(data);
        };
        reader.readAsDataURL(blob);
      });
    });
  };

  useMemo(() => {
    UrlUploader(pdfUrl);
  }, [pdfUrl]);

  const renderPage = async (data: string) => {
    setLoading(true);
    const imagesList: string[] = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const pdf = await pdfjsLib.getDocument({ data }).promise; // Use pdfjsLib
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setNumOfPages((prevNum) => prevNum + pdf.numPages);
    setImageUrls((prevUrls) => [...prevUrls, ...imagesList]);
  };

  useEffect(() => {
    myRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageUrls]);

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };

  return (
    <div style={{ margin: "4em", textAlign: "center" }} ref={myRef} id="image-container">
      {loading ? (
        <div>
          <div className="CircularProgress"></div>
        </div>
      ) : (
        <>
          {imageUrls.length > 0 && (
            <>
              <h4 className="drop-file-preview__title">
                Converted Images - {numOfPages}
              </h4>
              <div className="image-grid">
                {imageUrls.map((url, index) => (
                  <div key={index} className="img-card">
                    <img
                      src={url}
                      alt={`Page ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="button-stack">
                      <button onClick={() => handleClickOpen(url, index)} className="btn-bg">
                        Preview
                      </button>
                      <button onClick={() => downloadImage(url, index)} className="btn-bg">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
      <div className="dialog">
        <div className="dialog-content">
          <img
            src={selectedImage?.url || ""}
            alt={selectedImage?.url || ""}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="dialog-actions">
          <button onClick={handleClose} className="btn-outline">
            Cancel
          </button>
          <button
            onClick={() => downloadImage(selectedImage?.url || "", selectedImage?.index || 0)}
            className="btn-contained"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileConverter;
