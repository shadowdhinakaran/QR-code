//import React from 'react'
import { useState } from 'react';
import './App.css'

const App = () => {
  const [img,setImag] = useState("");
  const [loading,setLoading] = useState(false);  
  const [qrData,setQrData] = useState("");
  const [qrSize,setQrSize] = useState("");

  async function generateQR(){
    setLoading(true);
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImag(url);
    }catch(error){
     console.error("Error generating QR code",error);
    }finally{
      setLoading(false);
    }
  }
  function downloadQR(){
    fetch(img)
    .then((Response)=>Response.blob())
    .then((blob)=>{
     const link=document.createElement("a");
     link.href = URL.createObjectURL(blob);
     link.download = "shadow-qr-code.png";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
    }).catch((error)=>{
      console.error("Error downloading QR code",error);
    });
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>please wait ....</p>}
     {img &&  <img src={img} alt="" className='QR-code-image'/>}
    <div>
      <label htmlFor="datainput" className='input-label'>
        Data for QR code
      </label>
      <input type='text' id='datainput' value={qrData} placeholder='Enter data for QR code' onChange={(e)=>setQrData(e.target.value)}/>
      <label htmlFor="sizeinput" className='input-label'>
        Image size(e.g..150)
      </label>
      <input type='text' id='sizeinput'value={qrSize} placeholder='Enter Image size' onChange={(e)=>setQrSize(e.target.value)}/>
      <button className='generate-button'disabled={loading} onClick={generateQR}>Generate QR code</button>
      <button className='download-button'onClick={downloadQR}>Download QR code</button>
    </div>
    <p className='footer'>Designed by <a href='https://github.com/'>dhinakaran</a></p>
    </div>
  )
}

export default App;
