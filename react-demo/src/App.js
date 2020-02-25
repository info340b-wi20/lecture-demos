import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [], //start as empty, not from props
      modelOpen: false,
    }
  }

  componentDidMount() {
    fetch('tasks.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({tasks: data}) //calls render!!
      })
  }

  toggleComplete = (taskId) => {
    this.setState((prevState, prevProps) => {

      let updatedTasks = prevState.tasks.map((eachTask) => {
        let copy = Object.assign({}, eachTask); //copy the object
        if(copy.id === taskId)
          copy.complete = !copy.complete;
        return copy; //put copy in the mapped list
      })

      let incomplete = updatedTasks.filter((task) => !task.complete);

      let updatedState = {
        tasks: updatedTasks,
        modelOpen: incomplete.length == 0
      }
      return updatedState;
    })
  }

  addTask = (taskDescription) => {
    console.log("Adding", taskDescription);

    this.setState((prevState, prevProps) => {
      let copyOfTasks = prevState.tasks.map((eachTask) => {
        return Object.assign({}, eachTask); //copy the object
      })

      let newTask = {
        id: copyOfTasks[copyOfTasks.length - 1].id + 1, //add 1 to id
        description: taskDescription,
        complete: false
      }
      copyOfTasks.push(newTask);

      return {tasks: copyOfTasks};
    });
  }

  toggleModal = () => {
    this.setState({modelOpen: false})
  }

  render() {
    let tasks = this.state.tasks; //local name for readability
    console.log("rendering", tasks.length, "tasks");

    //do data processing
    let incomplete = tasks.filter((task) => !task.complete);

    return (
      <div className="container">
        <p className="lead">Things I have to do ({incomplete.length})</p>
        <TaskList taskArray={tasks} howToToggle={this.toggleComplete} />
        <AddTaskForm whatToDoWhenSubmitted={this.addTask} />

        <Modal isOpen={this.state.modelOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          You did it!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleModal}>Close</Button>{' '}
        </ModalFooter>
      </Modal>        
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    if(this.props.taskArray.length == 0) {
      return null;
    }


    //do data processing
    let taskComponents = this.props.taskArray.map((eachTask) => {
      let singleTask = (
        <Task 
          key={eachTask.id} 
          task={eachTask}
          howToToggle={this.props.howToToggle} 
        />
      );
      return singleTask;
    })

    return (
      <ol>
        {taskComponents}
      </ol>
    );
  }
}

class Task extends Component {
   doSomething = (evt) => {  //click handlier
    console.log("You clicked on", this.props.task.description);

    this.props.howToToggle(this.props.task.id)
    //App.toggleTask(this.id);
  };

  render() {
    console.log("rendering", this.props.task.description)

    let fullClassName = '';
    // if(this.state.currentComplete){
    if(this.props.task.complete){
      fullClassName = 'font-strike';
    }

    return (
      <li className={fullClassName} onClick={this.doSomething} >
        {this.props.task.description}
      </li>
    );
  }
}

class AddTaskForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      inputValue: '' //what was typed in
    }
  }

  handleChange = (event) => {
    let inputElem = event.target; //which dom element
    let newValue = inputElem.value

    this.setState({
      inputValue: newValue.toUpperCase()
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting!", this.state.inputValue)

    // App.addTask(this.state.inputValue)
    this.props.whatToDoWhenSubmitted(this.state.inputValue);

    this.setState({inputValue: ''});

  }

  render() {
    return (
      <form>
        <input 
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          value={this.state.inputValue}
          onChange={this.handleChange}
          />
        <Button color="primary" onClick={this.handleSubmit} >
          Add task to list
        </Button>
      </form>
    );
  }
}

export default App;