import React from 'react';
import {START, PATTERN, GAMEOVER, BUTTONS} from "./gameStates";

function Footer({score, gameState, isHighScore}) {

        if(gameState === START) {
            return (<div className={"full"}>Mouse over each picture to hear the sound!</div>)
        } else if(gameState === GAMEOVER){
            return (<div className={"full"}>{isHighScore && 'Congratulations on a new High Score'}</div>)
        } else {
            return (<div className={"full"}>Current Score: {score}</div>)
        }

}

export default Footer
