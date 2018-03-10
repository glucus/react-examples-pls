// Write JavaScript here and press Ctrl+Enter to execute// run in https://jscomplete.com/repl/
// react, bootstrap and font awesome included


const Stars = (props) => {
    
        const numberOfStars = Math.floor(1 + Math.random() * 9, 0);
        // let stars = [];
        // for (let i=0; i < numberOfStars; i++) {
        //    stars.push(<i key={i} className="fa fa-star"></i>);
        // }  
        
        const starsArray = _.range(numberOfStars); // generates an array using lodash library
        
        return (
            <div className="col-5">
                { starsArray.map (
                    i => <i key={i} className="fa fa-star"></i>
                )}
            </div>
        );
    }
    
    
    const Button = (props) => {
        return (
            <div className="col-2">
              <button className="btn btn-sm"> = </button>
            </div>
        );
    }
    
    
    const Answer = (props) => {
        return (
            <div className="col-5">
                 <span>5</span>
                 <span>6</span>
            </div>
        );
    }
    
    const Numbers = (props) => {
      
        return (
            <div className="col-12">
                <div className="card text-center">
                  <div>
                      { Numbers.list.map (
                          (number, i) => <span key={i}>{number}</span>
                      )}
                  </div>
                </div>
            </div>
        );
    }
    
    Numbers.list = _.range(1, 10);  // variable is shared to all instances of component --> should not be generated each time
    
    class Game extends React.Component {
        render () {
            return (
                <div className="container">
                    <h3>Play Nine</h3>
                    <hr/>
                    <div className="row">
                        <Stars />
                        <Button />
                        <Answer />
                    </div>
                    <div className="row">
                        <Numbers />
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
      