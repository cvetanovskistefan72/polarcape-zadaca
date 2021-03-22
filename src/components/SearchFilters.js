import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select';
 


export default class SearchFilters extends Component {
    state={
        name:"",
        selectedColors:[],
        types:[],
        selectedTypes:[],
        selectedSort:"asc",
        colors:[{ value:"black",label:"black"},
            { value:"white",label:"white"},
            { value:"green",label:"green"},
            { value:"red",label:"red"},
            { value:"blue",label:"blue"}],
        sortby:[{ value:"asc",label:"Sort by Name A-Z"},{ value:"desc",label:"Sort by Name Z-A"}]
    }

   async componentDidMount(){
        const response = await axios.get("https://api.magicthegathering.io/v1/types")
        const newArray = response.data.types.map((type)=>{
            return { value:type,label:type,}
        })
        this.setState({
            types:newArray
        })
    }
    handleFilter=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleMultiSelect=(types)=>{
        this.setState({
            selectedTypes:types
       })
    }
    handleMultiSelect2=(colors)=>{
        this.setState({
            selectedColors:colors
       })
    }
    handleMultiSelect3=(sortBy)=>{
       this.setState({
           selectedSort:sortBy.value
       })
    }
    render() {

        const types = this.state.types
        const colors = this.state.colors
        const sorted = this.state.sortby

        return (
            <div   className="search-filters">
            <div className="tooltip-div">
            <div class="tooltip"><h3><span className="exclamation">!</span>Instructions </h3>
                <span class="tooltiptext">To filter, first select one of the fields (Types or Colors),
                 If you are looking for a specific card, type the Card's NAME in the search box.
                  <b>Then click the Search button.</b>
                To view all products again, clear the filters and click the Search button again.</span>
                </div>
                
                            </div>
                <div className="search-filters-inputs1">
                        <input name="name" type="text" placeholder="Search Card" onChange={this.handleFilter}/>
                        <button onClick={()=>this.props.setFilter(this.state)} >Search</button>   
                </div>
                <br/>
                
                <div className="search-filters-inputs2" >
                <Select
                    isMulti
                    onChange={this.handleMultiSelect}
                    options={types}
                    placeholder="Search by Types"
                    styles={{option: (provided, state) => ({
                            ...provided,
                            border: "1px dotted black",
                            color: state.data.color,
                            opacity: 0.8,
                            padding: 20,
                        }),
                        control: (provided) => ({
                            ...provided,
                            width: 250,
                            background: "white",
                        }),
                        singleValue: (provided, state) => ({
                            ...provided,
                            color: state.data.color,
                        })}}
                    
                />
                <Select
                    isMulti
                    onChange={this.handleMultiSelect2}
                    options={colors}
                     
                    placeholder="Search by Colors"
                    styles={{option: (provided, state) => ({
                            ...provided,
                            border: "1px dotted black",
                            color: state.data.color,
                            opacity: 0.8,
                            padding: 20,
                        }),
                        control: (provided) => ({
                            ...provided,
                            width: 250,
                            background: "white",
                        }),
                        singleValue: (provided, state) => ({
                            ...provided,
                            color: state.data.color,
                        })}}
                    
                />
                

                <Select
                     
                    onChange={this.handleMultiSelect3}
                    options={sorted}
                    defaultValue={sorted[0]}
                    placeholder="Sort by Names"
                    styles={{option: (provided, state) => ({
                            ...provided,
                            border: "1px dotted black",
                            color: state.data.color,
                            opacity: 0.8,
                            padding: 20,
                        }),
                        control: (provided) => ({
                            ...provided,
                            width: 250,
                            background: "white",
                        }),
                        singleValue: (provided, state) => ({
                            ...provided,
                            color: state.data.color,
                        })}}
                    
                />
                
                 
         </div>


            </div>
        )
    }
}
