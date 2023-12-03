import React, { useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotosUploader from "../PhotosUploader";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink,setPhotoLink]=useState('')
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
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
          <form >
            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: My lovely apt" />

            {preInput('Address', 'Address to this place')}
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />

            {preInput('Photos', 'more = better')}
            <PhotosUploader  addedPhotos={addedPhotos}  />  addPhotoByLinkzzzzz

            {preInput('Description', 'description of the place')}
            <textarea value={description} onChange={e=>setDescription(e.target.value)} />

            {preInput('Perks', 'select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {/* <Perks selected={perks} onChange={setPerks()}/> */}
            </div>

            {preInput('Extra info', 'house rules, etc')}
            <textarea  value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} />

            {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="14" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input type="text"  value={checkOut} onChange={e=>setCheckOut(e.target.value)} placeholder="11" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)}  />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input type="number" value={price} onChange={e=>setPrice(e.target.value)} />
              </div>
            </div>

            <button className="bg-primary text-white py-2 px-4 rounded-full my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
