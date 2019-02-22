import React from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

class RecipeCard extends React.Component {
  
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary);
  };

  render() {
    let base64String = this.arrayBufferToBase64(this.props.recipe.image.data.data);
    
    return (
    <Card className={this.props.classes.card}>
      <CardMedia
        className={this.props.classes.cardMedia}
        image={"data:image/png;base64," + base64String}
        title={this.props.recipe.name}
        />
      <CardContent className={this.props.classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {this.props.recipe.name}
        </Typography>
        <Typography>
          {this.props.recipe.source_url}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={NavLink} to={`/recipe/${this.props.recipe._id}`}>
          View 
        </Button>
      </CardActions>
    </Card>
    )
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeCard);