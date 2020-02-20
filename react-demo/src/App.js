import React, { Component } from 'react';

class App extends Component {

  render() {
    let tasks = this.props.initialTasks; //local name for readability

    //do data processing
    let incomplete = tasks.filter((task) => !task.complete);

    return (
      <div className="container">
        <p className="lead">Things I have to do ({incomplete.length})</p>
        <TaskList tasks={tasks} />
        <AddTaskForm />
      </div>
    );
  }
}

class TaskList extends Component {  
  render() {
    //do data processing
    let taskComponents = this.props.tasks.map((eachTask) => {
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
  //helper method
  getClassName() {
    let className = '';
    if(this.props.task.complete){
      className = 'font-strike';
    }
    return className;    
  }

  render() {
    return (
      <li className={this.getClassName()} >
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