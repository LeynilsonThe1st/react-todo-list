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
    return (
      <p>
        <b className="mono">{this.state.date.toLocaleTimeString()}</b>
      </p>
    );
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      open: false,
    };
  }

  fechar(e) {
    if (e.target.id == "modal-dialog") {
      this.input.current.checked = false;
    }
  }

  render() {
    return ReactDOM.createPortal(
      <React.Fragment>
        <input
          ref={this.input}
          onChange={(e) => this.setState({ open: e.target.checked })}
          type="checkbox"
          id="modal-control"
          className="modal"
        />
        <div
          className="animated faster fadeIn"
          role="dialog"
          id="modal-dialog"
          aria-labelledby="dialog-title"
          onClick={this.fechar.bind(this)}
        >
          <div className="card shadowed large">
            <label
              tabIndex="0"
              htmlFor="modal-control"
              className="modal-close"
              onKeyUp={(e) => (e.key == "Enter" ? e.target.click() : "")}
            ></label>
            <div className="section double-padded">
              <h3 className="section" id="dialog-title">
                {"Acerca da App 📒"}
              </h3>
              <p>

                  Esta App simples do tipo <b>Todo List</b> (Lista de afazeres), cuja finalidade é de permitir que o utilizador adicione os seus afazers, os marque como feito ou os remova.

              </p>
            </div>
            <div className="section double-padded">
              <h3>{"Ferramentas Utilizadas 🛠"}</h3>
            </div>
            <div className="section double-padded">
              <p>
                <a href="https://reactjs.org" target="_blank" rel="noopener">
                  <b>{"React"}</b>
                </a>
                {
                  " - Utilizado para dar vida vida a app. No momento estou a aprender a utilizar framework e esta app serve como prova do meu progresso."
                }
              </p>
            </div>
            <div className="section double-padded">
              <p>
                <b>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage.html"
                    target="_blank"
                    rel="noopener"
                  >
                    {"LocalStorage"}
                  </a>
                  {" / "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
                    target="_blank"
                    rel="noopener"
                  >
                    {"Cookies"}
                  </a>
                </b>
                {
                  " - LocalStorage oferece um mecanismo para guardar dados no browser do utilizador. Caso não se encontre disponivel Cookies serão utilizados para alcançar o mesmo efeito."
                }
              </p>
            </div>
            <div className="section double-padded">
              <p>
                <a href="https://minicss.org" target="_blank" rel="noopener">
                  <b>{"Mini.css"}</b>
                </a>
                {
                  " - É um framework CSS leve projectado com despositivos moveis e browsers modernos em mente, é responsivo e altamente modificavel. Com o foco todo virado as funcionalidades do React, decidi utilizar um framework em vez de criar os meus estilos proprios."
                }
              </p>
            </div>
            <div className="section double-padded">
              <h3>{"O Desenvolvedor 👨🏿‍💻"}</h3>
            </div>
            <div className="section double-padded">
              <h4>{"Leynilson Harden 🇦🇴"}</h4>
              <p>
                <a
                  href="https://github.com/LeynilsonThe1st"
                  target="_blank"
                  rel="noopener"
                >
                  <b>{"GitHub:"}</b> {" LeynilsonThe1st"}
                </a>
                {
                  " - Há mais de onde este veio, podes encontrar outros projectos desenvolvidos por mim, incluindo uma app similar a esta mas feita sem ajuda de frameworks."
                }
              </p>
            </div>
            <div className="section double-padded">
              <h3>{"Fale Comigo ✉️"}</h3>
              <p>
                {
                  "Diz-me o que achaste. És experiente com o React? então da-me dicas, o que achas que devia melhorar? Estou sempre aberto a opiniōes."
                }
              </p>
              <p>
                <a
                  href="https://twitter.com/leynilsonThe1st"
                  target="_blank"
                  rel="noopener"
                >
                  <b>{"Twitter:"}</b>
                  {" @LeynilsonThe1st"}
                </a>
              </p>
              <p>
                <a
                  href="https://twitter.com/leynilsonThe1st"
                  target="_blank"
                  rel="noopener"
                >
                  <b>{"Facebook:"}</b>
                  {" Leynilson Harden"}
                </a>
              </p>
              <p>
                <b>{"Email:"}</b>
                {" Leinilsonsn@gmail.com"}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("modal")
    );
  }
}

function App() {
  let msg;
  if (localStorage.getItem("isNew") == null) {
    msg =
      'Olá, Podes começar a criar algumas "Notas" agora, basta ecrever alguma coisa nete campo de texto e pressionar a tecla ENTER.';
    localStorage.setItem("isNew", true);
  } else {
    localStorage.setItem("isNew", true);
    msg = "Escreve qualquer coisa!";
  }
  return <TodoList msg={msg} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
