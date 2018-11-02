import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = theme => ({});

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>UserProfile</div>
        )
    }
}

export default withStyles(styles)(UserProfile);