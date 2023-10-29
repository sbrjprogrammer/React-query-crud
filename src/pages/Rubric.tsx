// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // const RubricComponent = () => {
// //   const [rubric, setRubric] = useState([]);
// //   const [questions, setQuestions] = useState([]);
// //   const [subQuestions, setSubQuestions] = useState([]);

// //   useEffect(() => {
// //     axios.get("http://localhost:3000/Rubric")
// //     .then((response) => {
// //         console.log(response.data);
// //         setRubric(response.data);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     if (rubric) {
// //         axios.get("http://localhost:3000/Questions")
// //         .then((response) => {
// //             console.log(response.data);
// //             setQuestions([... response.data]);
// //         });
// //     }
// //   }, [rubric]);

// //   useEffect(() => {
// //     if (questions) {
// //       questions.forEach((question) => {
// //         axios.get("http://localhost:3000/subQuestion")
// //         .then((response) => {
// //             console.log(response.data);
// //             setSubQuestions([...response.data]);
// //         });
// //       });
// //     }
// //   }, [questions]);
// //   console.log(rubric,"state wala data")
// //   console.log(questions,"state wala data")
// //   console.log(subQuestions,"state wala data")

// //   return (
// //     <div>
// //       <h2>Rubric</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Rubric Title</th>
// //             <th>Total Points</th>
// //             <th>Assignment ID</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {rubric.map((rubricItem, index) => (
// //             <tr key={index}>
// //               <td>{rubricItem.RubricTitle}</td>
// //               <td>{rubricItem.TotalPoints}</td>
// //               <td>{rubricItem.AssignmentID}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <h2>Questions</h2>
// //       <ul>
        
// //          {
// //         questions.map((question) => (
// //           <li key={question.id}>{question.Title}</li>
// //         ))} 
// //       </ul>

// //       <h2>Sub-Questions</h2>
// //       <ul>
// //         {subQuestions.map((subQuestion) => (
// //           <li key={subQuestion.id}>{subQuestion.Title}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default RubricComponent;



// import { useState, useEffect } from "react";
// import axios from "axios";

// const RubricComponent = () => {
//   const [rubric, setRubric] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [subQuestions, setSubQuestions] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/Rubric").then((response) => {
//       setRubric(response.data);
//     });
//   }, []);

//   useEffect(() => {
//     if (rubric.length > 0) {
//       axios.get("http://localhost:3000/Questions").then((response) => {
//         setQuestions(response.data);
//       });
//     }
//   }, [rubric]);

//   useEffect(() => {
//     if (questions.length > 0) {
//       // Fetch sub-questions for each question
//       const promises = questions.map((question) =>
//         axios.get(`http://localhost:3000/subQuestion/${question.id}`)
//       );

//       Promise.all(promises)
//         .then((responses) => {
//           // responses will be an array of sub-questions for each question
//           console.log(responses,"sub question ka response")
//           const subQuestionsData = responses.map((response) => response.data);
//           console.log(subQuestionsData,"sub question new logic ")
//           setSubQuestions(subQuestionsData);
//         //   setSubQuestions(responses.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching sub-questions:", error);
//         });
//     }
//   }, [questions]);
//   console.log(subQuestions)
//   console.log([subQuestions])


//   return (
//     <div>
//       <h2>Rubric</h2>
//       <ul>
//         {rubric.map((rubricItem, index) => (
//           <li key={index}>
//             <p>Rubric Title: {rubricItem.RubricTitle}</p>
//             <p>Total Points: {rubricItem.TotalPoints}</p>
//             <p>Assignment ID: {rubricItem.AssignmentID}</p>
//           </li>
//         ))}
//       </ul>

//       <h2>Questions and Sub-Questions</h2>
//       {/* <ul>
//         {questions.map((question) => (
//           <li key={question.id}>
//             <p>Question Title: {question.Title}</p>
//             <ul>
//             {Array.isArray(subQuestions[question.id - 1]) &&
//           subQuestions[question.id - 1].map((subQuestion) => (
//             <li>Sub-Question: {subQuestion.Title}</li>
//           ))}
//               {/* {subQuestions[question.id - 1] &&
//                 subQuestions[question.id - 1].data.map((subQuestion) => (
//                   <li key={subQuestion.id}>Sub-Question: {subQuestion.Title}</li>
//                 ))} */}
//             {/* </ul>
//           </li>
//         ))}
//       </ul> */} 
//       <ul>
//         {questions.map((question) => (
//           <li key={question.id}>
//             <p>Question Title: {question.Title}</p>
//         <ul>
//             {subQuestions[question.id ] &&
//                 [subQuestions[question.id ]].map((subQuestion) => (
//                     <div>

//                         <li key={subQuestion.id}>Sub-Question: {subQuestion.Title}</li>
                        
//                     </div>


//                 ))}

               
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RubricComponent;


// 3rd logic
import { useState, useEffect } from "react";
import axios from "axios";

const RubricComponent = () => {
  const [rubric, setRubric] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [subQuestions, setSubQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/Rubric").then((response) => {
      setRubric(response.data);
    });
  }, []);

  useEffect(() => {
    if (rubric.length > 0) {
      axios.get("http://localhost:3000/Questions").then((response) => {
        setQuestions(response.data);
      });
    }
  }, [rubric]);

  useEffect(() => {
    if (questions.length > 0) {
      axios.get("http://localhost:3000/subQuestion").then((response) => {
        setSubQuestions(response.data);
      });
    }
  }, [questions]);

  const getSubQuestionsForQuestion = (questionId) => {
    return subQuestions.filter((subQuestion) => subQuestion.id === questionId);
  };

  return (
    <div>
      <h2>Rubric</h2>
      <ul>
        {rubric.map((rubricItem, index) => (
          <li key={index}>
            <p>Rubric Title: {rubricItem.RubricTitle}</p>
            <p>Total Points: {rubricItem.TotalPoints}</p>
            <p>Assignment ID: {rubricItem.AssignmentID}</p>
          </li>
        ))}
      </ul>

      <h2>Questions and Sub-Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>Question Title: {question.Title}</p>
            <ul>
              {getSubQuestionsForQuestion(question.id).map((subQuestion) => (
                <li key={subQuestion.id}>Sub-Question: {subQuestion.Title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RubricComponent;

