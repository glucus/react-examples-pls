// Write JavaScript here and press Ctrl+Enter to execute// run in https://jscomplete.com/repl/
// react, bootstrap and font awesome included


const Stars = (props) => {
    
        const starsArray = _.range(props.numberOfStars); // generates an array using lodash library
        
        // instead of for-loop here we use array.map() method
        return (
            <div className="col-5">
                { starsArray.map ( i => <i key={i} className="fa fa-star"></i> )}
            </div>
        );
    }
    
    const Button = (props) => {
         
          let checkButton;
          
          switch (props.answerIsCorrect) {
              case true: 
                checkButton = <button className = "btn btn-success" 
                 onClick = {props.acceptAnswer} >
                    <i className="fa fa-check" ></i> 
                </button>;
              break;
              case false: 
                checkButton = <button className = "btn btn-danger">
                    <i className="fa fa-times" ></i>  
                </button>;
              break;
              default: 
                checkButton = <button className = "btn"
                 disabled = { props.selectedNumbers.length === 0 }
                 onClick = { props.checkAnswer } >
                      = 
                </button>;
              break;
          }
        
        return (
            <div className="col-2 text-center">
                {checkButton}
                <button className="btn btn-sm btn-warning redraw-button" 
                 onClick = { props.redraw } disabled = { props.redrawTimesLeft === 0 } >
                  <i className="fa fa-sync"></i> {props.redrawTimesLeft} 
                </button>
                <p>{props.unusedNumbers}</p>
            </div>
        );
    }
    
    
    const Answer = (props) => {
    
        return (
            <div className="col-5">
            { props.selectedNumbers.map ( (number, i) => 
                <span key={i} onClick = {() => props.deselectNumber(number)}>
                    {number}
                </span>
            ) }      
            </div>
        );
    }
    
    
    const Numbers = (props) => {
        const numberClassName = (number) => {
            if (props.usedNumbers.indexOf(number) != -1) {
                return "used";
            } if (props.selectedNumbers.indexOf(number) != -1) {
                return "selected";
            }
        };
          
        // event handlers must have a function reference in them not a function call 
        return (
            <div className="col-12">
                <div className="card text-center">
                  <div>
                      { Numbers.list.map (
                          (number, i) => 
                          <span key={i} className={numberClassName(number)} 
                           onClick = { () => props.selectNumber(number) }>
                              {number}
                          </span>
                      )}
                  </div>
                </div>
            </div>
        );
    }
    
    Numbers.list = _.range(1, 10);  // variable is shared to all instances of component --> should not be generated each time
    
    
    const DoneFrame = (props) => {
        return (
            <div className="col-12">
              <div className="text-center">
                  <br/>
                  <h4>{props.doneStatus}</h4>
                  <br/>
              </div>
            </div>
        )
    }
    
    class Game extends React.Component {
    
        static randomNumber = () => Math.floor(1 + Math.random() * 9, 0);
        
        state = {
            selectedNumbers: [],  // will be passed to child components as property
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            usedNumbers: [],
            redrawTimesLeft: 5,
            doneStatus:  null,
            unusedNumbers: Numbers.list
        };
        
        
        selectNumber = (clickedNumber) => {
            if (
                (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) ||
                (this.state.usedNumbers.indexOf(clickedNumber) >= 0)
            ) { 
                return;
            } else { 
                this.setState ( prevState =>  ({ 
                    selectedNumbers: prevState.selectedNumbers.concat (clickedNumber), 
                    answerIsCorrect: null // reset the state
                }) );
            }
        };
        
        
        deselectNumber = (clickedNumber) => {
            this.setState ( prevState => ({
              selectedNumbers: prevState.selectedNumbers.filter (
                  number => number !== clickedNumber
              ),
              answerIsCorrect: null 
            })
            );   
        };
        
        
        checkAnswer = () => {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            if (this.state.selectedNumbers.reduce (reducer, 0) == this.state.numberOfStars) {
                this.setState ({ answerIsCorrect: true });
            } else { 
                this.setState ({ answerIsCorrect: false }); 
            }   
        }; 
            
        
        acceptAnswer = () => {
            this.setState ( prevState => ( {
                usedNumbers: prevState.usedNumbers.concat (prevState.selectedNumbers),
                unusedNumbers: prevState.unusedNumbers.filter (
                  number => this.state.selectedNumbers.indexOf(number) < 0), // NEW
                selectedNumbers: [],   // resetting
                answerIsCorrect: null,
                numberOfStars: Game.randomNumber(),
                redrawTimes: 0
            }
            ));
            this.updateDoneStatus();
        };
           
        redraw = () => {
            if (this.state.redrawTimesLeft === 0) {
                return;
            } else {
              this.setState ( prevState => ({
                  numberOfStars: Game.randomNumber(),
                  redrawTimesLeft: prevState.redrawTimesLeft - 1,
                  selectedNumbers: [], 
                  answerIsCorrect: null
              }) );
          }  
        };
        
        updateDoneStatus = () => {
            let unusedLeft = this.state.unusedNumbers.filter (number => number < this.state.numberOfStars);
            
            this.setState (prevState => { 
              if ( prevState.usedNumbers.length === 9 ) {
                  this.setState ( {doneStatus: 'You Won!'} );
              } else if ( this.state.unusedNumbers.forEach ((number) => number > this.state.numberOfStars) && this.state.redrawTimesLeft === 0 ) { 
                  this.setState ( {doneStatus: 'Game Over. Try again!'} );
              } else if ( (unusedLeft.reduce((acc, cv) => acc + cv, 0) < this.state.numberOfStars) && this.state.redrawTimesLeft === 0 ) {
                this.setState ( {doneStatus: 'Game Over. Try again!'} );
              } else { return; } 
              });
        }; 
              
              /*  if (this.state.redrawTimesLeft === 0) {
                  if ( this.state.unusedNumbers.forEach ((number) => number > this.state.numberOfStars) ) { 
                      this.setState ( {doneStatus: 'Game Over'} );
                  } else if ( unusedLeft.reduce((acc, cv) => acc + cv, 0) < this.state.numberOfStars) {
                      this.setState ( {doneStatus: 'Game Over'} );
                  } else { return ; }
              } else { return ; } */
        
        render () {
            const { selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redrawTimesLeft, doneStatus, unusedNumbers} = this.state; // destructuring state object 
            return (
                <div className="container">
                    <h3>Play Nine</h3>
                    <hr/>
                    <div className="row">
                        <Stars numberOfStars = {numberOfStars} />
                        <Button selectedNumbers = {selectedNumbers} 
                                answerIsCorrect = {answerIsCorrect}
                                checkAnswer = {this.checkAnswer}
                                acceptAnswer = {this.acceptAnswer}
                                redraw = {this.redraw}
                                redrawTimesLeft = {redrawTimesLeft} 
                                unusedNumbers = {unusedNumbers} />
                        <Answer selectedNumbers = {selectedNumbers} 
                                deselectNumber = {this.deselectNumber} />
                    </div>
                    <div className="row">
                      { doneStatus ? 
                      // ternary ( condition ? expr1 : expr2 )
                          <DoneFrame doneStatus = {doneStatus} /> :
                          <Numbers selectedNumbers = {selectedNumbers} 
                                   usedNumbers = {usedNumbers} 
                                   selectNumber = {this.selectNumber}
                                   doneStatus = {doneStatus} />
                      }
                    </div>
                </div>
            );
        }
    }
    
     class App extends React.Component {
         render () {
             return (
                 <div>
                   <Game />
                 </div>
             );
         }
     }
     
    ReactDOM.render(<App />, mountNode);  
      