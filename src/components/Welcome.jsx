import React from "react";
import {Button} from "@mui/material";

import { useNavigate } from 'react-router-dom';
import '../styles/welcome.scss'

function Welcome () {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/quiz")
      }; 

    return(
        <>
            <div className="welcome-container">
                <h1>Welcome to my quiz</h1>
                <Button className="welcome-button" variant="outlined" onClick={handleClick}>Start</Button>
            </div>
        </>
    )
}

export default Welcome;