import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Modal, Image, ScrollView} from 'react-native'
import {Text, Button, Container} from 'native-base'
import Icon from '~/ui/elements/Icon'
import {connect} from 'react-redux'
import {forwardTo} from '~/store/actions/common'
import material from '~/theme/variables/material'
import I18n from '~/ui/I18n'
import { formatNumber } from "~/ui/shared/utils"
import Border from "~/ui/elements/Border"
import { Field, formValueSelector, reduxForm, reset } from "redux-form"
import { DateField, InputFieldWithErr, MultiLineInputFieldWithErr } from "~/ui/elements/Form"
import ImagePicker from 'react-native-image-picker'
import ImagePickerMultiple from 'react-native-image-crop-picker'
import styles from './styles'
const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
}
const initState = {
  modalVisible: false,
  images: [],
  avatar: ''
}
export default class DealImageSelector extends Component {
    constructor(props) {
      super(props)

      this.state = initState
    }

    getCover = () => {
      return this.state.avatar
    }

    reset = () => {
        console.log('Call Reset')
        this.setState(initState)
    }

    getImageList = () => {
      if (this.state.images.length == 0) return []
      let cloneImages = [...this.state.images]
      let index = cloneImages.findIndex(image=>image.path==this.state.avatar)
      if (index >-1) cloneImages.splice(index, 1)
      return cloneImages
    }

    _handleMultiplePicker = () => {
      this._close(()=>{
        ImagePickerMultiple.openPicker({
          width: 300,
          height: 400,
          multiple: true,
          mediaType: 'photo',
          showsSelectedCount: true,
          minFiles: 1
        }).then(images => {
          let cloneImages = [...this.state.images]
          let flag = 0
          for (let i=0; i<images.length; i++){
            let image = images[i]
            if (cloneImages.findIndex(item=>item.path == image.path) == -1){
              flag ++
              cloneImages.push(image)
            }
          }
          if (flag >0) {
            if (!this.state.avatar || this.state.avatar == ''){
              this.setState({images: cloneImages, avatar: images[0].path})
              setTimeout(()=>{
                console.log('scrollToEnd');
                this.scrollView.scrollToEnd()
              }, 100)
            }else{
              this.setState({images: cloneImages})
              setTimeout(()=>{
                console.log('scrollToEnd');
                this.scrollView.scrollToEnd()
              }, 100)
            }
          }
        }).catch(e => console.log('Err select Image: ', e));
      })
    }

    _openCamera = () => {
      this._close(()=>{
        ImagePickerMultiple.openCamera({
          width: 300,
          height: 400,
        }).then(image => {
          if (this.state.images.findIndex(item=>item.path == image.path) == -1){
            if (!this.state.avatar || this.state.avatar == ''){
              this.setState({images: [...this.state.images, image], avatar: image.path})
            }else{
              this.setState({images: [...this.state.images, image]})
            }
          }
        }).catch(e=>console.log('Err Open Cam', e))
      })
    }

    componentDidMount(){

    }

    _open = () => {
      console.log('Call _open')
      this.setState({modalVisible: true})
    }

    _isFunction = (obj) => !!(obj && obj.constructor && obj.call && obj.apply)
    _close = (callback) => {
      console.log('Call _close', callback)
      this.setState({modalVisible: false},
        ()=>{
          setTimeout(()=>callback && this._isFunction(callback) && callback(), 50)
        }
      )
    }

    _clear = (item) => {
      let cloneImages = [...this.state.images]
      let index = cloneImages.findIndex(image=>image.path==item.path)
      if (index >-1){
        cloneImages.splice(index, 1)
        if (item.path != this.state.avatar){
          this.setState({images: [...cloneImages]})
        }else{
          if (cloneImages && cloneImages.length >0){
            this.setState({images: [...cloneImages], avatar: cloneImages[0].path})
          }else{
            this.setState({images: [...cloneImages], avatar: ''})
          }

        }

      }
    }

    _setAvatar = (item) => {
      if (item.path){
        this.setState({avatar: item.path})
      }else{
        this.setState({avatar: item})
      }
    }

    setImages = (images) => {
      this.setState({images: images})
    }
    _renderImage = (item) => {
      let setAvatar
      if (item.path == this.state.avatar){
        setAvatar = <TouchableWithoutFeedback>
          <View style={styles.setAvatarContainerActive}>
            <Text white>Cover</Text>
            <Icon name='done' style={styles.iconDone} />
          </View>
        </TouchableWithoutFeedback>
      }else{
        setAvatar = <TouchableWithoutFeedback onPress={()=>this._setAvatar(item)}>
          <View style={styles.setAvatarContainer}>
            <Text white>Cover</Text>
          </View>
        </TouchableWithoutFeedback>
      }
      return (
        <View style={styles.imageItem} key={item.path}>
          <Image style={styles.image} source ={{uri: item.path}} key={item.path}/>
          <TouchableWithoutFeedback onPress={()=>this._clear(item)}>
            <View style={styles.closeContainer}>
              <Icon name='close_bt' style={styles.close} />
            </View>
          </TouchableWithoutFeedback>
          {setAvatar}
        </View>
      )
    }
    render() {
      const {forwardTo} = this.props
      return (
        <View>
          <Modal
              animationType={"none"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => this._close()}
          >
            <TouchableWithoutFeedback onPress={()=>this._close()}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text white bold medium>{I18n.t('info')}</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={this._openCamera}>
                    <View style={{...styles.modalRow}}>
                      <Text>{I18n.t('take_picture')}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{backgroundColor: '#ccc', width: '100%', height: 1}} />
                  <TouchableWithoutFeedback onPress={this._handleMultiplePicker}>
                    <View style={{...styles.modalRow}}>
                      <Text>{I18n.t('choose_from_galery')}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{backgroundColor: '#ccc', width: '100%', height: 1}} />
                  <TouchableWithoutFeedback onPress={this._close}>
                    <View style={{...styles.modalRow}}>
                      <Text>{I18n.t('close')}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View style={styles.imageContainer}>
            <ScrollView horizontal={true} ref={ref=>this.scrollView=ref}>
              {this.state.images.map(item => this._renderImage(item))}
              <View style={styles.imageSizeContainer}>
                <Button transparent onPress={this._open}>
                  <Icon name="add_photo" style={styles.addImageIcon}/>
                </Button>
              </View>
            </ScrollView>
          </View>

        </View>
      )
    }
}