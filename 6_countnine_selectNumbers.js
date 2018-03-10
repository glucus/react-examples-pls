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
       
        return (
            <div className="col-2">
              <button className="btn btn-sm" 
               disabled = {props.selectedNumbers.length === 0}>
                   =
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
            if (props.selectedNumbers.indexOf(number) != -1) {
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
            numberOfStars: Math.floor(1 + Math.random() * 9, 0)
        };
        
        
        selectNumber = (clickedNumber) => {
            if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
        
            this.setState ( prevState =>  { return {selectedNumbers: prevState.selectedNumbers.concat (clickedNumber) };
            });
            }
        };
        
        deselectNumber = (clickedNumber) => {
        
          //  let indexOfClicked =  this.state.selectedNumbers.indexOf(clickedNumber);
          //  let array = this.state.selectedNumbers;
          //  array.splice(indexOfClicked, 1);
          //  this.setState ( {selectedNumbers: array} );
            
            this.setState ( prevState => ( {selectedNumbers: prevState.selectedNumbers.filter (number => number !== clickedNumber)} )
            );   
        };
        
        render () {
            const { selectedNumbers, numberOfStars} = this.state; // destructuring state object 
            return (
                <div className="container">
                    <h3>Play Nine</h3>
                    <hr/>
                    <div className="row">
                        <Stars numberOfStars = {numberOfStars} />
                        <Button selectedNumbers = {selectedNumbers} />
                        <Answer selectedNumbers = {selectedNumbers} 
                         deselectNumber = {this.deselectNumber} />
                    </div>
                    <div className="row">
                        <Numbers selectedNumbers = {selectedNumbers} 
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
      