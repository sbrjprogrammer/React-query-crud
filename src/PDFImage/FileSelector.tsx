import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


interface FileWithPreview extends File {
  preview: string;
  path: string;
  onFilesSelected: (files: FileWithPreview[]) => void;
}


interface FileText{
  heading: string
  subHeading: string
  onFilesSelected: any


}



const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};


const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '2px dashed #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};


const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};


const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%',
};


function AppFilePicker({heading, subHeading,onFilesSelected}: FileText) {


  const [files, setFiles] = useState<FileWithPreview[]>([]);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'application/pdf':['.pdf']
    },
    onDrop: (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 5) {
        alert('you can a maximum of 5 files, 5MB each, (Excel, Word, PDF, Jpg)');
      } else {
      const filesWithPreview = acceptedFiles.map((file) => ({
       
        ...file,
       
        preview: URL.createObjectURL(file),
       
      })) as FileWithPreview[];


      setFiles(filesWithPreview);
      console.log(filesWithPreview)
     
    }
    },
  });


  const thumbs = files.map((file) => (


    // <div style={thumb} key={file.name}>
    //   <div style={thumbInner}>
    //     <img
    //       src={file.preview}
    //       style={img}
    //       alt='assign-picker'
    //       // Revoke data uri after image is loaded
    //       onLoad={() => {
    //         URL.revokeObjectURL(file.preview);
    //       }}
    //     />
    //   </div>
    // </div>


<div style={thumb} key={file.name}>
  <div style={thumbInner}>
    {file.path && file.path.toLowerCase().endsWith('.pdf') ? (
      // Display PDF using an iframe
      <iframe
        src={file.preview}
        title="PDF Preview"
        width="100%"
        height="500px" // Adjust the height as needed
      />
    ) : file.path && file.path.toLowerCase().endsWith('.png') ? (
      // Display image preview for PNG files
      <img
        src={file.preview}
        style={img}
        alt='assign-picker'
        // Revoke data URI after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    ) : (
      // Handle other file types as needed
      <div>Unsupported file type</div>
    )}
  </div>
</div>


 


  ));
  console.log(thumbs, "pdf")


  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);


  return (
    <section className="container p-0 mt-5" >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='d-flex align-items-center gap-5'>
          <div>
            <img src="images/upload-icon.png" alt="upload-icon" />
          </div>
          <div>
            <span>{heading}</span>
            <br></br>
            <span>{subHeading}</span>
          </div>
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}


export default AppFilePicker;


