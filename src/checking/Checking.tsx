
// import {useState,useEffect} from "react"
// import './AssignmentCreateAnswer.css'
// import { useNavigate } from 'react-router-dom';
// import trashIcon from '../../images/trash-icon.png'
// import plusIcon from '../../images/plus-icon.png'
// import file from '../../images/file.png'
// import downloadIcon from '../../images/download-icon.png'
// import axios from "axios";

// import { useLocation } from 'react-router-dom';
// import { usePostData } from "../customHook/usePostData";






// type Post = {
//     SubQuestionID:string,
//     QuestioniD:string, 
//     RubricID:string,
//     StudentId:string,
//     Points:string,
//     Title:string, 
//   };

//   interface RubricQuestion {
//     RubricID: string;
//     QuestioniD: string;
//     QuestionText: string;
//     // Add more properties as needed
//   }
  
//   interface RubricSubQuestion {
//     RubricID: string;
//     QuestionID: string;
//     QuestionText: string;
//     // Add more properties as needed
//   }
  
  
//   interface ResponseDataType {
//     Response: RubricQuestion[];
//   }
  
//   interface MyObject {
//     RubricID: any;
  
//     // Add other properties as needed
//   }
//   // type Post = {
//   //   RubricID: string,
//   //   Title: string,
//   //   Points: string,
  
  
//   // };
  
//   type RubricType = {
//     RubricID: string,
  
  
  
//   };
  


// const AssignmentCreateAnswer = () => {
//   const navigate = useNavigate();
//   let { state } = useLocation();
//   let {  SubQuestionID,QuestioniD,RubricID,StudentId,Points,Title } = state
//   let [totalPoints, setTotalPoints] = useState(Points);
//   let [navigateState, setNavigateState] = useState();
//   let [description, setDescription] = useState("");

//   const [rubric, setRubric] = useState<RubricType[]>([]);
//   // const [rubric, setRubric] = useState([]);
//   // uniques k lye
//   const [questions, setQuestions] = useState<RubricQuestion[]>([]);
//   const [subQuestions, setSubQuestions] = useState<RubricSubQuestion[]>([]);




  
//   useEffect(() => {
//     axios.get("http://localhost:3000/Rubric").then((response) => {
//       setRubric(response.data);
//     });
//   }, []);
  
//   useEffect(() => {
//     if (rubric.length > 0) {
//       rubric.map((value)=>{
//           axios.get("http://localhost:3000/Questions").then((response) => {
//               setQuestions(response.data);
//             });
  
//       })
  
     
//     }
//   }, [rubric]);
  
//   useEffect(() => {
//     if (questions.length > 0) {
//       axios.get("http://localhost:3000/subQuestion").then((response) => {
//         setSubQuestions(response.data);
//       });
//     }
//   }, [questions]);
  
//   const getSubQuestionsForQuestion = (questionId) => {
//     return subQuestions.filter((subQuestion:any) => subQuestion.id === questionId);
//   };



//       console.log(
//         SubQuestionID,
//         QuestioniD, 
//         RubricID,
//         StudentId,
//         Points,
//         Title , 
       
//         "routes se aya data"
//         )
//         // addRubric logic 
//   const [rubrics, setRubrics] = useState<{ id: number; value: string; selected: boolean }[]>([{ id: 2, value: '', selected: false }]);

//       const addRubric = () => {
//       const newId = rubrics.length + 2;
//        setRubrics([...rubrics, { id: newId, value: '', selected: false }]);

// };
      
//         const removeRubric = (id) => {
//           const updatedRubrics = rubrics.filter((rubric) => rubric.id !== id);
//           setRubrics(updatedRubrics);
//         };
      
//         const handleInputChange = (id, value) => {
//           const updatedRubrics = rubrics.map((rubric) =>
//             rubric.id === id ? { ...rubric, value } : rubric
//           );
//           setRubrics(updatedRubrics);

//           // const newTotalPoints = Points - rubrics.reduce<any>((sum, rubric) => sum + rubric.value, 0);
//           // setTotalPoints(newTotalPoints);
//         };
      

//         const handleInputChange = (id, value) => {
//           const updatedRubrics = rubrics.map((rubric) =>
//             rubric.id === id ? { ...rubric, value: String(value), selected: !rubric.selected } : rubric
//           );
//           setRubrics(updatedRubrics);
        
//           const newTotalPoints = updatedRubrics.reduce((sum, rubric) => {
//             if (rubric.selected) {
//               return sum + parseFloat(rubric.value || '0');
//             }
//             return sum;
//           }, 0);
        
//           setTotalPoints(newTotalPoints);
//         };
        
        


//     //   const UpdatePoints=()=>{
//     //     const newTotalPoints = totalPoints - rubrics.reduce<any>((sum, rubric) => sum + rubric.value, 0);
//     //     setTotalPoints(newTotalPoints);
//     //   }
//     //   const UpdatePoints = () => {
//     //     const newTotalPoints = Points - rubrics.reduce((sum, rubric) => sum + parseFloat(String(rubric.value || 0)), 0);
//     //     setTotalPoints(newTotalPoints);
//     //   };
      
//       const UpdatePoints = () => {
//         const newTotalPoints = rubrics.reduce((sum, rubric) => {
//           if (rubric.selected) {
//             return sum - parseFloat(rubric.value || '0');
//           }
//           return totalPoints - rubrics.reduce<any>((sum, rubric) => sum + rubric.value, 0);
//         }, Points);
      
//         setTotalPoints(newTotalPoints);
//       };

//       const toggleRubricSelection = (id) => {
//         const updatedRubrics = rubrics.map((rubric) =>
//           rubric.id === id ? { ...rubric, selected: !rubric.selected } : rubric
//         );
//         setRubrics(updatedRubrics);
//         // Call UpdatePoints to recalculate total points
//         UpdatePoints();
//       };


//       const UpdatePoints = () => {

//         const newTotalPoints = rubrics.reduce((sum, rubric) => {

//           console.log(sum,rubric,"ye su or rubric h update points ka")
//           if (rubric.selected) {
//             return sum
//           }
//           return sum - parseFloat(rubric.value || '0');;
//         }, Points);
      
//         setTotalPoints(newTotalPoints);
//       };
      

//     //   const { mutate:questionCheck, error: subQuestionError } = usePostData<any>(["CreateRubricQuestionsResult"], async (data) => {
      
//     //     console.log(data)
//     //     const response = await ApiService.create(data, 'CreateRubricQuestionsResult')
//     //     console.log(response, "CreateRubricQuestionsResult response")
//     //     return response.data;
//     //   });

      
//     //   const { mutate:subQuestionCheck, error: questionError } = usePostData<any>(["CreateAssignmentInvites"], async (data) => {
//     //     console.log(data)
//     //     const response = await ApiService.create(data, 'CreateRubricSubQuestionsResult')
//     //     console.log(response, "CreateAssignmentInvites response")
//     //     return response.data;
//     //   });




//     //   console.log(QuestioniD , SubQuestionID,"submit function")
     
//     //   const submit=()=>{
        
//     //     if(QuestioniD && SubQuestionID){

//     //       const body = {
//     //         SubQuestionID: SubQuestionID,
//     //         StudentId : StudentId,
//     //         QuestionID  : QuestioniD,
//     //         Points : totalPoints,
//     //         ResultDescription:description,
//     //         UpdatedBy:null,
//     //         UpdatedDate:null
//     //     };

//     //     subQuestionCheck(body)

//     //     }else if(QuestioniD){
//     //       const body = {
//     //         QuestioniD:QuestioniD, 
//     //         RubricID:RubricID ,
//     //         StudentId:StudentId,
//     //         Points:totalPoints ,
//     //         ResultDescription:description,
//     //         UpdatedBy:null,
//     //         UpdatedDate:null
//     //     };

//     //     questionCheck(body)
//     //     }
    
//         // navigate('instruct-assignment-grade')
        
//       }






//   const handleRedirect = (event: { preventDefault: () => void; }) => {
//     event.preventDefault();

//     // 👇️ redirect to /contacts
//     navigate('/instruct-assignment-detail');
//   };





//   return (
//     <div className='aside aside-dark sidebar wrapper-instruct' style={{ overflow: 'auto' }}>
//       <div className="aside-logo mt-4" id="kt_aside_logo" style={{ background: 'transparent' }}>
       
//       </div>
//       <div className='px-4 py-2 text-color' style={{ color: '#4D4D4D' }}>
//         <div className='d-flex justify-content-end'>
//           <span className='card-label fs-6 text-dark fw-bolder'>0 OF 1 GRADED</span>
//         </div>
       
//         <p className='fs-6 fw-bolder mb-0 mt-2'>TOTAL POINTS</p>
//         <span className='fs-4 text-dark fw-bolder'>{totalPoints.toFixed(1)}</span><span className='fs-4 fw-bolder'> / {Points} pts</span>
//       </div>
//       <hr className="dashed mx-4" />


//       <div className='table-div' style={{ marginLeft: '1rem' }}>
//         <Table responsive={true} >
//           <thead>
//             <tr style={{ color: '#ffffff', fontSize: '1.2rem' }}>
//               <th>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                   <span className='py-2 px-4 btn btn-sm btn-light effect-outer fs-4 fw-bolder' style={{ cursor: 'default' }}>1</span>
//                   <span className='fs-4 text-dark fw-bolder'>- 0.0</span>
//                 </div>
//               </th>
//               <th>
//                 <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '1rem' }}>
//                   <div style={{ display: 'flex', gap: '0.5rem' }}>
//                     <span><img style={{ cursor: 'pointer' }} src={trashIcon} alt="trash-icon" /></span>
//                   </div>
//                 </div>
//               </th>

//             </tr>
//           </thead>
//           <tbody>

//           {rubrics.map((rubric) => (
//               <tr key={rubric.id} style={{ color: '#ffffff', fontSize: '1.2rem' }}>
//                 <td>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                     <span  
//           //           onClick={() => { UpdatePoints();
//           //                       // handleInputChange(rubric.id, rubric.value); 
//           //                     }}
//           // className={`py-2 px-4 btn btn-sm btn-light effect-outer fs-4 fw-bolder ${
//           //   rubric.selected ? 'selected' : ''
//           // }`}
//           // onClick={() => {
//           //   const updatedRubrics = rubrics.map((r) => ({
//           //     ...r,
//           //     selected: r.id === rubric.id ? !r.selected : r.selected,
//           //   }));
//           //   setRubrics(updatedRubrics);
        
//           //   // Call UpdatePoints to recalculate total points
//           //   UpdatePoints();
//           // }}
//         //   onClick={() => toggleRubricSelection(rubric.id)}
//           // className={`py-2 px-4 btn btn-sm btn-light effect-outer fs-4 fw-bolder ${
//           //   rubric.selected ? 'selected' : ''
//           // }`}
//           // style={{
//           //   cursor: 'pointer',
//           //   color: rubric.selected ? 'blue' : 'red',
//           //   backgroundColor: rubric.selected ? 'blue' : '',
//           // }}

//           className={`py-2 px-4 btn btn-sm btn-light effect-outer fs-4 fw-bolder`}
//           style={{
//             cursor: 'pointer',
            
//             background: rubric.selected ? 'blue' : '', // Change this line
//           }}
//                   >
//                       {rubric.id}
//                     </span>
//                     <input
//                       required
//                       type='text'
//                       className='form-control form-control-lg fs-6 form-control-solid mb-3 mb-lg-0 effect-3d px-1 py-2 w-3'
//                       placeholder=' -1.0'
//                       value={rubric.value}
//                       style={{ color: 'red' }} 
//                     //   onChange={(e) => handleInputChange(rubric.id, e.target.value)}
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '1rem' }}>
//                     <div style={{ display: 'flex', gap: '0.5rem' }}>
//                       <span
//                     //    onClick={() => removeRubric(rubric.id)}
//                        >
//                         <img style={{ cursor: 'pointer' }} src={trashIcon} alt='trash-icon' />
//                       </span>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//           </tbody>
//         </Table>
//       </div>



//       <div className='my-4' style={{ marginLeft: '3rem' }}>
//         <input required onChange={(e)=>setDescription(e.target.value)} type="text" style={{ width: '90%' }} className=" mx-auto form-control form-control-lg form-control-solid mb-3 mb-lg-0 effect-3d mh-4 p-2" placeholder='Incorrect partial fraction decomposition' />
//       </div>
//       <div className='mx-4 d-flex gap-2'>
//         <button className="btn btn-primary effect-outer d-flex align-items-center gap-3 p-2 fs-6" onClick={addRubric}> <img src={plusIcon} alt='plus-icon' /> Add Rubric </button>
//         <button className="btn btn-primary effect-outer d-flex align-items-center gap-3 p-2 fs-6"> <img src={file} alt='file' /> Create Group </button>
//         <button className="btn btn-primary effect-outer d-flex align-items-center gap-3 p-2 fs-6"> <img src={downloadIcon} alt='download-icon' /> Import </button>
//       </div>
//       <div className='mx-4 mt-5 gap-5'>
//         <p className='fs-7 fw-bolder'>SUBMISSION SPECIFIC ADJUSTMENTS</p>
//         <div className='d-flex align-items-center gap-2 mb-3'>
//           <span className='fs-4 text-dark fw-bolder'>Point Adjustment</span>
//           <input required type="text" className="form-control form-control-lg fs-6 form-control-solid mb-3 mb-lg-0 effect-3d p-2 w-3" placeholder='0' />
//         </div>
//         <div>
//           <textarea name="CourseDescription"
//             rows={2} className="form-control form-control-lg  mb-3 mb-lg-0 effect-3d" required />
//         </div>
//         <div className='mt-4'>
//           <span className='fw-bolder'>APPLY PREVIOUS USED COMMENTS</span>
//           <AppPreviousComment />
//         </div>
//         <div className='d-flex my-5 gap-4'>
//           <button className="btn effect-outer d-flex align-items-center gap-3 p-2 fs-6"> Previous Ungraded </button>
//           <button onClick={submit} className="btn btn-primary effect-outer d-flex align-items-center gap-3 p-2 fs-6"> Next Ungraded </button>
//         </div>
//       </div>


//     </div>
//   )
// }

// export default AssignmentCreateAnswer
import React, { useState } from 'react';
// import './MyComponent.css'; // Import your CSS file for styling

const MyComponent = () => {
  const [totalPoints, setTotalPoints] = useState<number>(10);
  const [inputValue, setInputValue] = useState<string>('');
  const [actionHistory, setActionHistory] = useState<Array<number>>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);

//   const handlePointsAction = () => {
//     const pointsToChange = parseInt(inputValue, 10) || 0;
//     const updatedTotalPoints = currentIndex !== null
//       ? actionHistory[currentIndex]
//       : totalPoints;

//     const newTotalPoints = updatedTotalPoints - pointsToChange;
//     setTotalPoints(newTotalPoints);

//     // Toggle the color change on each click
//     setButtonClicked((prevClicked) => !prevClicked);

//     if (currentIndex !== null && actionHistory[currentIndex] !== newTotalPoints) {
//       // If there's a change, update the history
//       setActionHistory((prevHistory) => [...prevHistory.slice(0, currentIndex), newTotalPoints]);
//       setCurrentIndex(actionHistory.length);
//     } else if (currentIndex === null) {
//       // First time clicked
//       setActionHistory([...actionHistory, newTotalPoints]);
//       setCurrentIndex(actionHistory.length);
//     }

//     setInputValue('');
//   };
const handlePointsAction = () => {
    const pointsToChange = parseInt(inputValue, 10) || 0;
    const updatedTotalPoints = currentIndex !== null
      ? actionHistory[currentIndex]
      : totalPoints;
  
    // Reverse the subtraction operation
    const newTotalPoints = updatedTotalPoints + (buttonClicked ? -1 : 1) * pointsToChange;
    setTotalPoints(newTotalPoints);
  
    // Toggle the color change on each click
    setButtonClicked((prevClicked) => !prevClicked);
  
    if (currentIndex !== null && actionHistory[currentIndex] !== newTotalPoints) {
      // If there's a change, update the history
      setActionHistory((prevHistory) => [...prevHistory.slice(0, currentIndex), newTotalPoints]);
      setCurrentIndex(actionHistory.length);
    } else if (currentIndex === null) {
      // First time clicked
      setActionHistory([...actionHistory, newTotalPoints]);
      setCurrentIndex(actionHistory.length);
    }
  
    setInputValue('');
  };
  
  return (
    <div>
      <p>Total Points: {totalPoints}</p>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter points to change"
        />
        <button
          className={buttonClicked ? 'clicked' : ''}
          onClick={handlePointsAction}
        >
          Change Points
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
