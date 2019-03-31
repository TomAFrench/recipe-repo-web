import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { NavLink } from 'react-router-dom'

import RestaurantIcon from '@material-ui/icons/Restaurant'
import SettingsIcon from '@material-ui/icons/Settings'
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  list: {
    width: 250
  }
})

class SidebarDrawer extends React.Component {
  render () {
    const sideList = (
      <div className={this.props.classes.list}>
        <List>
          <ListItem button key={'Recipes'} component={NavLink} to='/'>
            <ListItemIcon><RestaurantIcon /></ListItemIcon>
            <ListItemText primary={'Recipes'} />
          </ListItem>
          <ListItem button key={'Add New Recipe'} component={NavLink} to='/create_recipe'>
            <ListItemIcon><RestaurantIcon /></ListItemIcon>
            <ListItemText primary={'Add New Recipe'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={'Settings'}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
          <ListItem button key={'About Recipe Repo'} component='a' href={process.env.REACT_APP_GITHUB_URL}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary={'About Recipe Repo'} />
          </ListItem>
        </List>
      </div>
    )

    return (
      <Drawer open={this.props.open} onClose={this.props.handleClose}>
        <div
          tabIndex={0}
          role='button'
          onClick={this.props.handleClose}
          onKeyDown={this.props.handleClose}
        >
          {sideList}
        </div>
      </Drawer>
    )
  }
}

SidebarDrawer.propTypes = {
}

export default withStyles(styles)(SidebarDrawer)
