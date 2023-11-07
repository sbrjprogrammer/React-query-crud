import React from 'react';
import Posts from './pages/Post';
import { MyComponent } from './pages/newPage';
import InstructCreateCourse from './pages/PageFormik';
import Pdf from './pages/Pdf';
import RubricComponent from './pages/Rubric';
import PdfNew from './pages/pdf2';
import PdfToImage from './PDFImage/PdfImage';
import InstructAssignment from './PDFImage/FileFormik';
import PdfImageTag from './PdfImageTagging/PdfImageTag';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Posts/> */}
      {/* <MyComponent/> */}
      {/* <Pdf/> */}
      {/* <PdfNew/> */}
      {/* <RubricComponent/> */}
      {/* <InstructAssignment/> */}
      <PdfImageTag/>

    </div>
  );
}

export default App;
