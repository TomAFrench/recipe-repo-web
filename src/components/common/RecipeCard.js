import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Typography, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
})

class RecipeCard extends React.Component {
  render () {
    return (
      <Card className={this.props.classes.card}>
        <CardMedia
          className={this.props.classes.cardMedia}
          image={typeof this.props.recipe.image !== 'undefined' ? process.env.REACT_APP_API_URL + '/' + this.props.recipe.image.path : ''}
          title={this.props.recipe.name}
        />
        <CardContent className={this.props.classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {this.props.recipe.name}
          </Typography>
          <Typography color='textSecondary' component='a' href={this.props.recipe.sourceUrl} style={{ textDecoration: 'none' }}>
            {this.props.recipe.sourceName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary' component={NavLink} to={`/recipe/${this.props.recipe._id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    )
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeCard)
