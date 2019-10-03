// component to render individual tweets

import React from 'react';

export default class TweetBox extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.text}</h3>
            </div>
        );
    }
}

/*
Although we're keeping it simple for this tutorial, 
we would also want to render some additional information (such as username and datetime) on this compone
Separating this functionality into its own component allows us to easily standardize the way we represent tweets across components.
*/