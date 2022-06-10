import React from "react";
import Request from "../Util/Request";

const THRESHOLD = 3;

export default class Editor extends React.Component {

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
    getRevisions= (e) =>{
        Request.get("/revision", { content: "Select all revision" }).then(resp => console.log(resp.data));
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

    handleChange = (e) => {
        if (this.shouldStoreNewRevision(e)) {
            Request.post("/edit", { content: e.target.value }).then(resp => console.log(resp.data));
            this.state.newChangesCount = 0;

        }
        this.setState({ content: e.target.value });
    }

    render() {
        return <div id="textContainer">

            <div className="currentVersion">
                <div className="user_choice">
                    <button className="options" onClick={this.uploadFile}>Upload</button>
                    <button className="options" onClick={this.downloadFile}>Download</button>
                </div>
                <textarea  id="file" onChange={this.handleChange} value={this.state.content}></textarea>
            </div>
            <div className="oldVersion">
                <div className="user_choice">
                    <button className="options" onClick={this.getRevisions}>Revisions</button>
                </div>  
                <textarea  id="revision"></textarea>   
            </div>

        </div>

    }
}