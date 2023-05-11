import React from "react";
import { useNavigate } from "react-router-dom";

    // class QuickSearch extends React.Component{

    const QuickSearchItem = (props) => {
        const { _id, name, content, image} = props.data;

        const nav = useNavigate();

        const ShowFilter = () => {
            nav('./filter',{replace: true})
        }
    
            return(
                <div>
                    <div onClick={() => ShowFilter(_id)}>
                        <div className="d-flex box mt-4" >
                            <div className="l-box">
                                <img src={`./img/${image}`} className="img-fluid img-qs" alt="I" />
                            </div>
                            <div className="r-box">
                                <h4 className="card-title">{name}</h4>
                                <p className="card-content">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>    
            )
    }
    export default QuickSearchItem;