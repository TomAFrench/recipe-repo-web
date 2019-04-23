import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'

import { Grid, Typography, withTheme } from '@material-ui/core'
import IngredientTypography from './IngredientTypography'

const styles = theme => ({
})

function IngredientsAndInstructions (props) {
  const matches = useMediaQuery(props.theme.breakpoints.up('md'))

  // Split the string on empty lines
  const instructionArray = props.instructions.split('\r\n\r\n')
  return (
    <Grid container item direction='row' spacing='40' wrap={matches ? 'nowrap' : 'wrap'}>
      <Grid item>
        <Typography display='inline' variant='h6' color='textPrimary' paragraph>
          Ingredients:
        </Typography>
        {props.ingredients.map((ingredient) => (
          <IngredientTypography>
            {ingredient.quantity !== 0 && ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
          </IngredientTypography>
        ))
        }
      </Grid>
      <Grid item>
        <Typography display='inline' variant='h6' color='textPrimary' paragraph>
          Instructions:
        </Typography>
        {instructionArray.map((instruction, index) => (
          <Typography display='inline' variant='h6' color='textSecondary' paragraph>
            {index + 1}. {instruction}
          </Typography>
        ))
        }
      </Grid>
    </Grid>
  )
}

IngredientsAndInstructions.propTypes = {
  classes: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
  instructions: PropTypes.string.isRequired
}

export default withTheme()(withStyles(styles)(IngredientsAndInstructions))
