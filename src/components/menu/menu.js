import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import { showDrawer, changeCata, hideDrawer } from '../../actions/menu'
import { AtDrawer } from 'taro-ui'
import { validateUser } from '../../actions/user'
import './menu.less'

@connect(function(store) {
  return {...store.menu, user: store.user}
}, function(dispatch) {
  return {
    showMenu() {
      dispatch(showDrawer())
    },
    changeCata(cata) {
      dispatch(changeCata(cata))
    },
    hideMenu() {
      dispatch(hideDrawer())
    }
  }
})
class Menu extends Component {
  showDrawer() {
    this.props.showMenu()
  }
  getItems(cataData) {
    return cataData.map(item => item.value)
  }
  clickCata(index) {
    let { cataData } = this.props
    let clickCata = cataData[index]
    if(clickCata.key !== this.props.currentCata.key) {
      this.props.changeCata(clickCata)
    }
  }
  closeDrawer() {
    this.props.hideMenu()
  }
  toUser() {
    let { user } = this.props;
    validateUser(user).then(result => {
      if(result) {
        Taro.navigateTo({
          url: '/pages/user/user'
        })
      } else {
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  }
  render() {
    const { showDrawer, cataData } = this.props
    const items = this.getItems(cataData)
    return (
      <View className="topiclist-menu">
        <AtDrawer onClose={this.closeDrawer.bind(this)} onItemClick={this.clickCata.bind(this)} show={showDrawer} items={items} style="position: absolute"></AtDrawer>
        <Image onClick={this.showDrawer.bind(this)} className="image" src={require('../../assets/img/cata.png')}/>
        <Text>{this.props.currentCata.value}</Text>
        <Image onClick={this.toUser.bind(this)} className="image" src={require('../../assets/img/login.png')}/>
      </View>
    )
  }
}

export default Menu;
