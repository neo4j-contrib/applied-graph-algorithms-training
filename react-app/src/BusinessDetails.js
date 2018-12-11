import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, TextField, MenuItem, Grid, Dialog, AppBar, Toolbar, Slide, IconButton, Typography, Button, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { FETCH_REVIEWS_QUERY } from "./exercises/exercise3";

import { driver } from "./neo4j";

const styles = theme => ({
    appBar: {
        position: 'relative',
      },
      flex: {
        flex: 1,
      },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class BusinessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  fetchReviews = () => {
      const session = driver.session();
      session.run(FETCH_REVIEWS_QUERY, {
          businessId: this.props.business.id
      })
      .then(result => {
          const record = result.records[0];
          const reviews = record.get("reviews");
          this.setState({
              reviews
          });
      })
      .catch(e => {
          console.log(e);
      })
      .finally(() => {
          session.close();
      })
  }

  render() {
      const { classes } = this.props;

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {this.props.business ? this.props.business.name : ""}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Text of review here" secondary="name of reviewer here" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Some other review here"
              secondary="Name of reviewer"
            />
          </ListItem>
        </List>
      </Dialog>
    );
  }
}

export default withStyles(styles)(BusinessDetails);
