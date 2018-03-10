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
                 onClick = {props.redraw} disabled = {props.redrawTimesLeft === 0}>
                  <i className="fa fa-sync"></i> {props.redrawTimesLeft} 
                </button>
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
                  <h3>{props.doneStatus}</h3>
                  <button className="btn btn-info" 
                   onClick={() => props.restartGame()}>
                      Play again
                  </button>
              </div>
            </div>
        )
    }
    
    // https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
    /*
      var possibleCombinationSum = function (arr, n) {
      
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return possibleCombinationSum(arr, n);
        }
        
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };  */
      
      
      // array - unusedNumbers, n - numberOfStars
     var alternate = function (arr, n) {
     
      if (arr.indexOf(n) >= 0) { return true; }  // if n is in the array - ok
      if (arr[0] > n) { return false; }  // if n < the min value in array  
                                        // [0] as array is sorted - not ok
      
      if (arr[arr.length - 1] > n) {   // if max value of array (last element, as array is sorted) > n
          arr.pop();                   // we don't need it --> we pop it
          return alternate(arr, n);    // then repeat until we get rid of all numbers in array that are greater than n
      }

      for (var i = 0; i < arr.length - 1; ++i) {
          for (var j = i+1; j < arr.length; ++j) {
              if ( arr[i] + arr[j] === n) {  // sums all possible pairs except self
                  return true;
              }
          }
      }
      return false;
  };
    
    
    
    class Game extends React.Component {
    
        static randomNumber = () => Math.floor(1 + Math.random() * 9, 0);
        
        static initialState = () => { 
            return {
                selectedNumbers: [],  
                numberOfStars: Game.randomNumber(),
                answerIsCorrect: null,
                usedNumbers: [],
                redrawTimesLeft: 5,
                doneStatus:  null,
                unusedNumbers: Numbers.list
            };
        };
        
          // properties will be passed to child components below
        state = Game.initialState();

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
                  number => prevState.selectedNumbers.indexOf(number) < 0), 
                selectedNumbers: [],   // resetting
                answerIsCorrect: null,
                numberOfStars: Game.randomNumber(),
                redrawTimes: 0
            }), this.updateDoneStatus // callback function
        )};
           
        redraw = () => {
            if (this.state.redrawTimesLeft === 0) {
                return;
            } else {
              this.setState ( prevState => ({
                  numberOfStars: Game.randomNumber(),
                  redrawTimesLeft: prevState.redrawTimesLeft - 1,
                  selectedNumbers: [], 
                  answerIsCorrect: null
              }), this.updateDoneStatus ); // callback
            }
          
        };
       
        updateDoneStatus = () => {
            this.setState (prevState => { 
              if ( prevState.usedNumbers.length === 9 ) {
                 return {doneStatus: 'You Won!'} ;
              } else if ( ( prevState.redrawTimesLeft === 0 ) && ( alternate (prevState.unusedNumbers, prevState.numberOfStars) === false) ) {
                 return {doneStatus: 'Game over'} ;
              } else { return; } 
              });
        }; 
        
        restartGame = () => this.setState (Game.initialState());
        
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
                          <DoneFrame doneStatus = {doneStatus} 
                                     restartGame = {this.restartGame} /> :
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
      