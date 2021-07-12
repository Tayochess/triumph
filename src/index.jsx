const loadData = (dataname) => {
    try {
        const data = localStorage.getItem(dataname);
        if (data === null) {
            return undefined;
        }
        return JSON.parse(data);
    }
    catch (err) {
        return undefined;
    }
};

const saveData = (data) => {
    try {
        const encodedData = JSON.stringify(data);
        localStorage.setItem('tableEditor', encodedData);
    }
    catch (err) {
        return undefined;
    }
}

class Line extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.selectLine(this.props.index);
  }

  moveUp = (e) => {
    e.preventDefault();
    this.props.moveLineUp(this.props.index);
  }

  moveDown = (e) => {
    e.preventDefault();
    this.props.moveLineDown(this.props.index);
  }

  render() {
    return (
      <div className={`editor__line ${this.props.isActive ? 'active' : ''}`}>
        <div class="editor__line-navigation">
          <button class="editor__line-navbutton editor__line-navbutton-up" type="button" onClick={this.moveUp}></button>
          <button class="editor__line-navbutton editor__line-navbutton-down" type="button" onClick={this.moveDown}></button>
        </div>
        <div class="editor__line-fields" onClick={this.handleClick}>
          <div class="editor__field"> {this.props.data.name} </div>
          <div class="editor__field"> {this.props.data.type} </div>
          <div class="editor__field"> {this.props.data.color} </div>
        </div>
      </div>
    );
  }
}

class Editor extends React.Component {

  constructor(props) {
    super(props);

    let loaded_data = loadData('tableEditor');
    if (loaded_data !== undefined) {
      this.state = { data: loaded_data };
    }
    else {
      this.state = { data: init_data };
    }
  }

  state = {
    data: [],
    name_value: '',
    type_value: '',
    color_value: '',
    current_line: null,
    inputBlockActive: false,
  };

  componentDidMount() {
    this.setupBeforeUnloadListener();
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      saveData(this.state.data);
    });
  };

  updateName = () => {
    this.setState({name_value: event.target.value});
  }

  updateType = () => {
    this.setState({type_value: event.target.value});
  }

  updateColor = () => {
    this.setState({color_value: event.target.value});
  }

  selectLine = (num) => {
    this.setState(prevState => {
      let new_data = [...prevState.data];

      new_data[this.state.current_line] = {
        name: this.state.name_value,
        type: this.state.type_value,
        color: this.state.color_value
      };

      return {
        current_line: num,
        data: new_data,
        name_value: this.state.data[num].name,
        type_value: this.state.data[num].type,
        color_value: this.state.data[num].color,
        inputBlockActive: true
      };
    });
  }

  saveInput = () => {
    this.setState(prevState => {
      let new_data = [...prevState.data];

      new_data[this.state.current_line] = {
        name: this.state.name_value,
        type: this.state.type_value,
        color: this.state.color_value
      };

      return {
        data: new_data,
        inputBlockActive: false
      };
    });
  }

  closeInput = () => {
    this.setState({
      inputBlockActive: false
    });
  }

  moveLineUp = (current_index) => {
    this.setState(prevState => {
      let new_data = [...prevState.data];

      if (current_index > 0) {
        let temp = new_data[current_index - 1];
        new_data[current_index - 1] = new_data[current_index];
        new_data[current_index] = temp;
      }

      return {
        current_line: current_index > 0 ? current_index - 1 : current_index,
        data: new_data
      };
    });
  }

  moveLineDown = (current_index) => {
    this.setState(prevState => {
      let new_data = [...prevState.data];

      if (current_index < new_data.length - 1) {
        let temp = new_data[current_index + 1];
        new_data[current_index + 1] = new_data[current_index];
        new_data[current_index] = temp;
      }

      return {
        current_line: current_index < new_data.length - 1 ? current_index + 1 : current_index,
        data: new_data
      };
    });
  }

  saveDataLocally = () => {
    saveData(this.state.data);
  }

  restoreData = () => {
    this.setState({
        data: init_data
    });
  }

  addLine = () => {
    this.setState(prevState => {
      let new_data = [...prevState.data];
      new_data.push({
        name: '',
        type: '',
        color: ''
      });

      return {
        data: new_data
      };
    });
  }

  removeLine = () => {
    this.setState(prevState => {
      let new_data = [...prevState.data];

      if (!this.state.current_line) {
        return;
      }
      else {
        new_data.splice(this.state.current_line, 1);
      }

      return {
        data: new_data
      };
    });
  }

  render() {
    return (
      <div class="editor__container">
        <div class="editor__header">
          <button class="editor__header-button" type="button" onClick={this.saveDataLocally}>Save data</button>
          <button class="editor__header-button" type="button" onClick={this.restoreData}>Restore data</button>
        </div>
        <div class="editor__table">
          {this.state.data.map((item, index) => (
            <Line data={item} index={index} isActive={index == this.state.current_line} selectLine={this.selectLine} moveLineUp={this.moveLineUp} moveLineDown={this.moveLineDown} />
          ))}
        </div>

        <div class="editor__footer">
          <button class="editor__footer-button" type="button" onClick={this.addLine}>Add line</button>
          <button class="editor__footer-button" type="button" onClick={this.removeLine}>Remove line</button>
        </div>

        <div className={`editor__input-block ${this.state.inputBlockActive ? 'active' : ''}`}>
          <label class="editor__input-label" for="name_field">Name</label>
          <input id="name_field" class="editor__input-text" type="text" value={this.state.name_value} onChange={this.updateName}></input>
          <label class="editor__input-label" for="type_field">Type</label>
          <input id="type_field" class="editor__input-text" type="text" value={this.state.type_value} onChange={this.updateType}></input>
          <label class="editor__input-label" for="color_field">
            <span>Color</span>
            <input id="color_field" class="editor__input-color" type="color" value={this.state.color_value} onChange={this.updateColor}></input>
          </label>
          <div class="editor__input-buttons">
            <button class="editor__input-button" type="button" onClick={this.saveInput}>OK</button>
            <button class="editor__input-button" type="button" onClick={this.closeInput}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

let init_data = [
  {
    name: "name1",
    type: "main",
    color: "#f4f4f4"
  },
  {
    name: "name2",
    type: "main",
    color: "#f4f4f4"
  },
  {
    name: "name3",
    type: "main",
    color: "#f4f4f4"
  },
  {
    name: "name4",
    type: "main",
    color: "#f4f4f4"
  },
  {
    name: "name5",
    type: "main",
    color: "#f4f4f4"
  },
  {
    name: "name6",
    type: "main",
    color: "#f4f4f4"
  },
];

let el = document.querySelector('#editor');
ReactDOM.render(<Editor />, el);
