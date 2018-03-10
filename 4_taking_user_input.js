// run in https://jscomplete.com/repl/

const Card = (props) => {
    return (
        <div>
          <img width="75" src={props.avatar_url}/>
          <div style={{display: 'inline-block', marginLeft: 10}}>
            <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
              {props.name}
            </div>
            <div>{props.company}</div>
          </div>
        </div>
    );
  };
  
  const CardList = (props) => {
    return (
      <div>
        {props.cards.map (card => <Card key = {card.id} {...card} />)}
      </div>
    );
  }
  // spread operator (...) to use an array as argument of map function (~ a loop)
  // ~ desctructures object to properties used in <Card /> component
  

  class Form extends React.Component {
      state = { userName: "" };
      
      handleSubmit = (event) => {
          event.preventDefault();  // ! important
          
          // console.log('Event: Form Submit', this.state.userName);
          // ajax... (fetch or axios)
          axios.get(`https://api.github.com/users/${this.state.userName}`)
              .then (response => {
                    this.props.onSubmit (response.data);
                    this.setState({ userName: '' });
                    //console.log(this.state.userName);
              });
      };
      
      render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                 onChange = {(event) => this.setState ({userName: event.target.value}) } 
                 placeholder="Github username" required />
                <button type="submit">Add card</button>
            </form>
            // or could use ref attribute of <input ref={ (input) => this.userNameInput = input }>
        );
      }
  }
  
  class App extends React.Component {
      state = {
        cards: []
      };
      
      // a function that will change state of <App /> that can be invoked from <Form /> (as <Form /> recieves info from API) --> will pass reference to this function as a property of <Form /> 
      
      addNewCard = (cardInfo) => {
          this.setState (prevState => {
              return { cards: prevState.cards.concat(cardInfo) };
          });
      }; 
      
      render () {
          return (
          <div>
              <Form onSubmit = {this.addNewCard} />
              <CardList cards = {this.state.cards} />
          </div>
          )
      }
  }
  
  ReactDOM.render(<App/>, mountNode);  
  