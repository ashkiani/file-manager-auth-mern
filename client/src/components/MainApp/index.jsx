import React, { Component } from 'react'
import AppNavBar from "../AppNavBar"
import OpenFiles from "../OpenFiles"

export default class index extends Component {
    constructor() {
        super();
        this.state = { openFileIds: [], openFiles: [] };
    }

    closeFileFunction = async (id) => {
        let arr = this.state.openFileIds;
        if (arr.includes(id)) {
            const newFileIds = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== id) {
                    newFileIds.push(arr[i]);
                }
            }
            if (newFileIds.length === 0) {
                this.setState({
                    openFileIds: [],
                    openFiles: []
                });
            } else {
                this.setState({
                    openFileIds: newFileIds,
                    openFiles: <OpenFiles ids={newFileIds} closeFileFunction={this.closeFileFunction} />
                });
            }
        }
    }
    openFileFunction = (id) => {
        let arr = this.state.openFileIds;
        if (!arr.includes(id)) {
            arr = arr.concat([id]);
            this.setState({
                openFileIds: arr,
                openFiles: <OpenFiles ids={arr} closeFileFunction={this.closeFileFunction} />
            });
        }
    };
    render() {
        return (
            <div>
                <AppNavBar openFunction={this.openFileFunction} />
                <div>
                    {this.state.openFiles}
                </div>
            </div>
        )
    }
}
