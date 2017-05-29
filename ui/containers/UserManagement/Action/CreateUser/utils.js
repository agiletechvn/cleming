/**
 * Created by vjtc0n on 5/5/17.
 */
import React, {Component} from 'react'
import {
    ListItem, Text, View, Grid, Col, CheckBox, List
} from 'native-base'
import shallowCompare from 'react-addons-shallow-compare'

import validate from 'validate.js'
import _ from 'underscore'

import {
    // InputField,
    CheckBoxField,
    // DateField,
} from '~/ui/elements/Form'

import styles from './styles'


const namePattern = /^[a-zA-Z]{2,}$/
const usernameConstraints = {
  username: {
    format: {
      pattern: namePattern,
      flags: 'g'
    }
  }
}

const phonePattern = /^\d{9,10}$/
const phoneConstraints = {
  phone: {
    format: {
      pattern: phonePattern,
      flags: 'i'
    }
  }
}

const emailConstraints = {
  email: {
    email: true
  }
}

// if long then seperate
export const validateField = (values) => {
  const errors = {}
  if(!values) return errors
  
  if (values.name.trim() == '') {
    errors.name = "Bạn phải nhập tên"
  }
  
  if (!_.isUndefined(validate({username: values.name}, usernameConstraints))) {
    errors.name = "Tên phải có ít nhất 2 ký tự, không bao gồm các ký tự đặc biệt và số"
  }
  
  if (values.phone.trim() == '') {
    errors.phone = "Bạn phải nhập số điện thoại"
  }
  
  if (!_.isUndefined(validate({phone: values.phone}, phoneConstraints))) {
    errors.phone = "Bạn nhập chưa đúng định dạng số điện thoại"
  }
  
  if (!_.isUndefined(validate({email: values.email}, emailConstraints))) {
    errors.email = "Bạn nhập chưa đúng định dạng email"
  }
  
  return errors
}

export class renderGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: props.fields.map((c, index)=>({
        placeId: props.fields.get(index).placeId,
        checked: false,
        address: props.fields.get(index).address
      })),
      checkAll: false
    }
  }
  
  componentWillMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.employeeListPlace.length != 0 && this.props.employeeListPlace.length != 0) {
      if (this.props.employeeListPlace != nextProps.employeeListPlace) {
        const newState = this.state.fields.slice(0)
        newState.map((c, index) => {
          newState[index].checked = false
          nextProps.employeeListPlace.map((place, placeIndex) => {
            if (place.placeId == c.placeId) {
              newState[index].checked = true
            }
          })
        })
        this.setState({
          fields: newState
        })
      }
    }
  }
  
  componentDidMount() {
    const newState = this.state.fields.slice(0)
    newState.map((c, index) => {
      this.props.employeeListPlace.map((place, placeIndex) => {
        if (place.placeId == c.placeId) {
          newState[index].checked = true
        }
      })
    })
    this.setState({
      fields: newState
    }, () => {
      this.props.handleGetListPlaceFromArrayField(this.getSelected())
    })
  }
  
  getSelected(){
    return this.state.fields.filter(c=>c.checked).map(c=>c.placeId)
  }
  
  handleCheck(index){
    const newState = this.state.fields.slice(0)
    newState[index].checked = !newState[index].checked
    this.setState({fields: newState}, () => {
      this.props.handleGetListPlaceFromArrayField(this.getSelected())
    })
  }
  
  handleCheckAll() {
    const newState = this.state.fields.slice(0)
    newState.map((c, index) => {
      c.checked = !this.state.checkAll
    })
    this.setState({
      fields: newState,
      checkAll: !this.state.checkAll
    }, () => {
      this.props.handleGetListPlaceFromArrayField(this.getSelected())
    })
  }
  
  render() {
    return (
      <View>
        <Grid>
            <Col style={{alignItems: 'center'}}>
                  <Text style={styles.leftAddressTitleText}>Danh sách địa điểm</Text>
              </Col>
              <Col style={{alignItems: 'center'}}>
                  <Text
                    style={styles.rightAddressTitleText}
                    onPress={this.handleCheckAll.bind(this)}>
                      Đánh dấu tất cả
                  </Text>
            </Col>
        </Grid>
        {this.state.fields.map((address, index) =>
          {
            return (
              <ListItem key={index} last={index===this.state.fields.length-1} style={styles.listItem}>
                  <Text small style={styles.left}>{address.address}</Text>
                  <View style={styles.right}>
                    <CheckBox
                      checked={address.checked}
                      onPress={e=>this.handleCheck(index)}
                    />
                    
                  </View>
              </ListItem>
            )
          }
        )}
      </View>
    )
  }
}