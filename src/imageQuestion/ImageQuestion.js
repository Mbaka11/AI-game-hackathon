import React from "react"; 
import PixelizeImage from "../Question/PixelizeImage";
import songData from "../songs.json";
import { useLocation } from "react-router-dom";
import Clock from "../clock/Clock";

const ImageQuestion = ({questionFinished}) => {
    const location = useLocation();
    const questionId = location.state?.questionId || 0;
    const question = songData.mode2[questionId]

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <PixelizeImage duration={5} imageName={question.path} />
          <Clock questionFinished={questionFinished} mode={2}/>
        </div>
      </div>
  );
};
export default ImageQuestion;
