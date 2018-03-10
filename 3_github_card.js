// run in https://jscomplete.com/repl/
// github api available on https://api.github.com/ 


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

let data = [
  {
    name: "Paul O’Shannessy",
    company: "Facebook",
    avatar_url: "https://avatars1.githubusercontent.com/u/8445?v=4"
  },
  {
    name: "Sophie Alpert",
    company: "Facebook",
    avatar_url: "https://avatars0.githubusercontent.com/u/6820?s=460&v=4"
  }
]

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );
}
// spread operator (...) to use whole array as argument of map function

ReactDOM.render (<CardList cards = {data} />, mountNode);  
