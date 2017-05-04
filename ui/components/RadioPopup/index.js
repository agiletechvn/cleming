import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, Radio } from 'native-base'
import { View, TouchableWithoutFeedback, Animated, Easing, Modal } from 'react-native'

import styles from './styles'


export default class RadioPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popupHeader: props.popupHeader,
            listValue: props.listValue,
            // listValue: [{value: , display: }]
            selectedValue: props.selectedValue || props.listValue[0].value,
            modalVisible: false
        }
        this.cachedSelectValue= props.selectedValue || props.listValue[0].value
    }
    getSelectedValue(){
        return this.state.selectedValue
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    _handlePressRadio(item) {
        this.setState({ selectedValue: item.value })
    }
    render() {
        const selectedValue = this.state.selectedValue || this.state.listValue[0].value
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { alert("Modal has been closed.") }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                    <View>
                        {this.state.popupHeader && <Text>{this.state.popupHeader}</Text>}
                        {this.state.listValue.map((item) => {
                            return (
                                <ListItem key={item.value} style={{ borderBottomWidth: 0 }} onPress={() => this._handlePressRadio(item)}>
                                    <Radio selected={selectedValue == item.value} style={{ marginRight: 10 }} />
                                    <Text>{item.display}</Text>
                                </ListItem>
                            )
                        })}
                        <View style={styles.confirmBlock}>
                            <Button light transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }} style={styles.confirmButton}>
                                <Text style={{color: 'grey'}}>Cancel</Text>
                            </Button>
                            <Button primary transparent onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                this.props.onClickYes(this.state.selectedValue)
                            }} style={styles.confirmButton}>
                                <Text style={{color: 'blue'}}>OK</Text>
                            </Button>
                        </View>
                    </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
