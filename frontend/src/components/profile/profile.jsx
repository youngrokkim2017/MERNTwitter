import React from 'react';
import TweetBox from '../tweets/tweet_box';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        console.log(this.props.currentUser.id);
        this.props.fetchUserTweets(this.props.currentUser.id);
    }

    componentWillReceiveProps() {
        this.setState({ tweets: newState.tweets });
    }

    render() {
        if (this.state.tweets.length === 0) {
            return (<div>This user has no Tweets</div>)
        } else {
            return (
                <div>
                    <h2>All of this User's Tweets</h2>
                    {this.state.tweets.map(
                        <TweetBox key={tweet._id} text={tweet.text} />
                    )}
                </div>
            );
        };
    }
}