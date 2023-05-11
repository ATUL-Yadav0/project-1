import React from "react";
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component{
    render(){
        const { mealtypeData } = this.props;

        return(
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div>
                            <h3 className="heading">Quick Searches</h3>
                            <p className="subheading">Discover restaurants by type of meal</p>
                        </div>
                    </div>

                    {/* QuickSearchitem */}
                    <div className="d-flex flex-wrap">
                        {
                            mealtypeData && mealtypeData.map((items) => {
                                return(
                                    <QuickSearchItem data = { items} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default QuickSearch;