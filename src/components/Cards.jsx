import React, { Component } from 'react'
import Loading from './Loading';

export default class Cards extends Component {

    render() {
        const cards = this.props.cards

        if ((this.props.cards.length && !this.props.isFiltered) || (this.props.cards.length && this.props.isFiltered)) {
            return (
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <div className="grid">
                        {
                            cards.map((card) => {
                                return (
                                    <div className="card" style={{ width: "18rem", boxShadow: "0px 0px 30px -10px gray" }}>
                                        <img src={card.imageUrl ? card.imageUrl : require('../img/noimage.png')} className="card-img-top" width="100%" height="200px" />
                                        <div style={{ padding: "10px", height: "225px" }} className="card-body">
                                            <h1 className="card-title">{card.name}</h1>
                                            <h4 className="card-text">{card.setName}</h4>

                                            <p>Type: {card.types}</p>
                                            <p>Color: {card.colors[0] ? card.colors[0] : "N/A"}</p>

                                        </div>
                                        <div style={{ padding: "10px" }}>
                                            <button className="card-button">See More</button>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            )
        }
        else if (!this.props.cards.length && this.props.isFiltered) {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h5>Not Found!</h5>
                </div>
            )
        } else {
            return (
                <div>
                    <Loading />
                </div>
            )
        }

    }
}
