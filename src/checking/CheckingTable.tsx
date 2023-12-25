// import Table from 'react-bootstrap/Table';
import './AppAssignmentTable.css'
import { useState,useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap';
import checkIcon from "../../../images/check-icon.png"
import seeIcon from "../../../images/see-icon.png"
// import ApiService from 'Repository/ApiService';
// import HttpService from 'http-service/HttpService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface RubricQuestion {
  RubricID: string;
  QuestioniD: string;
  QuestionText: string;
  // Add more properties as needed
}

interface RubricSubQuestion {
  RubricID: string;
  QuestionID: string;
  QuestionText: string;
  // Add more properties as needed
}


interface ResponseDataType {
  Response: RubricQuestion[];
}

interface MyObject {
  RubricID: any;

  // Add other properties as needed
}
type Post = {
  RubricID: string,
  Title: string,
  Points: string,


};

type RubricType = {
  RubricID: string,



};



const AppAssignmentTable = () => {
  const [studentData, setStudentData] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rubric, setRubric] = useState<RubricType[]>([]);
  // const [rubric, setRubric] = useState([]);
  // uniques k lye
  const [questions, setQuestions] = useState<RubricQuestion[]>([]);
  const [subQuestions, setSubQuestions] = useState<RubricSubQuestion[]>([]);

  // const handle = () => {
  //   setStudentData(true)
  // }

    let navigate=useNavigate()


    useEffect(() => {
        axios.get("http://localhost:3000/Rubric").then((response) => {
          setRubric(response.data);
        });
      }, []);
      
      useEffect(() => {
        if (rubric.length > 0) {
          rubric.map((value)=>{
              axios.get("http://localhost:3000/Questions").then((response) => {
                  setQuestions(response.data);
                });
      
          })
      
         
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
        return subQuestions.filter((subQuestion:any) => subQuestion.id === questionId);
      };
//   const data = {
//     // "AssignmentID": "04BFF5A5-BF07-4214-9BDE-0626CFB978BF"
//     "AssignmentID": "C963A808-8EF1-431B-8D3D-EAFC2FD8E245"
//     // "AssignmentID": assignmentId.toString()

//   }

//   useEffect(() => {

//     ApiService.create(data, "GetRubric")
//       .then((response) => {

//         setRubric([...response.data.Response]);
//       })
//       .catch((error) => {
//         console.error("Axios Error:", error);
//         // Handle the error, e.g., display an error message to the user.
//       });

//   }, []);

//   console.log(rubric, "rubric Data")




//   useEffect(() => {

//     rubric.map((rubric) => {

//       const rubricID = {
//         "RubricID": rubric.RubricID
//       }
//       console.log(rubricID, 'chech rubric id loop')

//       ApiService.create(rubricID, "GetRubricQuestion")
//         // axios.post('http://192.168.5.52:9870/GetRubricQuestion',rubricID)
//         .then((response) => {

//           setQuestions([...questions, ...response.data.Response]);
//         })
//         .catch((error) => {
//           console.error("Axios Error:", error);
//           // Handle the error, e.g., display an error message to the user.
//         });

//     })




//   }, [rubric]);
//   console.log(questions, 'question data')




//   // get rubric Sub question
//   useEffect(() => {
//     if (questions.length > 0) {

//       questions.map((question) => {
//         const QuestioniD = {
//           "QuestioniD": question.QuestioniD
//         }
//         console.log(QuestioniD, 'questionid map sub question k andar')

//         ApiService.create(QuestioniD, "GetRubricSubQuestions")
//           // axios.post('http://192.168.5.52:9870/GetRubricSubQuestions',QuestioniD)
//           .then((response) => {
//             console.log(response)
//             setSubQuestions((prevQuestions) => [
//               ...prevQuestions,
//               ...response.data.Response
//             ])
//           }).catch((e) => {
//             console.log(e, "get sub question error")

//           })

//       })


//       //   const QuestioniD={
//       //       "QuestionID": "9BEEAF54-C198-482B-8FBC-8D1C47982251"
//       // }
//       //   ApiService.create(QuestioniD, "GetRubricSubQuestions").then((response) => {
//       //     setSubQuestions(response.data.Response);
//       //   });
//     }
//   }, [questions]);

//   console.log(subQuestions, "sub question data")

//   const getSubQuestionsForQuestion = (questionId: any) => {
//     return subQuestions.filter((subQuestion: any) => subQuestion.questionId === questionId);
//   };

  const nextRoute=(QuestioniD:string,RubricID:string,Points:string,Title:string)=>{
        console.log(QuestioniD,RubricID,Points,Title)

        navigate('/assignment-create-answer',{ state: {
          QuestioniD,
          StudentId:"80D12B35-0FBC-4D66-9270-E3EC09FF9D2D",
          RubricID,
          Points,
          Title
          
        } })
       

  }

  const nextRouteSub=(SubQuestionID:string,QuestioniD:string,Points:string,Title:string)=>{
    console.log(SubQuestionID,QuestioniD,Points,Title)
    navigate('/assignment-create-answer',{ state: {
      
      SubQuestionID,
      QuestioniD,
      StudentId:"80D12B35-0FBC-4D66-9270-E3EC09FF9D2D",
      Points,
      Title,
  
    } })


  }



  return (
    <table  >
      <thead>
        <tr>
          <th className='heading'><h6 className="mb-4 text-dark">Question</h6></th>
          <th className='heading'><h6 className="mb-4 text-dark">Points</h6></th>
          <th className='heading'><h6 className="mb-4 text-dark">Progress</h6></th>
          <th className='heading'><h6 className="mb-4 text-dark">Graded By</h6></th>
        </tr>


        <th colSpan={4}> <hr className="dashed" /> </th>


      </thead>


      <tbody>
        {questions ?
          (
            <>


{questions.map((question: any, index) => (

                  <>
                
              <tr onClick={()=>nextRoute(question.QuestioniD,question.RubricID,question.Points,question.Title )} >
                <td className='sub-heading'>{index + 1}: {question.Title}</td>
                <td className='sub-heading'>{question.Points}</td>
                <td className='sub-heading'></td>
                <td className='sub-heading'></td>
              </tr>



                    {getSubQuestionsForQuestion(question.id).map((subQuestion: any, index) => (
                   

                        <tr onClick={()=>nextRouteSub(subQuestion.SubQuestionID,question.QuestioniD,subQuestion.Points,subQuestion.Title )}>
                          <td className='sub-heading'>1.1: {subQuestion.Title}</td>
                          <td className='sub-heading'>{subQuestion.Points}</td>
                          <td className='sub-heading d-flex align-items-center gap-1'> 0%</td>
                          <td className='sub-heading'></td>
                        </tr>



                    )

                    )}


         </>

                ))}



         
            
            </>
          ) : (
            <tr>
              <td colSpan={4}>
            <div className='emp-data'>
              <p>You students have not submitted anything yet.</p>
              <p>C Submissions will show up here as your students submit work.</p>
            </div>
            </td>
            </tr>
          )}
      </tbody>
    </table>
  )
}

export default AppAssignmentTable