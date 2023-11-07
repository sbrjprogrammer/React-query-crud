import React, { useEffect,useState } from 'react'
import axios from 'axios'

function PdfImageTag() {
const [data, setData] = useState([])

const [rubric, setRubric] = useState([]);
const [questions, setQuestions] = useState([]);
const [subQuestions, setSubQuestions] = useState([]);
// const [clickQuestion, setclickQuestion] = useState({});
// const [clickImage, setClickImage] = useState({});
const [dataform, setdataform] = useState({
    rubricItem: "",
    questionTitle:"",
    assignmentID:"",
          page: 0,
             image: "",

});

const [mergedObjects, setMergedObjects] = useState([]);


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
  return subQuestions.filter((subQuestion) => subQuestion.id === questionId);
};


// const getclickByQuestion = (rubricItem, questionTitle, assignmentID) => {
//     const mergedObject = {
//       item: rubricItem,
//       questionTitle: questionTitle,
//       assignmentID: assignmentID,
//       ...clickImage,
//     };

//     setMergedObjects((prevObjects) => [...prevObjects, mergedObject]);
//   };

//   const getclickByImage = (page, image) => {
//     const mergedObject = {
//       ...clickQuestion,
//       page: page,
//       image: image,
//     };

//     setMergedObjects((prevObjects) => [...prevObjects, mergedObject]);
//   };


const getclickByQuestion = (rubricItem, questionTitle, assignmentID) => {
  

    setdataform({
        ...dataform,
        rubricItem,
        questionTitle,
        assignmentID

    })
  };

  const getclickByImage = (page, image) => {
   
    setdataform({
        ...dataform,
        page,
        image,
       

    })
    setMergedObjects([...mergedObjects,dataform])
   
  };
console.log(dataform)
  console.log(mergedObjects)

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
        .then((response)=>{
            console.log(response.data.products)
            setData(response.data.products)

        })
        .catch((e)=>{
            console.log(e.message)
        })
    }, [])
  return (
    <div className='row'>
            <div className='col-md-4'>
            <div>
      <h2>Rubric</h2>
      <ul>Total
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
            <p  onClick={()=>getclickByQuestion("rubric.Item",question.Title,"rubric.AssignmentID")}>Question Title: {question.Title}</p>
            <ul>
              {getSubQuestionsForQuestion(question.id).map((subQuestion) => (
                <li  key={subQuestion.id}>Sub-Question: {subQuestion.Title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
            </div>

            <div className='col-md-8'>
            {
  data && data.length > 0 ? (
    data.map((value, index) => {
      return (
        //   <h2>page {index+1}</h2>
        <div onClick={()=>getclickByImage(index,"image")} key={index} style={{width:"100px",height:"500px"}}>
          
          <img src={value.images[0]} alt="" />
       
        </div>
      );
    })
  ) : (
    <p>No images to display</p>
  )
}
            </div>


    </div>
  )
}

export default PdfImageTag