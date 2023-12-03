import React, { useState } from "react";
import { Form, Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from 'axios';

const PlacesPageR = () => {
    const { action } = useParams();
    
    const [title, setTitle] = useState('')
    const [address,setAddress]=useState('')
    const [addedPhotos,setAddedPhotos]=useState([])
    const [photoLink,setPhotoLink]=useState('')
    const [description,setDescription]=useState('')
    const [perks,setPerks]=useState([])
    const [extraInfo,setExtraInfo]=useState('')
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [maxGuests,setMaxGuests]=useState(1)

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>

        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">
            {text}
          </p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
  }
  
  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post('/upload/by-link', { link: photoLink });
    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  
 async function uploadPhoto(e) {
    const files = e.target.files;
   const datas = new FormData();
  
    datas.set('photos', files[0]);
 
   

   const response = await axios.post('/upload', datas, {
      headers:{'Content-type':'multipart/form/data'}
   });
   
   const { data: filename } = response;
   
   setAddedPhotos(prev => {
     return [...prev, filename]
   })
  }


  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
                  <form>
                      {preInput('Title', ' title for your place . should be shoart and catchey as inadvertisement')}
                      <input type="text" value={title} onChange={e=> setTitle(e.target.value)} placeholder="title for example: my lovely apt" />

                      {preInput('Address', 'Address to this place')}
            <input type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="address" />
                      
{preInput('photos' , 'more = better')}
            
            <div className="flex gap-2">
              <input value={photoLink} onChange={e=>setPhotoLink(e.target.value)} type="text" placeholder="Add using a Link ... jpg" />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photos
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
  <div key={index}>
    <img className="rounded-2xl" src={"http://localhost:4000/uploads/"+link} alt="" />
  </div>
))}
              <label className=" cursor-pointer flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
              <input type="file" className="hidden" onChange={uploadPhoto}/>      

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload 
              </label>
            </div>



            {preInput('Description', ' Description of the place')}

            <textarea value={description} onChange={e=>setDescription(e.target.value)} />
            {preInput('Perks', 'select all the perks of your place')}

          
            <div className="grid mt-2 gap-1 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput('Extra Info', 'house rules,etc')}
            <textarea  value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}/>

            {preInput('CheckIn & CheckOut, times', 'Add checkin and out times , remember to have time window for cleaning the room be like between guests')}

          
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in Time</h3>
                <input value={checkIn} onChange={e=>setCheckIn(e.target.value)} type="text" placeholder="14" />
              </div>
              <div>
                <h3 value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="mt-2 -mb-1" placeholder="11">Check Out Time</h3>

                <input type="text" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Number Of Guests</h3>

                <input value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} type="number" placeholder="1" />
              </div>
            </div>
            <div>
              <button className="primary my-4" style={{maxWidth:'125px', marginLeft:'290px'}}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPageR;
