import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cards from './Cards'
import Navbar from './Navbar'
import SearchFilters from './SearchFilters'
import axios from 'axios'

export default class Dashboard extends Component {
    state = {
        cards: [],
        searchByName: "",
        searchByColor: [],
        sortByName: "asc",
        isFiltered: false,
        searchByTypes: []
    }

    async componentDidMount() {
        const response = await axios.get("https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English");
        this.setState({
            cards: response.data.cards
        })
    }


    setFilter = (filtered) => {
        if (filtered.selectedColors || !filtered.name || !filtered.selectedTypes) {
            this.setState({
                isFiltered: true
            })
        }

        this.setState({
            searchByName: filtered.name,
            sortByName: filtered.selectedSort,
            searchByColor: filtered.selectedColors ? filtered.selectedColors : [],
            searchByTypes: filtered.selectedTypes ? filtered.selectedTypes : []
        })

    }

    handlePush = (path) => {
        this.props.history.push("/" + path)
    }
    render() {
        const name = localStorage.getItem("name")
        const cards = this.state.cards
        const nameFilter = this.state.searchByName
        const colorFilter = this.state.searchByColor
        const sortByName = this.state.sortByName
        const typesFilter = this.state.searchByTypes
        const filteredByName = nameFilter ? this.filterByName(cards, nameFilter) : cards
        const filteredByColor = colorFilter.length ? (this.filteredColors(filteredByName, colorFilter)) : filteredByName
        const filteredTypes = typesFilter.length ? (this.filteredTypes(filteredByColor, typesFilter)) : filteredByColor
        const sorted = sortByName === "asc" ? filteredTypes.sort((a, b) => a.name > b.name) : filteredTypes.sort((a, b) => a.name < b.name)
        return (
            <div>
                {!name && (<Redirect to="login" />)}
                <Navbar name={name} handlePush={this.handlePush} />
                <SearchFilters setFilter={this.setFilter} />

                <Cards isFiltered={this.state.isFiltered} cards={sorted} />

            </div>
        )
    }



    filteredTypes(filteredByColor, typesFilter) {
        return filteredByColor.filter((card) => {
            for (let i = 0; i < typesFilter.length; i++) {
                if (card.types.length) {
                    if (typesFilter[i].value.toLowerCase() === card.types[0].toLowerCase()) {
                        return true
                    }
                }
            }


        })
    }

    filteredColors(filteredByName, colorFilter) {
        return filteredByName.filter((card) => {
            for (let i = 0; i < colorFilter.length; i++) {
                if (card.colors.length) {
                    if (colorFilter[i].value.toLowerCase() === card.colors[0].toLowerCase()) {
                        return true
                    }
                }
            }


        })
    }

    filterByName(cards, nameFilter) {
        return (cards.filter((card) => card.name.toLowerCase().includes(nameFilter.toLowerCase())))
    }
}
