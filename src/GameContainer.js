import React from 'react';
import Header from "./components/Header";
import PatternArea from "./components/PatternArea";
import ButtonArea from "./components/ButtonArea";
import Footer from "./components/Footer";
import OptionsModal from "./components/OptionsModal";
import StartArea from "./components/startArea";
import Soundfont from "soundfont-player";
import {START, PATTERN, GAMEOVER, BUTTONS} from "./components/gameStates";
import {FEARLESS} from "./components/FEARLESS";

class GameContainer extends React.Component  {

    constructor(props){
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
        this.advancePattern = this.advancePattern.bind(this);
        this.getRandomButton = this.getRandomButton.bind(this);
        this.startGame = this.startGame.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        let activeButtons = this.getInitialButtons(4);

        this.state = {
            score:5,
            pattern:[activeButtons[0],],
            patternPosition: 0,
            activeButtons:activeButtons,
            speed:.7,
            showPattern:true,
            gameOver:false,
            gameState: START,
            modalIsOpen: false
        }

    }

    buttonClick(txt){
        let isCorrect = txt === this.state.pattern[this.state.patternPosition].txt;
        console.log(isCorrect);
        console.log(this.state.pattern);
        if (isCorrect){
            if (this.state.patternPosition + 1 === this.state.pattern.length){
                setTimeout(() =>{ this.endRound()}, this.state.speed * 2 * 1000);

            }
            else{
                this.advancePattern()
            }


        } else{
            let oldHighScore = localStorage.getItem('highScore') ?  parseInt(localStorage.getItem('highScore')) : 0;
            localStorage.setItem('highScore', Math.max(this.state.score, oldHighScore).toString());
            let activeButtons = this.getInitialButtons(4);
            let isHighScore = this.state.score > oldHighScore;
            this.setState({
                pattern:[activeButtons[0],],
                patternPosition: 0,
                activeButtons:activeButtons,
                gameState:GAMEOVER,
                isHighScore:isHighScore,

            })

        }
    }

    getRandomButton(){

        return this.state.activeButtons[Math.floor(Math.random() * this.state.activeButtons.length)]
    }

    startGame(){
        this.setState({gameState:PATTERN, score:0})
    }

    tryAgain(){
        this.setState({gameState:START, score:0})
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    endRound(){

        console.log("ending round");
        if (this.state.gameState === PATTERN){
           this.setState({
               gameState:BUTTONS,
               patternPosition: 0
           })
        } else {
            let newPattern = this.state.pattern.slice();
            newPattern.push(this.getRandomButton());
            this.setState({
                pattern: newPattern,
                score: this.state.score + 1,
                patternPosition: 0,
                gameState:PATTERN
            })
        }
    }

    advancePattern(){
        console.log("advancing pattern");
        if (this.state.patternPosition + 1 >= this.state.pattern.length){
            this.endRound()
        } else {
            this.setState({
                patternPosition: this.state.patternPosition + 1
            })
        }
    }

    getInitialButtons(numButtons){
        let activeButtons = [];
        let cards = FEARLESS.cards.slice();
        shuffle(cards);
        for (let i=0; i<=numButtons; i++) {
            let card = cards[0];
            card.instrument = instruments[Math.floor(Math.random() * instruments.length)];
            card.note = "C4";
            card.play = ()=>{
                const ac = new AudioContext();
                Soundfont.instrument(ac, card.instrument, { soundfont: 'MusyngKite' }).then(function (instrument) {
                    instrument.play(card.note, ac.currentTime, { duration: 0.5})
                });};
            activeButtons.push(cards[0]);
            cards.shift()
        }
        return activeButtons
    }

    renderMainArea(gameState){
        switch (gameState){
            case START:
                return (<StartArea onclick={this.startGame} buttons={this.state.activeButtons}/>);
            case BUTTONS:
                return (
                    <ButtonArea
                        buttons={this.state.activeButtons}
                        buttonClick={this.buttonClick}
                    />
                );
            case PATTERN:
                return (
                    <PatternArea
                        speed={this.state.speed}
                        movePattern={this.advancePattern}
                        currentButton={this.state.pattern[this.state.patternPosition]}
                    />
                );
            case GAMEOVER:
                return <div className={"full game-over"}>

                        GAME OVER
                        <br/>

                        Your Score: {this.state.score}
                        <br/>
                        Your High Score: {localStorage.getItem('highScore')}

                    <div className={"inverse full"} onClick={() => this.tryAgain()}>Try Again</div>

                </div>
        }
    }

    render (){
        console.log(this.state.pattern);
      return (
          <div className={"game-container"}>

              <OptionsModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal}/>
               <div className={"flex"} >
                   <Header/>
               </div>

                <div className={"flex"}>
                    {this.renderMainArea(this.state.gameState)}
                </div>
              <div className={"flex"}>
                <Footer score={this.state.score} gameState={this.state.gameState} isHighScore={this.state.isHighScore}/>
                <button className={"options-btn"} onClick={()=>this.openModal()}>
                    <img className={"options-img"} src={"https://images.all-free-download.com/images/graphiclarge/purple_gear_icon_vector_280676.jpg"} alt={"Options"}/>
                </button>
              </div>
          </div>



      )
    }
}

export default GameContainer


const delay = ms => new Promise(res => setTimeout(res, ms));

function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}


const instruments = [
    "accordion",
    "acoustic_bass",
    "acoustic_grand_piano",
    "acoustic_guitar_nylon",
    "acoustic_guitar_steel",
    "agogo",
    "alto_sax",
    "applause",
    "bagpipe",
    "banjo",
    "baritone_sax",
    "bassoon",
    "bird_tweet",
    "blown_bottle",
    "brass_section",
    "breath_noise",
    "bright_acoustic_piano",
    "celesta",
    "cello",
    "choir_aahs",
    "church_organ",
    "clarinet",
    "clavinet",
    "contrabass",
    "distortion_guitar",
    "drawbar_organ",
    "dulcimer",
    "electric_bass_finger",
    "electric_bass_pick",
    "electric_grand_piano",
    "electric_guitar_clean",
    "electric_guitar_jazz",
    "electric_guitar_muted",
    "electric_piano_1",
    "electric_piano_2",
    "english_horn",
    "fiddle",
    "flute",
    "french_horn",
    "fretless_bass",
    "fx_1_rain",
    "fx_2_soundtrack",
    "fx_3_crystal",
    "fx_4_atmosphere",
    "fx_5_brightness",
    "fx_6_goblins",
    "fx_7_echoes",
    "fx_8_scifi",
    "glockenspiel",
    "guitar_fret_noise",
    "guitar_harmonics",
    "gunshot",
    "harmonica",
    "harpsichord",
    "helicopter",
    "honkytonk_piano",
    "kalimba",
    "koto",
    "lead_1_square",
    "lead_2_sawtooth",
    "lead_3_calliope",
    "lead_4_chiff",
    "lead_5_charang",
    "lead_6_voice",
    "lead_7_fifths",
    "lead_8_bass__lead",
    "marimba",
    "melodic_tom",
    "music_box",
    "muted_trumpet",
    "oboe",
    "ocarina",
    "orchestra_hit",
    "orchestral_harp",
    "overdriven_guitar",
    "pad_1_new_age",
    "pad_2_warm",
    "pad_3_polysynth",
    "pad_4_choir",
    "pad_5_bowed",
    "pad_6_metallic",
    "pad_7_halo",
    "pad_8_sweep",
    "pan_flute",
    "percussive_organ",
    "piccolo",
    "pizzicato_strings",
    "recorder",
    "reed_organ",
    "reverse_cymbal",
    "rock_organ",
    "seashore",
    "shakuhachi",
    "shamisen",
    "shanai",
    "sitar",
    "slap_bass_1",
    "slap_bass_2",
    "soprano_sax",
    "steel_drums",
    "string_ensemble_1",
    "string_ensemble_2",
    "synth_bass_1",
    "synth_bass_2",
    "synth_brass_1",
    "synth_brass_2",
    "synth_choir",
    "synth_drum",
    "synth_strings_1",
    "synth_strings_2",
    "taiko_drum",
    "tango_accordion",
    "telephone_ring",
    "tenor_sax",
    "timpani",
    "tinkle_bell",
    "tremolo_strings",
    "trombone",
    "trumpet",
    "tuba",
    "tubular_bells",
    "vibraphone",
    "viola",
    "violin",
    "voice_oohs",
    "whistle",
    "woodblock",
    "xylophone"
]
