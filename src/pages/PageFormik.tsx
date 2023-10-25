import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik';
import { usePostData } from '../customHook/usePostData'; // Import your custom hook

type YourFormValuesType = {
  CourseNo: string;
  CourseName: string;
  CourseDescription: string;
  EntryDate: Date;
  CourseCode: string;
  SchoolID: string;
};

const InstructCreateCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');
  const [entryCode, setEntryCode] = useState(false);

  const { mutate: createCourseMutation, error: createCourseError } = usePostData(['create-course'], (values: YourFormValuesType) => {
    return new Promise((resolve, reject) => {
      // Make your API call using axios here
      const body = {
        CourseNo: values.CourseNo,
        CourseName: values.CourseName,
        CourseDescription: values.CourseDescription,
        EntryDate: values.EntryDate,
        CourseCode: values.CourseCode,
        SchoolID: values.SchoolID,
      };
  
      setLoading(true);
      setData(true);
      setIsModalOpen(false);
  
      axios
        .post('http://localhost:5000/addRegion', body)
        .then((response) => {
          console.log(response);
          // Handle the response as needed
          setLoading(false);
          resolve(response.data); // Resolve the Promise with the response data
        })
        .catch((error) => {
          setLoading(false);
          seterror(error);
          reject(error); // Reject the Promise with the error
        });
    });
  });
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const HandleFormValidation = useFormik<YourFormValuesType>({
    initialValues: {
      CourseNo: '',
      CourseName: '',
      CourseDescription: '',
      EntryDate: new Date(),
      CourseCode: '',
      SchoolID: '',
    },
    onSubmit: (values: YourFormValuesType, { setSubmitting }: FormikHelpers<YourFormValuesType>) => {
      // Use your custom mutation function for making the POST request
      createCourseMutation(values);
    },
  });

  return (
    <div id="kt_body" className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed" style={{ backgroundColor: '#efefef' }}>
      {/* Your layout and content here */}
      <form onSubmit={HandleFormValidation.handleSubmit}>
        <div className="row">
          <div className="col-lg-6 fv-row">
            <label className="col-lg-12 col-form-label required fw-bold fs-6">Course Name</label>
            <input
              onChange={HandleFormValidation.handleChange}
              name="CourseName"
              value={HandleFormValidation.values.CourseName}
              type="text"
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0 effect-3d"
              required
            />
            {/* Add other form fields here */}
          </div>
        </div>
        <div className="col-12">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            <button onClick={closeModal} className="btn px-4 py-2 btn-discard course-headings">
              <img src="images/closesquare.png" alt="close-icon" /> Discard
            </button>
            <button type="submit" className="btn btn-primary px-4 py-2 d-flex align-items-center gap-4">
              Create <img src="images/ticksquare.png" alt="ticksquare" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstructCreateCourse;




