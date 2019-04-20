import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core'
import { Menu as MenuIcon, Search as SearchIcon, Fastfood as FastfoodIcon } from '@material-ui/icons'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'

import SidebarDrawer from './SidebarDrawer'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10
  },
  icon: {
    position: 'relative',
    width: theme.typography.h6.fontSize,
    height: theme.typography.h6.fontSize
  },
  title: {
    marginLeft: 10,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class PrimarySearchAppBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false
    }
  }

  handleSideMenuOpen () {
    this.setState({ sidebarOpen: true })
  }

  handleSideMenuClose () {
    this.setState({ sidebarOpen: false })
  }

  render () {
    const { sidebarOpen } = this.state
    const { classes } = this.props

    const renderSideMenu = (
      <SidebarDrawer
        open={sidebarOpen}
        handleClose={this.handleSideMenuClose.bind(this)}
        handleOpen={this.handleSideMenuOpen.bind(this)}
      />
    )

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton className={classes.menuButton} onClick={this.handleSideMenuOpen.bind(this)} color='inherit' aria-label='Open drawer'>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' color='inherit' noWrap component={NavLink} to={`/`} style={{ textDecoration: 'none' }}>
              <FastfoodIcon className={classes.icon} /> Recipe Repo
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        {renderSideMenu}
      </div>
    )
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PrimarySearchAppBar)
