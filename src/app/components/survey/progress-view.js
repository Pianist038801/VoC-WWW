import React from 'react';

import './progress-view.css';

export class ProgressView extends React.Component {
    constructor(props) {
        super(props);

        // initialize state
        this.state = { visible: true };
    }

    render() {
        const style = Object.assign({
            visibility: this.state.visible ? "visible" : "hidden",
            opacity: this.state.visible ? 1 : 0
        }, this.props.style);

        return (
            <div className="progress-view" style={style}>
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <div className="circle-3"></div>
            </div>
        );
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }
}
