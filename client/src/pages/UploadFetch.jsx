import React, { useState } from 'react';
import axios from "axios";

const UploadAndFetchPDF = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(
        " http://localhost:4000/upload-pdf", 
        {
          headers:{
            cookies: "iuwecdibewicyuwiub2efi8923gf38v3g"
          }
        },
        { withCredentials: true }
      );

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFetchPDF = async () => {
    try {
      const response = await fetch(' http://localhost:4000/fetch-pdf', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'file.pdf';
        link.click();
      } else {
        console.error('Failed to fetch PDF file');
      }
    } catch (error) {
      console.error('Error fetching PDF file:', error);
    }
  };

  return (
    <div>
      <h2>Upload and Fetch PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleFetchPDF}>Fetch PDF</button>
    </div>
  );
};

export default UploadAndFetchPDF;
