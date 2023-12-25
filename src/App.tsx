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
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import Checking from './checking/Checking';
import AppAssignmentTable from './checking/CheckingTable';
import './App.css';
import QuizTimer from './Timer';

function App() {

  const startTime = new Date(); // Set start time as needed
  const duration = 6000; // Duration in secon
  return (
    <BrowserRouter>
      <div className="App">
      {/* <Posts/> */}
      {/* <MyComponent/> */}
      {/* <Pdf/> */}
      {/* <PdfNew/> */}
      {/* <RubricComponent/> */}
      {/* <InstructAssignment/> */}
      {/* <PdfImageTag/> */}
      <Routes>
        <Route path="/" element={ <QuizTimer startTime={startTime} duration={duration} /> } />
        {/* <Route path="about" element={ <AssignmentCreateAnswer /> } /> */}
        {/* <Route path="contact" element={ <AppAssignmentTable/> } /> */}
      </Routes>

    </div>
    </BrowserRouter>
  
  );
}

export default App;
