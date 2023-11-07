import { useState } from "react";
import { useFormik } from "formik";
import { usePostData } from "../customHook/usePostData";
import AppFilePicker from "./FileSelector";

type Post = {
  Name: string;
  FileExt: string;
};


const InstructAssignment = () => {
  const [activeTab, setActiveTab] = useState('step1');
  const [file,setFile]=useState()
  const { mutate } = usePostData(['create-Assignment'], async (data: any) => {
    const body = {
      Name: `${data.Name}`,
      FileExt: `${data.FileExt}`,
    };
    console.log(data);
    // You can perform further operations with the received data here
  });
  const FileSlected=(file)=>{
    setFile(file)
  }

  const HandleFormValidation = useFormik({
    initialValues: {
      Name: '',
      FileExt: '',
    },
    onSubmit: (values: Post) => {
      console.log(values);
      mutate(values);
      setActiveTab('step1');
      // You can add more operations here if needed
    },
  });

  return (
    <>
      <div id="kt_body" className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled toolbar-fixed aside-enabled aside-fixed" style={{ backgroundColor: '#efefef' }}>
      </div>
      <form onSubmit={HandleFormValidation.handleSubmit}>
        <div className="row">
          <div className="col-lg-12 fv-row">
            <label className="col-lg-12 col-form-label required fw-bold fs-4 modal-heading">Assignment Name</label>
            <input required type="text" onChange={HandleFormValidation.handleChange} value={HandleFormValidation.values.Name} name="Name" className="form-control form-control-lg form-control-solid mb-3 mb-lg-0 effect-3d" />
          </div>
        </div>
        <div>
            <AppFilePicker  heading="Upload Files"
        subHeading="Drag 'n' drop some files here, or click to select files"
        onFilesSelected={setFile}
        />
        </div>
        <div className="row d-flex justify-content-end" >
          <button className="btn btn-primary effect-outer px-10 mt-10" style={{ width: '13rem' }} type="submit" >Create <img src="/images/next-icon.png" alt="Next" /></button>
        </div>
      </form>
      <div className="footer-modal">
        {activeTab === 'step1' ? (
          <button className="btn btn-primary effect-outer px-10" onClick={() => setActiveTab('step2')}>  Next <img src="/images/next-icon.png" alt="Next" /></button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default InstructAssignment;
