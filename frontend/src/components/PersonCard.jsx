import React from "react";

export const PersonCard = (props) => {
  const { person } = props;
  return <div className="person">
    <div>
      <span>{person.name.title}</span>
      <span>{person.name.first}</span>
      <span>{person.name.last}</span>
    </div>
    <div>
      <span>Gender:</span>
      <span>{person.gender}</span>
    </div>
    <div>
      <span>Country:</span>
      <span>{person.location.country}</span>
    </div>
    <div>
      <span>Phone number:</span>
      <span>{person.phone}</span>
    </div>
    <div>
      <span>Email:</span>
      <span>{person.email}</span>
    </div>
  </div>;
}
