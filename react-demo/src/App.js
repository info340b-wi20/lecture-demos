import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: this.props.initialTasks
    }
  }

  toggleComplete = (taskIndex) => {
    this.setState((currState, currProps) => {

      //fix this tomorow
      this.state.tasks[taskIndex].complete = !this.state.tasks[taskIndex].complete;

      let updatedState = {
        tasks: this.state.tasks //now updated
      }
      return updatedState;
    })
  }


  render() {
    let tasks = this.state.tasks; //local name for readability

    //do data processing
    let incomplete = tasks.filter((task) => !task.complete);

    return (
      <div className="container">
        <p className="lead">Things I have to do ({incomplete.length})</p>
        <TaskList taskArray={tasks} howToToggleCallback={this.toggleComplete} />
        <AddTaskForm />
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    //do data processing
    let taskComponents = this.props.taskArray.map((eachTask) => {
      let singleTask = <Task key={eachTask.id} task={eachTask} />
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
  constructor(props){
    super(props);

    this.state = {
      currentComplete: this.props.task.complete,
      clickCount: 0
    };

  }

  //helper method
  getClassName() {
    let className = '';
   if(this.state.currentComplete){
//    if(this.props.task.complete){
      className = 'font-strike';
    }
    return className;    
  }

  doSomething = (evt) => {  //click handlier
    //app.toggleTask(this.id);

    console.log("You clicked on", this.props.task.description);
    //this.props.task.complete = !this.props.task.complete;

    //modify state

    // this.setState(  (currState, currProps) => {
    //   let updatedState = {
    //     currentComplete: !currState.currentComplete //account for intermediate changes
    //   }
    //   return updatedState; //this is what I want to merge in when you have a sec
  
    // })
    //console.log(this.state.currentComplete);
  };

  render() {
    console.log("rendering", this.props.task.description)
    return (
      <li className={this.getClassName()} onClick={this.doSomething} >
        {this.props.task.description} ({this.state.clickCount});
      </li>
    );
  }
}

class AddTaskForm extends Component {
  render() {
    return (
      <form>
        <input 
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          />
        <button className="btn btn-primary" >
          Add task to list
        </button>
      </form>
    );
  }
}

export default App;