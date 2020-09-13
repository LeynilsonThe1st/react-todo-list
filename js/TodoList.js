function TodoListHeader(props) {
  return (
    <div className="section dark">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Todo List</h1>
        <Clock />
      </div>
      <div
        className="tooltip"
        aria-label='Pressiona a tecla "Enter" para adicionar'
        style={{ display: "flex" }}
      >
        {props.input}
      </div>
      <p>
        Made with love by <mark className="tertiary">Leynilson Harden</mark>
      </p>
    </div>
  );
}

function TodoItem(props) {
  return (
    <div
      className={
        "section" + (props.item.done ? " done" : props.item.novo ? " animated fadeIn faster" : " ")
      }
      id={`todo-item-${props.id}`}
    >
      <p className="todo-text">
        <mark
          className={"tag" + (props.item.done ? " secondary" : "")}
          style={{ marginRight: 16 }}
        >
          #{props.id + 1}
        </mark>
        <span>{props.item.text}</span>
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ textAlign: "right" }}>
          <small>
            <mark className="dark" style={{ padding: 5 }}>
              {props.item.date}
            </mark>
          </small>
        </p>
        <div>
          {props.doneButton}
          {props.rmvButton}
        </div>
      </div>
    </div>
  );
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [] };
  }
  // Busca os dados no locaStorage assim que o component renderizar
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("todoItems"));
    if (data && data.length != 0) {
      this.setState({ todoItems: data });
    }
  }
  // Grava os dados no localStorage assim que state actualizar
  componentDidUpdate() {
    localStorage.setItem(
      "todoItems",
      JSON.stringify(this.ordenar(this.state.todoItems))
    );
  }
  // Cria uma nova id
  // Este method pode ser melhorado.
  makeNewId() {
    if (window.crypto) {
      return parseInt(
        (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296) *
          100000000000
      );
    }
    return parseInt(Math.random() * 100000000000);
    //(id do ultimo elemento + 1)
    // return len == 0 ? 1 : this.state.todoItems[len - 1].id + 1;
  }

  ordenar(todos) {
    let undone = todos.filter((item) => item.done == false);
    let done = todos.filter((item) => item.done == true);
    return undone.concat(done);
  }

  animateTodo(index) {
    let el = document.getElementById(`todo-item-${index}`);
    document.documentElement.style.setProperty(
      "--shrink-from",
      `${el.offsetHeight}px`
    );
    el.classList.remove("fadeIn");
    el.classList.add("animated", "shrink", "faster");
  }

  criar(e) {
    let value = e.target.value.trim();
    if (e.key == "Enter" && value != "") {
      e.target.value = "";
      this.setState({
        todoItems: this.state.todoItems.concat({
          id: this.makeNewId(),
          text: value,
          done: false,
          novo: true,
          date: new Date().toLocaleString(),
        }),
      });
    }
  }

  remover(index) {
    this.animateTodo(index);
    setTimeout(() => {
      this.setState({
        todoItems: this.state.todoItems.filter((item, pos) => pos != index),
      });
    }, 500);
  }

  toggleDone(index) {
    let done = this.state.todoItems[index].done;
    this.state.todoItems[index].done = !done;
    this.state.todoItems[index].novo = false;
    this.setState(this.state.todoItems);
  }

  render() {
    return (
      <div className="card fluid bordered" id="todo-list">
        <TodoListHeader
          clock={<Clock />}
          input={
            <textarea
              placeholder={this.props.msg}
              onKeyUp={this.criar.bind(this)}
              maxLength="1000"
            />
          }
        />
        {this.state.todoItems.map((item, index) => (
          <TodoItem
            key={item.id}
            id={index}
            item={item}
            rmvButton={
              <button
                className="secondary small"
                onClick={this.remover.bind(this, index)}
              >
                Remover
              </button>
            }
            doneButton={
              <button
                className="primary small"
                onClick={this.toggleDone.bind(this, index)}
              >
                {item.done ? "Undo" : "Done"}
              </button>
            }
          />
        ))}
      </div>
    );
  }
}
