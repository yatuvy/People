import React, {useContext, useEffect, useState} from "react";
import {PersonCard} from "../components/PersonCard";
import {useNavigate} from "react-router-dom";
import {PeopleContext} from "../context/PeopleContext";

const People = () => {

  const { people } = useContext(PeopleContext);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  console.log("Render People Page", people);

  useEffect(() => {
    // Filter people based on name and country when filters change
    const filtered = people.filter(person => {
      const fullName = `${person.name.first} ${person.name.last}`.toLowerCase();
      const matchesName = fullName.includes(nameFilter.toLowerCase());
      const matchesCountry = person.location.country.toLowerCase().includes(countryFilter.toLowerCase());
      return matchesName && matchesCountry;
    });
    setFilteredPeople(filtered);
  }, [nameFilter, countryFilter, people]);

  return (
    <div>
      <h1>Cool People App</h1>
      <div>
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
      </div>
      <div className="people">
        {filteredPeople.map((person) => {
          console.log("Person:", person);
          const handleCardClick = () => navigate(`/profile/${person.login.uuid}`, {state: {person}});
          return <div className="personContainer" onClick={handleCardClick}>
            <img src={`${(person.picture.thumbnail)}`} alt=""/>
            <PersonCard person={person}/>
          </div>
        })}
      </div>
      {filteredPeople.length === 0 && "No results found."}
    </div>
  );
};

export default People;
