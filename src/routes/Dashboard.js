import React, { Component } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "../styles/App.css";
import "../styles/Dashboard.css";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import ListItem from "../components/ListItem";
import emptyList from "../assets/images/emptyList.png";
import AddTodo from "../components/AddTodo";
import FAB from "../components/FAB";

import { getToDoList, editToDoItem, removeToDoItem } from "./../services/todo";
export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      title: "",
      content: "",
      isAuthorized: true,
      userId: "",
      todos: [],
      currentTab: "all",
      showModal: false
    };
    this.getTodosAgain = this.getTodosAgain.bind(this);
  }
  componentDidMount() {
    getToDoList()
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

  getTodosAgain() {
    getToDoList()
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
    editToDoItem(value)
      .then(response => {
        toast.success("the checked status is changed");
      })
      .catch(err => {
        toast.error("sorry couldn't change the check status");
      });

    let tempItems = this.state.todos;
    for (let i = 0; i < tempItems.length; i++) {
      if (tempItems[i]._id === value._id) {
        tempItems[i].checked = !tempItems[i].checked;
      }
    }
    this.setState({ todos: tempItems });
  };

  onEditHandler = value => {
    console.log("Editing functionality yet to be implemented");
    toast.warn("this function is not yet available");
  };

  onDeleteHandler = value => {
    removeToDoItem(value)
      .then(response => {
        console.log("Response", response);
      })
      .catch(err => {});
    let tempItems = this.state.todos.filter(
      (tempValue, index) => value._id !== tempValue._id
    );
    this.setState({ todos: tempItems });
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
    console.log("tempItems", tempItems);
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
      showModal: true
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    if (this.state.isAuthorized) {
      let itemsToDisplay = this.getItemsToDisplay(this.state.currentTab);
      return (
        <div className="dashboard-container">
          <AddTodo
            show={this.state.showModal}
            handleClose={this.hideModal}
            reloadList={this.getTodosAgain}
          />
          <div className="dashboard-card">
            <div className="header-container">
              <div className="dashboard-logo-holder">
                <i className="fas fa-tasks dashboard-logo-icon"></i>Todo-app
              </div>
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
                        onDelete={event => {
                          this.onDeleteHandler(value);
                        }}
                        onCheck={event => {
                          this.onCheckHandler(value);
                        }}
                        onEdit={event => {
                          this.onEditHandler(value);
                        }}
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
          <FAB onClick={this.onAddIconClick} />
        </div>
      );
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}

export default Dashboard;
