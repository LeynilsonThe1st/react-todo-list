class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return <p>{this.state.date.toLocaleTimeString()}</p>;
  }
}

function App() {
  let msg;
  if (localStorage.getItem("isNew") == null) {
    msg = 'Olá, Podes começar a criar algumas "Notas" agora, basta ecrever alguma coisa nete campo de texto e pressionar a tecla ENTER.';
    localStorage.setItem("isNew", true);
  } else {
    localStorage.setItem("isNew", true);
    msg = "Escreve qualquer coisa!"
  }
  return (
    <div className="container" style={{ maxWidth: 700 }}>
      <TodoList msg={msg} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
