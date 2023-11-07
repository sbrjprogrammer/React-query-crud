import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Initialize pdf.js worker for PDF rendering
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [allItem, setAllItem] = useState<string[]>([]);

  const convertToImg = async () => {
    try {
      if (!file) {
        console.error('Please select a PDF file.');
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdfData = new Uint8Array(arrayBuffer);

      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      setTotalPages(pdf.numPages);
      const images: string[] = []; // Temporary array to store images

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        setPage(pageNumber);
        const pdfPage = await pdf.getPage(pageNumber);
        const scale = 1.5; // You can adjust the scale as needed
        const viewport = pdfPage.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext,
          viewport,
        };

        await pdfPage.render(renderContext).promise;
        const image = canvas.toDataURL('image/jpeg', 0.8);
        images.push(image);
      }

      setAllItem(images); // Update the state with the array of images
    } catch (error) {
      console.error('Error converting PDF to images:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <div>
      <h1>PDF to JPG Converter</h1>
      <label>
        Select a PDF file:
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </label>
      <button onClick={convertToImg}>Convert to JPG</button>
      <div>
        {page}/{totalPages}
      </div>
      <div style={{width: '80%'}}>
        {allItem.map((image, index) => (
          <img key={index} src={image} alt={`Page ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default PdfToImage;