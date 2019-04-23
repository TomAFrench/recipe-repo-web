import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'

import { Typography } from '@material-ui/core'

const styles = theme => ({
})

function IngredientTypography (props) {
  const matches = useMediaQuery('(min-width:1000px)')
  return (
    <Typography className={props.classes.ingredient} display='inline' variant='h6' color='textSecondary' noWrap={matches} paragraph>
      {props.children}
    </Typography>
  )
}

IngredientTypography.propTypes = {
  classes: PropTypes.object.isRequired,
  ingredient: PropTypes.object.isRequired
}

export default withStyles(styles)(IngredientTypography)
