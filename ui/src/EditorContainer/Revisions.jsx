import React from "react";
import Request from "../Util/Request";

export default class extends React.Component {

    state = {
        revisions: []
    }

    fetchRevisions = (e) => {
        Request.get("/revisions").then(resp => this.setState({ revisions: resp.data.revisions }));
    }

    render() {
        return <div>
            <div className="revisions">
                {this.state.revisions.map((revision, key) => <div className="revision-box" key={key}>
                    <h2>Revision - {key} <button onClick={()=>this.props.setContent(revision)}>Choose</button></h2>
                    <p>{revision}</p>
                </div>)}
            </div>
        </div>
    }

    componentDidMount(){
        this.fetchRevisions();
    }
}