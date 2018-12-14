import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, TextField, MenuItem } from "@material-ui/core";
import classNames from "classnames";
import { driver } from "./neo4j";
import { FETCH_USER_INFO_QUERY } from "./exercises/exercise0";

const styles = theme => ({});
const userPersonas = [
  "7C4B2Skmh4X9f8xJDo9O4w",
  "Lk70TsLeGBYSXsnr5q-cXg",
  "ELcQDlf69kb-ihJfxZyL0A",
  "f_5VRh79aew1cVWUmC1PJA",
  "LPVSaUBvnSavuv_dgzrRSA",
  "s76BDmBx_8kcxGFDiU6k_g",
  "S-oatbN-h7SKiWwkTWw5QA",
  "wTfb2nfzPIyFcYQArdPtuQ"
];

// selectedUser={this.state.selectedUser}
// userPersonas={this.state.userPersonas}
// handleUserChange={this.handleUserChange}

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "",
        numReviews: 0,
        categories: [],
        averageStars: 0.0
      }
    };
    this.fetchUserInfo();
  }

  handleChange = name => event => {
    const val = event.target.value;

    if (name === "user") {
      this.props.handleUserChange(val);
      this.fetchUserInfo(val);
    }
  };

  fetchUserInfo = (user) => {
    console.log("CALLING FETCH USER");
    console.log(this.props.selectedUser);
    const session = driver.session();
    session
      .run(FETCH_USER_INFO_QUERY, {
        userId: user    //this.props.selectedUser
      })
      .then(result => {
        console.log(result);
        const record = result.records[0];
        const userInfo = record.get("userInfo");
        this.setState({
          userInfo
        }, ()=> {console.log(this.state)});
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        session.close();
      });
  };

  render() {
    const { classes } = this.props;
    const { name, numReviews, categories, averageStars } = this.state.userInfo;
    return (
      <div>
        <Paper>
          <form className="classes.container" noValidate authComplete="off">
            <TextField
              id="select-user"
              select
              className={classes.textField}
              value={this.props.selectedUser}
              onChange={this.handleChange("user")}
              helperText="Please select your user persona"
              margin="normal"
              variant="outlined"
            >
              {userPersonas.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </Paper>

        <Paper>
          <h1>{name}</h1>
          <ul>
            <li> Num reviews: {numReviews}</li>
            <li> Average stars: {averageStars.toFixed(2)}</li>
            <li> Categories: {categories.join(", ")} </li>
          </ul>
        </Paper>
      </div>
    );
  }

  changeSelectedUser = user => {
    this.props.handleUserChange(user);
  };
}

export default withStyles(styles)(UserProfile);
