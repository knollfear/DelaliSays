import React, { useEffect } from "react";
import Soundfont from 'soundfont-player';

function PatternArea({speed, currentButton, movePattern}) {

    currentButton.play();

    setTimeout(() => {  movePattern() }, speed*1000);


    return(
        <div className={"full main-area center"}>
            <img className={"pattern-img w3-animate-zoom"} src={currentButton.img} alt={currentButton.txt}/>
        </div>

    )

}
export default PatternArea
