// run in https://jscomplete.com/repl/

class Button extends React.Component {
    
    constructor(props) {
        super(props);   
        // call to the parent class's constructor with parameter props
        // needed to use parent's class methods

        this.state = { counter: 0 }; // create state object
    };

    handleClick = () => {

    // setState() is a built-in property setter
    this.setState ( (prevState) => (  // no need for return, as it's =>
        { counter: prevState.counter + 1 }
    ));
    }; 

    render () {
        return (
            <button onClick = {this.handleClick}>
                {this.state.counter}
            </button>
            // this refer to component instance that will be sent to the DOM 
        );
    }
}

ReactDOM.render(<Button />, mountNode);  
  // what component to add to the DOM and where
    
    