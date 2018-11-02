import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = theme => ({});

class Photos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Photos</div>
        )
    }
}

export default withStyles(styles)(Photos);