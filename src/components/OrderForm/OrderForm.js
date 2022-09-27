import React, { Component } from 'react';
import "./OrderForm.css"

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      duplicates: false
    };
  }

  handleNameChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  } 

  handleIngredientChange = (event) => {
    event.preventDefault()
    const findDuplicates = () => this.state.ingredients.filter((ingredient, index) =>
      this.state.ingredients.indexOf(ingredient) !== index
      )
    const dups = findDuplicates()
    if(dups.includes(event.target.name)) {
      this.setState({duplicates: true})
    } else {
      this.setState({duplicates: false})
      this.setState({ingredients: [...this.state.ingredients, event.target.name]})
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state
    }
    this.props.addOrder(newOrder)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} className="ingredient-button" name={ingredient} onClick={this.handleIngredientChange}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <div className='order-details-container'>
          {this.state.duplicates && <h2 className='dupe-error'>You already have this ingredient in your list, select something else!</h2>}
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <div className='ingredient-buttons-container'>
            { ingredientButtons }
          </div>
          <p className='order-status'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        </div>
        <button className="order-button" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
