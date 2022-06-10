import React from "react";

export default class extends React.Component {

    state = {
        tags: [],
    };

    addTag = () => {
        const tags = [...this.state.tags, document.getElementById("input").value];
        this.setState({ tags: tags })
        this.props.disp();
    }

    render() {
        console.log("in table render")
        return <div>
            <div style={{ display: "flex" }}>
                <input id="input" />
                <button onClick={this.addTag}>+</button>
            </div>
            <div>
                {this.state.tags.map((tag,i) => <div key={i}>{tag}</div>)}
            </div>
        </div>
    }
}