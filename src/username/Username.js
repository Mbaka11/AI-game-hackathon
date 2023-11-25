import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { UsernameContainer, UsernameTitle, UsernameInput } from './UsernameStyles';

const Username = () => {
  const location = useLocation();
  const roomNumber = location.state?.roomNumber;

  return (
    <UsernameContainer>
        {roomNumber && <p>Room Number: {roomNumber}</p>}
        <UsernameTitle>Enter an username</UsernameTitle>
        <UsernameInput type="text" placeholder="Username" />
    </UsernameContainer>
  );
};

export default Username;