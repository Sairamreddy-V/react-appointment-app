import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import ListItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {list: [], usageList: [], title: '', description: '', starred: false}

  onTextChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    const date = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    console.log(date)
    this.setState({description: date})
  }

  onStarred = () => {
    const {starred, list} = this.state
    let result
    if (starred === false) {
      result = list
    } else {
      result = list.filter(eachOne => eachOne.isStarred === true)
    }
    this.setState(prevState => ({
      usageList: result,
      starred: !prevState.starred,
    }))
  }

  onAddButton = () => {
    const {title, description} = this.state
    console.log(title)
    console.log(description)
    this.setState(prevState => ({
      list: [
        ...prevState.list,
        {id: uuidv4(), name: title, description: description, isStarred: false},
      ],
      usageList: [
        ...prevState.list,
        {id: uuidv4(), name: title, description: description, isStarred: false},
      ],
      title: '',
      description: '',
    }))
  }

  onstarClick = id => {
    const {list, usageList} = this.state
    this.setState(prevState => ({
      list: list.map(eachOne => {
        if (eachOne.id === id) {
          return {...eachOne, isStarred: !eachOne.isStarred}
        } else {
          return eachOne
        }
      }),
      usageList: usageList.map(eachOne => {
        if (eachOne.id === id) {
          return {...eachOne, isStarred: !eachOne.isStarred}
        } else {
          return eachOne
        }
      }),
    }))
  }

  render() {
    const {usageList, title, description} = this.state
    console.log(usageList)
    return (
      <div className="page-container">
        <div className="card-container">
          <div className="card-top-container">
            <form className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <div>
                <label className="label-elment" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="input-element"
                  id="title"
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={this.onTextChange}
                />
              </div>
              <div>
                <label className="label-elment" htmlFor="Date">
                  DATE
                </label>
                <input
                  className="input-element"
                  id="Date"
                  type="date"
                  value={description}
                  placeholder="dd/mm/yyyy"
                  onChange={this.onDateChange}
                />
              </div>
              <button
                className="button"
                data-testid="Add"
                type="button"
                onClick={this.onAddButton}
              >
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                className="image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="heading-starred-container">
            <h1 className="heading2">Appointments</h1>
            <button
              data-testid="star"
              className="starred-button"
              onClick={this.onStarred}
            >
              Starred
            </button>
          </div>
          <ul className="ul-container">
            {usageList.map(eachItem => (
              <ListItem
                details={eachItem}
                key={eachItem.id}
                onStar={this.onstarClick}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
