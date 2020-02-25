import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: this.props.initialTasks
    }
  }

  toggleComplete = (taskId) => {
    this.setState((prevState, prevProps) => {

      let updatedTasks = prevState.tasks.map((eachTask) => {
        let copy = Object.assign({}, eachTask); //copy the object
        if(copy.id === taskId)
          copy.complete = !copy.complete;
        return copy; //put copy in the mapped list
      })

      let updatedState = {
        tasks: updatedTasks
      }
      return updatedState;
    })
  }

  addTask = (taskDescription) => {
    this.setState((prevState, prevProps) => {
      let copyTasks = prevState.tasks.map((eachTask) => {
        return Object.assign({}, eachTask); //copy the object
      })

      let newTask = {
        id: copyTasks.tasks[copyTasks.tasks.length].id + 1, //add 1 to id
        description: taskDescription,
        complete: false
      }
      copyTasks.push(newTask);
      return {tasks: copyTasks};
    });
  }

  render() {
    let tasks = this.state.tasks; //local name for readability

    //do data processing
    let incomplete = tasks.filter((task) => !task.complete);

    return (
      <div className="container">
        <p className="lead">Things I have to do ({incomplete.length})</p>
        <TaskList taskArray={tasks} />
        <AddTaskForm />
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    //do data processing
    let taskComponents = this.props.taskArray.map((eachTask) => {
      let singleTask = (
        <Task 
          key={eachTask.id} 
          task={eachTask} 
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
  constructor(props){
    super(props);

    this.state = {
      currentComplete: this.props.task.complete
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
    this.setState(  (prevState, prevProps) => {
      let updatedState = {
        currentComplete: !prevState.currentComplete, //account for intermediate changes
      }
      return updatedState; //this is what I want to merge in when you have a sec
  
    })
  };

  render() {
    console.log("rendering", this.props.task.description)
    return (
      <li className={this.getClassName()} onClick={this.doSomething} >
        {this.props.task.description}
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