import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container, Logo, AppName, Tooltip } from './StartUpStyles';
import logoImage from '../images/logo/logo_startup.png';
import logoGif from '../images/logo/logo_animation.gif';

const StartUp = () => {
  const navigate = useNavigate();
  const [inProp, setInProp] = useState(true);
  const [logoSrc, setLogoSrc] = useState(logoImage);
  const [tooltipText, setTooltipText] = useState("Click anywhere to start");

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Hide overflow when exit starts
    // Cleanup function to reset overflow style when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClick = () => {
    setLogoSrc(logoGif);
    setTooltipText("Harmonic hunch launching... Prepare for take off!"); // Change the tooltip text
    const gifDuration = 5400; // Duration of the GIF in milliseconds
    setTimeout(() => {
      setTooltipText("")
      setInProp(false);
    }, gifDuration); // Change the logo to the GIF
  }

  return (
    <div>
      <CSSTransition in={inProp} timeout={500} classNames="startup" onExited={() => {
          navigate('/home');
        }}>
        <Container onClick={handleClick}>
          <Logo src={logoSrc} alt="logo" /><Tooltip>{tooltipText}</Tooltip>
        </Container>
      </CSSTransition>
    </div>
  );
}

export default StartUp;