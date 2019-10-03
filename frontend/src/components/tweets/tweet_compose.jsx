import React from 'react';
import TweetBox from './tweet_box';

export default class TweetCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            newTweet: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({newTweet: nextProps.newTweet.text});
    }

    handleSubmit(e) {
        e.preventDefault();

        let tweet = {
            text: this.state.text
        };

        this.props.composeTweet(tweets);
        this.setState({text: ''})
    }

    update() {
        return e => this.setState({
            rext: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                        type="textarea"
                        value={this.state.text}
                        onChange={this.update()}
                        placeholder="write your Tweet..."
                        />
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
                <br/>
                <TweetBox text={this.state.newTweet} />
            </div>
        );
    }
}