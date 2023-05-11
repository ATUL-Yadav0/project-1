import React from "react";
import axios from "axios";
import '../Styles/mainpage.css';
import Banner from './Homepage_Banner';
import QuickSearch from './Homepage_QuickSearch';


/* TO connect from DataBase */


class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [],
            melatype: []
        }
    }

    componentDidMount(){
        axios({
            url: "http://localhost:5500/location",
            method: "Get",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ locations: res.data.location})
        })
        .catch(err => console.log(err))

        axios({
            url: "http://localhost:5500/mealtype",
            method: "Get",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ mealtype: res.data.mealtypes})
        })
        .catch(err => console.log(err))
    }


/* Homepage connect */

    render(){
        
        const { locations, mealtype } = this.state;

        return(
            <div>
                {/* Banner Part (upper) */}

                <Banner locationData = { locations } />

                {/* Quick Searches Part (lower) */}

                <QuickSearch mealtypeData = { mealtype } />
                
            </div>
        )
    }
}

export default Home;