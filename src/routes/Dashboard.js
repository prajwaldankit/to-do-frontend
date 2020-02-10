import { toast } from "react-toastify";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";

import "../styles/App.css";
import "../styles/Dashboard.css";
import FAB from "../components/FAB";
import AddTodo from "../components/AddTodo";
import ListItem from "../components/ListItem";
import emptyList from "../assets/images/emptyList.png";
import { getToDoList, editToDoItem, removeToDoItem } from "./../services/todo";

/**
 *
 *
 * @export
 * @class Dashboard
 * @extends {Component}
 */
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
    this.getTodos = this.getTodos.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
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
    value.checked = !value.checked;
    editToDoItem({ _id: value._id, checked: value.checked })
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
    removeToDoItem(value)
      .then(response => {
        toast.success("the item has been deleted");
        let tempItems =
          this.state.todos &&
          this.state.todos.length &&
          this.state.todos.filter(
            (tempValue, index) => value._id !== tempValue._id
          );
        this.setState({ todos: tempItems });
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
            reloadList={this.getTodos}
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
