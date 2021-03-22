import React, { Component } from 'react'

export default class Form extends Component {
    constructor(){
        super()
        this.inputRef = React.createRef();  
    }
    state = {
        name: "",
        error: ""
    }


    componentDidMount() {
       
        
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
       
        if (this.state.name.length < 3) {
            this.setState({ error: "Minimum 3 Characters Required" })
            this.inputRef.current.classList.add("form-input-error")
        }
        else if (this.state.name.charAt(0).toLowerCase() == this.state.name.charAt(0)) {
            this.setState({ error: "Name must start with Uppercase" })
            this.inputRef.current.classList.add("form-input-error")
        } else {
            this.setState({ error: "" })
            localStorage.setItem("name", this.state.name)
            this.inputRef.current.classList.remove("form-input-error")
            this.props.history.push("/")
        }
    }


    render() {
        const error = this.state.error
        const value = this.state.name
        return (
            <form onSubmit={this.handleSubmit} className="board">
                <div className="form">
                    <div className="form-div-header">
                        <h3 className="form-header">Login Form</h3>
                    </div>
                    <input ref={this.inputRef}  id="input1" value={value} className="form-input" type="text" name="" id="" placeholder="Your Name" onChange={this.handleChange} />
                    {error ? (<div className="form-error"><p className="form-error">{error}</p></div>) : (<div className="form-error"><p className="form-error" style={{ color: "transparent" }}>aa</p></div>)}

                    <button className="form-btn">Submit</button>
                </div>

            </form>
        )
    }
}
