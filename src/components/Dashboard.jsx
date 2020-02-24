import { toast } from "react-toastify";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";

import "../styles/App.css";
import "./../styles/reset.css";
import "./../styles/Header.css";
import "../styles/Dashboard.css";
import AddIcon from "../components/FAB";
import AddTodo from "../components/AddTodo";
import Header from "./../components/Header";
import ListItem from "../components/ListItem";
import emptyList from "../assets/images/emptyList.png";
import * as todoServices from "../services/todoServices";
import * as userServices from "./../services/userServices";

/**
 *
 *
 * @export
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      title: "",
      content: "",
      isAuthorized: true,
      userData: {},
      todos: [],
      parentId: "",
      isSubTask: false,
      currentTab: "all",
      showModal: false
    };
    this.getTodos = this.getTodos.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillMount() {
    this.getUserLevel();
    this.setState({
      userData: this.props.location.state.userData
    });
  }

  componentDidMount() {
    this.getTodos();
  }

  getUserData() {
    userServices.getUserData().then(res => {
      console.log(res);
    });
  }

  getUserLevel() {
    this.setState({
      level: localStorage.getItem("level")
    });
  }

  handleLogOut() {
    localStorage.clear();
    this.setState({
      isAuthorized: false
    });
    toast.success("you are logged out");
  }

  getTodos() {
    todoServices
      .getToDoList()
      .then(response => {
        this.setState({
          todos: response.data
        });
      })
      .catch(err => {
        toast.error("Please Login again");
        this.setState({
          isAuthorized: false
        });
      });
  }

  onCheckHandler = value => {
    value.checked = !value.checked;
    todoServices
      .editToDoItem({ _id: value._id, checked: value.checked })
      .then(response => {
        toast.success(
          `${value.title} is now ${value.checked ? "checked" : "unchecked"}`
        );
        let tempItems = this.state.todos;
        this.setState({ todos: tempItems });
      })
      .catch(err => {
        toast.error("sorry couldn't change the check status");
      });
  };

  onEditHandler = value => {
    toast.warn("this function is not yet available");
  };

  onDeleteHandler = value => {
    todoServices
      .removeToDoItem(value)
      .then(res => {
        this.getTodos();
        toast.success("the item has been deleted");
      })
      .catch(err => {
        toast.error("the item could not be deleted");
      });
  };

  getItemsToDisplay = tab => {
    let tempItems = "";
    if (tab === "all") {
      tempItems = this.state.todos.filter(item => true);
    } else if (tab === "completed") {
      tempItems = this.state.todos.filter(item => item.checked);
    } else if (tab === "remaining") {
      tempItems = this.state.todos.filter(item => !item.checked);
    }

    if (this.state.searchTerm !== "") {
      let searchedItems = tempItems.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          item.content
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase())
      );
      return searchedItems;
    }
    return tempItems;
  };

  getCurrentTab = () => {
    return this.state.currentTab;
  };

  tabSelectedHandler = selectedTab => {
    this.setState({
      currentTab: selectedTab
    });
  };

  onSearch = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  onAddIconClick = () => {
    this.setState({
      isSubTask: false,
      showModal: true
    });
  };

  onAddSubTask = id => {
    this.setState({
      isSubTask: true,
      showModal: true,
      parentId: id
    });
  };

  hideModal = () => {
    this.setState({
      isSubTask: false,
      showModal: false,
      parentId: ""
    });
  };

  render() {
    if (this.state.isAuthorized) {
      let itemsToDisplay = this.getItemsToDisplay(this.state.currentTab);
      return (
        <>
          <Header
            isLogged={true}
            handleLogOut={this.handleLogOut}
            userData={this.state.userData}
          />
          <div className="dashboard-container">
            {this.state.showModal ? (
              <AddTodo
                isSubTask={this.state.isSubTask}
                parentId={this.state.parentId}
                show={this.state.showModal}
                handleClose={this.hideModal}
                reloadList={this.getTodos}
                level={this.state.userData.level}
              />
            ) : (
              <> </>
            )}
            <div className="dashboard-card">
              <div className="header-container">
                <div className="search-holder">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Enter your search item..."
                      aria-label="Enter your search item..."
                      aria-describedby="search"
                      value={this.state.searchTerm}
                      onChange={this.onSearch}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="search">
                        <i className="fas fa-search"></i>
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>

              <div className="body-container">
                <Tabs
                  defaultActiveKey="all"
                  id="tabs"
                  onSelect={this.tabSelectedHandler}
                >
                  <Tab eventKey="all" title="All" />
                  <Tab eventKey="completed" title="Completed" />
                  <Tab eventKey="remaining" title="Remaining" />
                </Tabs>
                <div className="list-holder">
                  {itemsToDisplay.length > 0 ? (
                    itemsToDisplay.map((value, index) => {
                      return (
                        <ListItem
                          key={index}
                          data={value}
                          userData={this.state.userData}
                          onDelete={event => {
                            this.onDeleteHandler(value);
                          }}
                          onCheck={event => {
                            this.onCheckHandler(value);
                          }}
                          onEdit={event => {
                            this.onEditHandler(value);
                          }}
                          onAddSubList={this.onAddSubTask}
                        />
                      );
                    })
                  ) : (
                    <div className="empty-list">
                      <img src={emptyList} alt="No Todos" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <AddIcon onClick={this.onAddIconClick} />
          </div>
        </>
      );
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

export default Dashboard;
