import React from "react";
import '../Styles/filter.css';
import axios from "axios";
import navHook from "./nav";

class Filter extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [],
            restaurants: [],
            location: undefined,
            lcost: undefined,
            hcost: undefined,
            cuisine: 1,
            sort: 1,
            page: 1
        }
    }

    componentDidMount(){
        axios({
            url: "http://localhost:5500/location",
            method: "GET",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ locations: res.data.location})
        })
        .catch(err => console.log(err))

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurant})
        })
        .catch(err => console.log(err))
    }

    handleLocationChange = (event) => {
        const location = event.target.value;

        const { sort, lcost, hcost, page } = this.state;

        const filterObj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurant, location})
        })
        .catch(err => console.log(err))
    }

    handleSortChange = (sort) => {
        const { location, lcost, hcost, page } = this.state;

        const filterObj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurant, sort})
        })
        .catch(err => console.log(err))
    }

    handleCuisineChange = (cuisine) => {
        
        const { location, lcost, hcost, page, sort } = this.state;

        const filterObj = {
            location: location,
            cuisine: cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurant, cuisine})
        })
        .catch(err => console.log(err))
    }

    handleCostChange = (lcost, hcost) => {
        const { location, sort, page } = this.state;

        const filterObj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurant, lcost, hcost})
        })
        .catch(err => console.log(err))
    }

    handlePageChange = (page) => {
        const { location, sort, lcost, hcost } = this.state;

        const filterObj = {
            location: location,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ restaurants: res.data.restaurant, page})
        })
        .catch(err => console.log(err))
    }

    handleNevigate = (res) => {
        this.props.navigate(`/details?restaurant=${res}`);
    }

    render(){
        const { locations, restaurants } = this.state;

        return(
            <div>
                {/* Navbar */}
                {/* <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                        <form className="d-flex nav-form">
                            <button type="button" className="btn btn-danger">Login</button>
                            <button type="button" className="btn btn-outline-light">Create an account</button>
                        </form>
                    </div>
                </nav> */}

                {/* Filter Page */}
                <div className="container mb-5">
                    <h2 className="filter-heading mt-3">Breakfast Places in Mumbai</h2>

                    {/* Filters */}
                    <div className="filter-box mt-2 pb-4">
                        <h5 className="filter-heading mt-2">Filters</h5>

                        <p className="filter-subheading">Select Location</p>

                        <select className="form-control selectLocation" onChange={this.handleLocationChange}>
                            <option value="0" disabled selected>Please type a location</option>
                                    {
                                        locations.map((item) => {
                                            return(
                                                <option value={item.city_id}>{`${item.name}`}</option>
                                            )
                                        })
                                    }
                        </select>

                        <p className="filter-subheading mt-4">Cuisine</p>

                        <input type="checkbox" id="North_Indian" name="Cuisine" onChange={()  => this.handleCuisineChange(1)} /> <label for="North_Indian" className="filter-content">North Indian</label> <br />
                        <input type="checkbox" id="South_Indian" name="Cuisine" onChange={() => this.handleCuisineChange(2)} /> <label for="South_Indian" className="filter-content">South Indian</label> <br />
                        <input type="checkbox" id="Chinese" name="Cuisine" onChange={() => this.handleCuisineChange(3)} /> <label for="Chinese" className="filter-content">Chinese</label> <br />
                        <input type="checkbox" id="Fast_Food" name="Cuisine" onChange={() => this.handleCuisineChange(4)} /> <label for="Fast_Food" className="filter-content">Fast Food</label> <br />
                        <input type="checkbox" id="Street_Food" name="Cuisine" onChange={() => this.handleCuisineChange(5)} /> <label for="Street_Food" className="filter-content">Street Food</label> <br />
                        
                        <p className="filter-subheading mt-4">Cost For Two</p>

                        <input type="radio" id="500" name="costfortwo" onChange={() => this.handleCostChange(1, 500)} /> <label for="500" className="filter-content">Less than ₹500</label> <br />
                        <input type="radio" id="1000" name="costfortwo" onChange={() => this.handleCostChange(500, 1000)} /> <label for="1000" className="filter-content"> ₹500 to ₹1000</label> <br />
                        <input type="radio" id="1500" name="costfortwo" onChange={() => this.handleCostChange(1000, 1500)} /> <label for="1500" className="filter-content">₹1000 to ₹1500</label> <br />
                        <input type="radio" id="2000" name="costfortwo" onChange={() => this.handleCostChange(1500, 2000)} /> <label for="2000" className="filter-content">₹1500 to ₹2000</label> <br />
                        <input type="radio" id="2000+" name="costfortwo" onChange={() => this.handleCostChange(2000, 5000)} /> <label for="2000+" className="filter-content">₹2000+</label> <br />

                        <h5 className="filter-heading mt-4">Sort</h5>

                        <input type="radio" id="ltoh" name="Sort"  onChange={() => this.handleSortChange(1)} /> <label for="ltoh" className="filter-content">Price low to high</label> <br />
                        <input type="radio" id="htol" name="Sort" onChange={() => this.handleSortChange(-1)} /> <label for="htol" className="filter-content">Price high to low</label> <br />

                    </div>

                    {/* Filter Result */}
                    <div className="result-box mt-2">

                        {/* Result-01 */}

                        {restaurants.length !=0 ?
                            restaurants.map((each, index) => {
                                return(
                                    <div className="results" key={index} onClick={() => this.handleNevigate(each._id)}>
                                        <div className="d-flex">
                                            <div className="lt-box">
                                                <img src={each.thumb} className="img-fluid img-qs" />
                                            </div>
                                            <div className="rt-box">
                                                <h4 className="result-heading">{each.name}</h4>
                                                <p className="result-subheading">{each.city_name}</p>
                                                <p className="result-text">{each.address}</p>
                                            </div>
                                        </div>
                                        
                                        <hr style={{color: "grey"}} />

                                        <div className="d-flex">
                                            <div className="ll-box">
                                                <p className="result-text">CUISINES:</p>
                                                <p className="result-text">COST FOR TWO:</p>
                                            </div>
                                            <div className="rl-box">
                                                <p className="result-text-blue">{each.Cuisine.map((r) => `${r.name} `)}</p>
                                                <p className="result-text-blue">₹{each.cost}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :<div>Sorry, No Results Found...</div>
                        }
                        

                        {/* Pagination */}
                        <div className="mt-5">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <span>{' < '}</span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePageChange(1)}>1</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePageChange(2)}>2</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePageChange(3)}>3</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePageChange(4)}>4</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePageChange(5)}>5</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                    <span>{' > '}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default navHook(Filter);