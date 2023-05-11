import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const changeHundler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setTask(e.target.value);
  }

  const submitHundler = (e) => {
    e.preventDefault();
    let url = "http://localhost:8081/task/add";
    console.log(task)
    axios.post(url, {
      id: 0,
      text: task,
      status: 0,
    }).then((reponse) => {
      console.log(reponse.data)
    }).catch((error) => { console.log(error) })

  }

  useEffect(() => {
    getTasks();
  }, [task])

  useEffect(() => {
    getTasks();
  }, [])

  function getTasks() {
    let url = "http://localhost:8081/task/list";
    axios.get(url).then((reponse) => {
      console.log(reponse.data);
      setList(reponse.data);
    }).catch((error) => { console.log(error) })
  }

  return (
    <div className='mt-3'>
      <form onSubmit={submitHundler}>
        <div className='row'>
          <div className='col-md-6'>
            <input onChange={changeHundler} className='form-control ms-1' name='task' type='text' placeholder='Write somthing...' />
          </div>
          <div className='col-md-4'>
            <input className='btn form-control btn-primary' type='submit' value="send" />
          </div>
        </div>
      </form>
      <div className='container'>
        <div className='row'>
          {
            list.map((task, index) => {
              return (
                <div key={index}>
                  {task.text}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
