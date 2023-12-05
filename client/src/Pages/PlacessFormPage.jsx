import {useState} from 'react'
import Perks from './Perks'
import PhotosUploader from '../PhotosUploader'
import AccountNav from './AccountNav';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
const PlacessFormPage = () => {


    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    console.log(checkOut,"55555555");
    const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);



    function inputHeader(text) {
      return <h2 className="text-2xl mt-4">{text}</h2>;
    }
  
    function inputDescription(text) {
      return <p className="text-gray-500 text-sm">{text}</p>;
    }
  
    function preInput(header, description) {
      return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
      );
    }
  
  async  function addNewPlace(e) {
    e.preventDefault();
    
   await axios.post('/places',{
    title, address, 
    description, perks, extraInfo,
    checkIn, checkOut, maxGuests,addedPhotos
   })  
    setRedirect(true);
  }
  

  if (redirect) {
  return <Navigate to={'/account/places'}/>
}

  return (
    <div>
      <AccountNav/>
    <form onSubmit={addNewPlace}>
      {preInput(
        "Title",
        " title for your place . should be shoart and catchey as inadvertisement"
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title for example: my lovely apt"
      />

      {preInput("Address", "Address to this place")}
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="address"
      />

      {preInput("photos", "more = better")}

     <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

      {preInput("Description", " Description of the place")}

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {preInput("Perks", "select all the perks of your place")}

      <div className="grid mt-2 gap-1 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <Perks selected={perks} onChange={setPerks} />
      </div>

      {preInput("Extra Info", "house rules,etc")}
      <textarea
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />

      {preInput(
        "CheckIn & CheckOut, times",
        "Add checkin and out times , remember to have time window for cleaning the room be like between guests"
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        <div>
          <h3 className="mt-2 -mb-1">Check in Time</h3>
          <input
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            type="text"
            placeholder="14"
          />
        </div>
        <div>
<h3 className="mt-2 -mb-1">Check Out Time</h3>
<input
value={checkOut}
onChange={(e) => setCheckOut(e.target.value)}
type="text"
placeholder="11"
/>
</div>

        <div>
          <h3 className="mt-2 -mb-1">Max Number Of Guests</h3>

          <input
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            type="number"
            placeholder="1"
          />
        </div>
      </div>
      <div>
        <button
          className="primary my-4"
          style={{ maxWidth: "125px", marginLeft: "290px" }}
        >
          Save
        </button>
      </div>
    </form>
  </div>
  )
}

export default PlacessFormPage
