import React, {useContext, useEffect, useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {serverUrl} from "../config";
import {PeopleContext} from "../context/PeopleContext";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [person, setPerson] = useState(location.state?.person);
  const [name, setName] = useState({ first: '', last: '' });
  const [isFromDB, setIsFromDB] = useState(false);
  const [loading, setLoading] = useState(true);
  const { people, setPeople } = useContext(PeopleContext);

  useEffect(() => {
    if (!person) {
      console.log("Fetching profile from DB");
      axios.get(`${serverUrl}/api/people/${id}`)
      .then(response => {
        setPerson(response.data);
        setName({ first: response.data.name.first, last: response.data.name.last });
        setIsFromDB(true); // Assuming the profile exists in DB if fetched from here
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
    } else {

      // Check if this person is already in our DB
      axios.get(`${serverUrl}/api/people/check/${person.login.uuid}`)
      .then(response => {
        setIsFromDB(response.data.exists);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error checking if person exists:", error);
        setLoading(false);
      });

      setName({ first: person.name.first, last: person.name.last });
    }
  }, [id, person]);

  const handleSave = () => {
    axios.post(`${serverUrl}/api/people`, person)
    .then(() => {
      console.log("Saved to DB");
      setIsFromDB(true); // Now it's in the DB
    })
    .catch(error => console.error("Error saving profile:", error));
  };

  const handleDelete = () => {
    axios.delete(`${serverUrl}/api/people/${id}`)
    .then(() => {
      console.log("Profile deleted from DB");
      navigate(-1); // Go back to the previous screen
    })
    .catch(error => console.error("Error deleting profile:", error));
  };

  const handleUpdate = () => {
    const updatedPerson = {
      ...person,
      name: {
        ...person.name,
        first: name.first,
        last: name.last
      }
    };

    if (isFromDB) {
      console.log("Updating profile in DB", updatedPerson);
      axios.put(`${serverUrl}/api/people/${id}`, updatedPerson)
      .then(() => console.log("Profile updated in DB"))
      .catch(error => console.error("Error updating profile:", error));
    } else {
      console.log("Updating profile in state");
      setPerson(updatedPerson); // update local state
      setPeople(people.map(p => p.login.uuid === person.login.uuid ? updatedPerson : p));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;

  const pLocation = person.location;
  const street = pLocation?.street;
  const dob = person.dob;
  return (
    <div className="profile">
      <img src={person.picture.large} alt={`${person.name.first} ${person.name.last}`}/>
      <form>
        <div className="formGroup">
          <label>Gender:</label>
          <span>{person.gender}</span>
        </div>
        <div className="formGroup">
          <label>Name:</label>
          <input
            type="text"
            value={name.first}
            onChange={(e) => setName({...name, first: e.target.value})}
          />
          <input
            type="text"
            value={name.last}
            onChange={(e) => setName({...name, last: e.target.value})}
          />
        </div>
        <div className="formGroup">
          <label>Age:</label>
          <span>{dob?.age} ({new Date(dob?.date).getFullYear()})</span>
        </div>
        <div className="formGroup">
          <label>Address:</label>
          <p>Street: {street?.number} {street?.name}</p>
          <p>City: {pLocation?.city}</p>
          <p>State: {pLocation?.state}</p>
        </div>
        <div className="formGroup">
          <label>Contact:</label>
          <p>Email: {person.email}</p>
          <p>Phone: {person.phone}</p>
        </div>
        <div className="buttonGroup">
          <button type="button" onClick={handleSave} disabled={isFromDB}>Save</button>
          <button type="button" onClick={handleDelete} disabled={!isFromDB}>Delete</button>
          <button type="button" onClick={handleUpdate}>Update</button>
          <button type="button" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
