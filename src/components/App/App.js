import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  postOrder = (newOrder) => {
    if(!newOrder.name || !newOrder.ingredients) {
      this.setState({error: true})
    } else { fetch("http://localhost:3001/api/v1/orders", {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ 
          name: newOrder.name,
          ingredients: newOrder.ingredients,
      })
  })
  .then(res => {
    if(!res.ok) {
      throw new Error()
    } else {
      this.setState({error: false})
      return res.json()
    }
  })
  .catch(err => this.setState({error: true}));
  }
}
  deleteOrder = (id) => {
    fetch(`http://localhost:3001/api/v1/orders/${id}`, {
          method:'DELETE',
      })
}
  componentDidMount() {
    getOrders()
    .then(data => {
      this.setState({orders: data.orders})
    })
      .catch(err => console.error('Error fetching:', err));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.orders.length !== this.state.orders.length) {
      getOrders()    
      .then(data => {
        this.setState({orders: data.orders})
      })
        .catch(err => console.error('Error fetching:', err));
    }
  }

  addOrder = (newOrder) => {
    this.setState({orders: [...this.state.orders, newOrder]})
    this.postOrder(newOrder)
  }

  trashOrder = (id) => {
    const filteredOrders = this.state.orders.filter(order => order.id !== id)
    this.setState({orders: filteredOrders})
    this.deleteOrder(id)
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>
        {this.state.error && <h1 className='error-message'>please enter your name or choose an ingredient</h1>}
        <Orders orders={this.state.orders} trashOrder={this.trashOrder}/>
      </main>
    );
  }
}


export default App;
