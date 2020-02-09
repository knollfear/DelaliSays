import React, { useState}from 'react';

function StartArea(props) {
    return(
        <div className={'main-area'}>
                <div className={"previewArea"}>
                    <div className={"row"}> {props.buttons.map((button) => {
                        return (<div className={"column"}>
                            <div>
                            <img className={"pattern-img"} onMouseEnter={() => button.play()}  alt={button.txt} src={button.img}/>
                            </div>
                            <div onMouseEnter={() => button.play()}>
                                {button.txt}

                            </div>
                        </div>)
                     })}
                    </div>
                    <div className={"inverse"} onClick={() => props.onclick()}>Let's Go</div>
                </div>
        </div>
    )

}

export default StartArea
