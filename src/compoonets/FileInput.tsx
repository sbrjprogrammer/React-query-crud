import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const FileInput = (props) => {
  const wrapperRef = useRef(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.onFileChange(file);
  }, [file]);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {

    setOpen(false);
  };

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type === 'application/pdf') {
      setFile(newFile);
    } else {
      setOpen(true);
    }
  };

  const returnSize = (file) => {
    const fileSizeInBytes = file.size;
    let fileSize;

    if (fileSizeInBytes >= 1048576) {
      fileSize = (fileSizeInBytes / 1048576).toFixed(2) + ' MB';
    } else {
      fileSize = (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    }
    return fileSize;
  };

  return (
    <>
      {!file && (
        <div
          className="drop-file-input"
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            {/* <img src={uploadImg} alt="" /> */}
            <p>Drag & Drop your files here</p>
          </div>
          <input type="file" accept=".pdf" value="" onChange={onFileDrop} />
        </div>
      )}
      {file && (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Uploaded file</p>
          <div className="drop-file-preview__item">
            {/* <img src={filePdf} alt="PDF Icon" /> */}
            <div className="drop-file-preview__item__info">
              <p>{file.name}</p>
              <p>{returnSize(file)}</p>
            </div>
            <button onClick={() => setFile(null)}>Close</button>
          </div>
        </div>
      )}
      {open && (
        <div className="snackbar" onClick={handleClose}>
          <p>Please upload pdf only</p>
        </div>
      )}
    </>
  );
};

FileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default FileInput;
