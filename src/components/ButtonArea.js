import React from 'react';

function ButtonArea(props) {
    return (
        <div className={'main-area'}>
            <div className={"button-area "}>

                <div className={"row"}> {props.buttons.map((button) =>{
                    return (<button onClick={() => {
                        button.play();
                        props.buttonClick(button.txt)
                    }} className={"column"} key={button.txt}>{button.txt} </button>)
                })}
                </div>
            </div>
        </div>
    )
}
export default ButtonArea
