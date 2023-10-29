// import { useState, useEffect } from "react";
// import { PDFJS } from "pdfjs-dist";

// const PDFComponent = () => {
//   const [pdf, setPdf] = useState<string | null>(null);
//   const [images, setImages] = useState<string[]>([]);

//   useEffect(() => {
//     const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onload = async () => {
//         const pdfBuffer = await reader.result;
//         setPdf(pdfBuffer);
//       };

//       reader.readAsArrayBuffer(file);
//     };

//     document.addEventListener("change", handleUpload);

//     return () => {
//       document.removeEventListener("change", handleUpload);
//     };
//   }, []);

//   const convertPdfToImage = async () => {
//     if (!pdf) {
//       return;
//     }
  
//     const document = await PDFJS.getDocument(pdfBuffer);
//     const numberOfPages = document.numPages;
  
//     const promises = [];
//     for (let i = 1; i <= numberOfPages; i++) {
//       const page = await document.getPage(i);
//       const canvas = document.createCanvas({
//         width: page.view.width,
//         height: page.view.height,
//       });
  
//       page.render({
//         canvasContext: canvas.getContext("2d"),
//       });
  
//       const imageDataUrl = canvas.toDataURL("image/png");
//       promises.push(Promise.resolve(imageDataUrl));
//     }
  
//     const imageDataUrls = await Promise.all(promises);
  
//     if (pdfBuffer instanceof ArrayBuffer) {
//       // Convert the ArrayBuffer to a string.
//       const pdfBufferString = new TextDecoder("utf-8").decode(pdfBuffer);
  
//       // Set the PDF buffer.
//       setPdf(pdfBufferString);
//     }
  
//     // Set the images.
//     setImages(imageDataUrls);
//   };

//   return (
//     <div>
//       <input type="file" />
//       <button onClick={convertPdfToImages}>Convert to Images</button>
//       <ul>
//         {images.map((image) => (
//           <li key={image}>
//             <img src={image} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PDFComponent;
// import React, { useState } from "react";
// import {  } from "react-pdf-to-image";


// interface Image {
//   url: string;
// }

// const PDFConverter = () => {
//   const [images, setImages] = useState<Image[]>([]);
  
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);

//   const convertPDFToImages = async () => {
//     const pdf = await PDFToImage.convert(pdfUrl);
//     setImages(pdf.images);
//   };

//   React.useEffect(() => {
//     convertPDFToImages();
//   }, []);
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//         if (reader.result instanceof ArrayBuffer) {
//           const dataUrl = new TextDecoder().decode(reader.result);
//           setPdfUrl(dataUrl);
//         } else {
//           setPdfUrl(reader.result);
//         }
//       };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       {images.map((image: Image, index) => (
//         <img key={index} src={image.url} alt="PDF page" />
//       ))}
//       <div>
//       <input type="file" onChange={handleFileUpload} />
//       {/* {pdfUrl && <PDFConverter pdfUrl={pdfUrl} />} */}
//     </div>
//     </div>
//   );
// };

// export default PDFConverter;
export{}