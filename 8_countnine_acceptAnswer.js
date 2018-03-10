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
            <div className="col-2">
                {checkButton}
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
    
    
    
    class Game extends React.Component {
    
        state = {
            selectedNumbers: [],  // will be passed to child components as property
            numberOfStars: Math.floor(1 + Math.random() * 9, 0),
            answerIsCorrect: null,
            usedNumbers: []
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
        
        /* this.setState ( prevState => ({ answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce (reducer, 0) })
        ); */
        
        
        acceptAnswer = () => {
            this.setState ( prevState => ( {
                usedNumbers: prevState.usedNumbers.concat (prevState.selectedNumbers),
                selectedNumbers: [],   // resetting
                answerIsCorrect: null,
                numberOfStars: Math.floor(1 + Math.random() * 9, 0)
            }
            ));
        };
           
        
        render () {
            const { selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers} = this.state; // destructuring state object 
            return (
                <div className="container">
                    <h3>Play Nine</h3>
                    <hr/>
                    <div className="row">
                        <Stars numberOfStars = {numberOfStars} />
                        <Button selectedNumbers = {selectedNumbers} 
                                answerIsCorrect = {answerIsCorrect}
                                checkAnswer = {this.checkAnswer}
                                acceptAnswer = {this.acceptAnswer} />
                        <Answer selectedNumbers = {selectedNumbers} 
                                deselectNumber = {this.deselectNumber} />
                    </div>
                    <div className="row">
                        <Numbers selectedNumbers = {selectedNumbers} 
                                 usedNumbers = {usedNumbers} 
                                 selectNumber = {this.selectNumber} />
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
                   <Game />
                 </div>
             );
         }
     }
     
    ReactDOM.render(<App />, mountNode);  
      