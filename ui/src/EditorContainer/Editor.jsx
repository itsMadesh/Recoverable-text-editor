import React from "react";
import Request from "../Util/Request";
import Revisions from "./Revisions.jsx";

const THRESHOLD = 3;


export default class Editor extends React.Component {

    revisionsRef = React.createRef();

    state = {
        content: "",
        newChangesCount: 0
    }

    createFile = (e) => {
        console.log("clicked")
    }

    uploadFile = (e) => {

    }

    downloadFile = (e) => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('file').value], {
            type: "text/plain;charset=utf-8"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
    }

    getRevisions = (e) => {
        Request.get("/revisions").then(resp => console.log(resp.data));

    }

    shouldStoreNewRevision = (e) => {
        // const newContent = e.target.value, currContent = this.state.content;
        // console.log(e.target.value);
        // const lengthDiff = newContent.length - currContent.length;
        // if (lengthDiff > 0) {
        //     console.log("inserted");
        //     this.state.newChangesCount++;
        // }
        // else {
        //     console.log("deleted");
        //     this.state.newChangesCount++;
        // }
        this.state.newChangesCount++;
        if (this.state.newChangesCount >= THRESHOLD) {
            return true;
        }
        return false;
    }

    storeNewRevision = (content) => {
        Request.post("/edit", { content }).then(resp => {this.revisionsRef.current.fetchRevisions()});
    }

    handleChange = (e) => {
        if (this.shouldStoreNewRevision(e)) {
            this.storeNewRevision(e.target.value);
            this.state.newChangesCount = 0;

        }
        this.setContent(e.target.value);
    }

    setContent = (content) => {
        this.setState({ content });
    }

    render() {
        return <div id="textContainer">
            <div className="currentVersion">
                <div className="user_choice">
                    <button className="options" onClick={this.uploadFile}>Upload</button>
                    <button className="options" onClick={this.downloadFile}>Download</button>
                </div>
                <textarea id="file" onChange={this.handleChange} value={this.state.content}></textarea>
            </div>
            {/* <div className="oldVersion">
                <div className="user_choice">
                    <button className="options" onClick={this.getRevisions}>Revisions</button>
                </div>
                <textarea id="revision"></textarea>
            </div> */}
            <Revisions setContent={this.setContent} ref={this.revisionsRef} />
        </div>
    }

    storeNewRevisionAtAutoInterval = () => {
        if (this.state.newChangesCount > 0) {
            this.storeNewRevision(this.state.content);
            this.state.newChangesCount = 0;
        }
    }

    componentDidMount() {
        setInterval(this.storeNewRevisionAtAutoInterval, 3000);
    }
}