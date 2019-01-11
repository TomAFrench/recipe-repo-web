import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    position: "relative",
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class MyFooter extends React.Component {
   
  render() {return (
    <footer className={this.props.classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Recipe Repo
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
      </Typography>
    </footer>
    )
  }
}

MyFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyFooter);