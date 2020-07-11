import React, { Component } from 'react'
import logo from './logo.svg'
import { connect } from 'react-redux'
import { miThunk } from './thunk'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		const { miThunk } = props
		miThunk('lala')
	}

	render() {
		console.log(this.props);
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
			</div>
		)
	}
}

const mapStateToProps = state => state

const mapDispachToProps = dispatch => ({
	miThunk: payload => dispatch(miThunk(payload))
})

export default connect(mapStateToProps, mapDispachToProps)(App)
