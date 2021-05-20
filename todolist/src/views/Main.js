import React, { useCallback, useEffect, useRef, useState } from "react";
import "../App.css";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AddItem from "../components/Main/AddItem";
import SearchForm from "../components/Main/SearchForm";
import SortForm from "../components/Main/SortForm";
import TaskForm from "../components/Main/TaskForm";
import TaskList from "../components/Main/TaskList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Main/Header";
import axios from "axios";

const getIndex = (id, tasks) => {
  let i = -1;
  tasks.forEach((val, index) => {
    if (val.id === id) {
      i = index;
    }
  });
  return i;
};

const randomstring = require("randomstring");

function App() {
  const [display, setDisplay] = useState(false);
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: false,
  });
  const [datas, setDatas] = useState([
    {
      id: randomstring.generate(),
      name: "Học ReactJS",
      status: true,
    },
    {
      id: randomstring.generate(),
      name: "Học ASP.NET MVC",
      status: false,
    },
    {
      id: randomstring.generate(),
      name: "Học REST API",
      status: false,
    },
  ]);
  const [userName, setUserName] = useState(null);
  const getDatas = useCallback(async () => {
    try {
      const option = {
        method: "get",
        url: "/api/v1/task",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios(option);
      const data = res.data.data;
      console.log(data);
      const newtask = data.map((task, index) => {
        return { id: task._id, name: task.task, status: task.status };
      });
      setDatas(newtask);
    } catch (error) {}
  }, [datas]);
  //   useEffect(() => {
  //     getDatas();
  //   }, [getDatas()]);
  const defaultData = useRef(datas);

  const [onSort] = useState(false);

  const onCloseForm = () => {
    setDisplay(false);
  };

  const onDisplay = (value) => {
    setDisplay(value);
  };

  const onGetStatus = (val) => {
    const index = getIndex(val, datas);
    const tasks = [...datas];
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    setDatas(tasks);
  };

  const onTask = (task) => {
    const tasks = [...datas];
    if (task.id === "") {
      task.id = randomstring.generate();
      task.status = task.status === "true" ? true : false;
      tasks.push(task);
    } else {
      const index = getIndex(task.id, tasks);
      task.status = task.status === "true" ? true : false;
      tasks[index] = task;
    }
    // console.log(task);
    setDatas(tasks);
  };

  const onGetUpdate = (id) => {
    const index = getIndex(id, datas);
    const t = datas[index];
    //console.log(t);
    setTask(t);
    setDisplay(true);
  };
  const onGetDelete = (id) => {
    const tasks = [...datas];
    const index = getIndex(id, tasks);
    if (index !== -1) {
      tasks.splice(index, 1);
      setDatas(tasks);
    }
  };
  const onGetSearch = (val) => {
    const tasks = [...defaultData.current];
    if (val) {
      const element = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      });
      setDatas(element);
    } else {
      setDatas(defaultData.current);
    }
  };

  const onGetSort = (val) => {
    console.log(val, typeof val);
    const tasks = [...datas];
    let element = [];
    if (val) {
      element = tasks.sort((task1, task2) => {
        if (task1.name < task2.name) return -1;
        if (task1.name > task2.name) return 1;
        return 0;
      });
    } else {
      element = tasks.sort((task1, task2) => {
        if (task1.name < task2.name) return 1;
        if (task1.name > task2.name) return -1;
        return 0;
      });
    }
    setDatas(element);
  };
  const setName = (username) => {
    setUserName(username);
  };
  return (
    <Router>
      <Header userName={userName} />
      <Switch>
        <div className="container">
          <Route exact path="/home">
            <h1 className="header text-centre">Quản lý công việc</h1>
            <hr />
            <br />

            {display ? (
              <TaskForm
                onCloseForm={onCloseForm}
                onTask={onTask}
                taskUpdate={task}
              />
            ) : (
              ""
            )}

            <div className="content-right">
              {/* <input type="submit" class="submit bg-blue mg-0 pd-0 btn-add" value = "Thêm công"/> */}

              <AddItem display={display} onDisplay={onDisplay} />

              <div className="search-swap">
                <SearchForm onGetSearch={onGetSearch} />
                <SortForm onSetSort={onSort} onGetSort={onGetSort} />
                <TaskList
                  tasks={datas}
                  onGetStatus={onGetStatus}
                  onGetUpdate={onGetUpdate}
                  onGetDelete={onGetDelete}
                />
              </div>
            </div>
          </Route>
          <Route exact path="/">
            <Login getUserName={setName} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
