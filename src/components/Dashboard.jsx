import { toast } from "react-toastify";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import AddTodo from "../components/AddTodo";
import Header from "./../components/Header";
import ListItem from "../components/ListItem";
import Loading from "./Loading";
// import emptyList from "../assets/images/emptyList.png";
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
      hasUserData: false,
      todos: [],
      hasTodoList: false,
      parentId: "",
      isSubTask: false,
      currentTab: "all",
      showModal: false
    };
    this.getTodos = this.getTodos.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.getUserData();
    this.getTodos();
  }

  getUserData() {
    userServices.getUserData().then(res => {
      this.setState({
        userData: res.data,
        hasUserData: true
      });
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
          todos: response.data,
          hasTodoList: true
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
            hasUserData={this.state.hasUserData}
            userData={this.state.userData}
          />
          <div className="dashboard__container">
            <div className="dashboard__content">
              <div className="dashboard__options">
                <button
                  className="btn dashboard__addIcon"
                  onClick={this.onAddIconClick}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <div className="dashboard__searchContainer">
                  <input
                    type="text"
                    placeholder="Enter your search item..."
                    name="search"
                    className="dashboard__searchField"
                    value={this.state.searchTerm}
                    onChange={this.onSearch}
                  />
                  <i className="fas fa-search dashboard__searchIcon"></i>
                </div>
                <nav className="dashboard__tabs">
                  <button
                    className={
                      "btn dashboard__tab" +
                      (this.state.currentTab === "all" ? "--active" : "")
                    }
                    onClick={() => this.tabSelectedHandler("all")}
                  >
                    All
                  </button>
                  <button
                    className={
                      "btn dashboard__tab" +
                      (this.state.currentTab === "completed" ? "--active" : "")
                    }
                    onClick={() => this.tabSelectedHandler("completed")}
                  >
                    Completed
                  </button>
                  <button
                    className={
                      "btn dashboard__tab" +
                      (this.state.currentTab === "remaining" ? "--active" : "")
                    }
                    onClick={() => this.tabSelectedHandler("remaining")}
                  >
                    Remaining
                  </button>
                </nav>
              </div>

              <div className="body-container">
                {this.state.hasTodoList ? (
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
                            handleLogOut={this.handleLogOut}
                          />
                        );
                      })
                    ) : (
                      <div className="empty-list">
                        <img
                          src="./assets/icons/emptyList.png"
                          alt="No Todos"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
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
            </div>
          </div>
        </>
      );
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

export default Dashboard;
