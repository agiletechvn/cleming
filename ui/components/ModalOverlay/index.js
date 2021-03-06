import React, { Component, PropTypes } from 'react'
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  View,
} from 'react-native'

// import { View } from 'native-base'

// should have a name to search
export default class ModalOverlay extends Component {

  static propTypes = {
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    onToggle: () => null,
  }

  constructor(props) {
    super(props)
    this._listeners = null
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
  }

  componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow'
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide'
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace)
    ]
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove())
  }

  configureAnimation(event, callback) {
    const animationConfig = LayoutAnimation.create(
      event.duration,
      LayoutAnimation.Types[event.easing],
      LayoutAnimation.Properties.opacity,
    )
    LayoutAnimation.configureNext(animationConfig, callback)
  }

  updateKeyboardSpace(event) {

    if (!event.endCoordinates) {
      return
    }

    if (this.modalOverlay && Platform.OS === 'ios') {
      const maxHeight = event.endCoordinates.screenY
      this.configureAnimation(event, () => this.props.onToggle(true, maxHeight))
      this.modalOverlay.setNativeProps({
        style: {
          ...this.props.style,
          height: maxHeight,
          // paddingTop: 50,
        }
      })      
    }


  }

  resetKeyboardSpace(event) {

    if (this.modalOverlay && Platform.OS === 'ios') {
      const maxHeight = event.endCoordinates.screenY
      this.configureAnimation(event, () => this.props.onToggle(false, maxHeight))
      this.modalOverlay.setNativeProps({
        style: this.props.style,
      })      
    }


  }

  render() {
    return (
      <View ref={ref => this.modalOverlay = ref} {...this.props} />
    )
  }
}