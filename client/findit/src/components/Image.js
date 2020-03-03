import React from 'react';

class Image extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.href}>
                <img src={this.props.src} alt="Failed to load images"/>
            </a>
        )
    }
}

export default Image;