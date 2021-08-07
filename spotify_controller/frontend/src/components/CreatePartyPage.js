import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

export default class CreatePartyPage extends Component {
  defaultVotes = 2;
  constructor(props) {
    super(props);
  }
  render() {
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center"> Guest Control of PlayBack State </div>
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>;
  }
}
