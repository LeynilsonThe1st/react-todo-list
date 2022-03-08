function TodoListHeader(props) {
  return (
    <div className="section dark double-padded">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Notas 📒</h1>
        <Clock/>
        <label
          tabIndex="0"
          className="button primary shadowed"
          htmlFor="modal-control"
          onKeyUp={(e) => (e.key == "Enter" ? e.target.click() : "")}
        >
          Saber Mais <span className="icon-info inverse"></span>
        </label>
      </div>
      <div
        className="tooltip"
        aria-label='Pressiona a tecla "Enter" para adicionar'
        style={{ display: "flex" }}
      >
        {props.input}
      </div>
      <Modal />
    </div>
  );
}

class TodoItem extends React.Component {
  render() {
    return (
      <div
        className={
          "section double-padded" +
          (this.props.item.done
            ? " done"
            : this.props.item.novo
            ? " animated fadeIn faster"
            : "")
        }
        id={`todo-item-${this.props.id}`}
      >
        <p className="todo-text">
          <mark
            className={"mono tag" + (this.props.item.done ? " secondary" : "")}
            style={{
              marginRight: 16,
            }}
          >
            # {this.props.id + 1}
          </mark>
          <span>{this.props.item.text}</span>
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <p style={{ textAlign: "right" }}>
            <mark className="dark" style={{ padding: 5 }}>
              <span className="icon-calendar"></span>
              {this.props.item.date}
            </mark>
          </p>
          <div>
            {this.props.doneButton}
            {this.props.rmvButton}
          </div>
        </div>
      </div>
    );
  }
}
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.todo = React.createRef();
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

  animar(index) {
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
          date: new Date().toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        }),
      });
      setTimeout(() => {
        let items = document.querySelectorAll("[id^='todo-item-']"),
          valor = 0;
        Array.prototype.forEach.call(items, (el) => (valor += el.offsetHeight));
        document.getElementById("items").scroll({ top: valor });
        // document.querySelector("[id^='todo-item-']:last-of-type").focus();
      }, 200);
    }
  }

  remover(index, e) {
    e.target.blur();
    this.animar(index);
    setTimeout(() => {
      this.setState({
        todoItems: this.state.todoItems.filter((item, pos) => pos != index),
      });
    }, 500);
  }

  alternarFeito(index, e) {
    e.target.blur();
    let done = this.state.todoItems[index].done;
    this.state.todoItems[index].done = !done;
    this.state.todoItems[index].novo = false;
    this.setState(this.state.todoItems);
  }

  render() {
    return (
      <div className="card fluid m-0 shadowed" id="todo-list">
        <TodoListHeader
          input={
            <input
              className="shadowed"
              placeholder={this.props.msg}
              onKeyUp={this.criar.bind(this)}
              maxLength="1000"
            />
          }
        />
        <div className="row" id="items">
          <div className="col-sm-12 p-0">
            <div className="card m-0 b-none fluid">
              {this.state.todoItems.map((item, index) => (
                <TodoItem
                  ref={this.todo}
                  key={item.id}
                  id={index}
                  item={item}
                  rmvButton={
                    <button
                      className="shadowed secondary small"
                      onClick={this.remover.bind(this, index)}
                    >
                      Remover
                    </button>
                  }
                  doneButton={
                    <button
                      className="shadowed inverse small"
                      onClick={this.alternarFeito.bind(this, index)}
                    >
                      {item.done ? "Desfazer" : "Feito"}
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
