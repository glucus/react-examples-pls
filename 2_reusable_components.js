// run in https://jscomplete.com/repl/

class Button extends React.Component {

    handleClick = () => {
        this.props.onClickFunction (this.props.incrementValue)
    }
    
    render () {
        return (
            <button onClick = {this.handleClick}>
                + {this.props.incrementValue}
            </button>
            // this refer to component instance that will be sent to the DOM 
        );
    }
}

// create another component, without state --> function
// for function component proprs are acessed differently than for class
// (without this)
// result components receives info about state from the App component
// but not as a state, just as some property -> no problem with reading
// state is defined and changed in the app component (a class component)

const Result = (props) => {
     return (
         <div>{props.counter}</div>
    );
}

// create new component, that includes all other components
// their names should be inside parent element (<div> here) 
// because react component can return only one element, not multiple

class App extends React.Component {

    constructor(props) {
        super(props);   
        this.state = { counter: 0 }; 

    };

    incrementCounter = (incrementValue) => {
        // setState is a "built-in" method of parent react component 
        this.setState ( (prevState) => (  
            { counter: prevState.counter + incrementValue }
        ));
    };

    // below we pass reference to this function to the Button component 
    // for it to be able to use it
    // passing as a property of the props object

    render () {
        return (
            <div>
                <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
                <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
                <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
                <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
                <Result counter={this.state.counter}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, mountNode);  
  // what component to add to the DOM and where
    
    