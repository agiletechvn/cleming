import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button } from 'native-base'
import { View, TouchableWithoutFeedback, BackAndroid, LayoutAnimation, Platform, Dimensions } from 'react-native'

import styles from './styles'
import Content from '~/ui/components/Content'
import material from '~/theme/variables/material'

const { height, width } = Dimensions.get('window')

export default class TopDropdownListValue extends Component {
    constructor(props) {
        super(props)
        let selectedOption
        if (props.selectedOption && Object.keys(props.selectedOption).length > 0) {
            selectedOption = props.selectedOption
        } else {
            if (props.dropdownValues && props.dropdownValues.length > 0) {
                selectedOption = props.dropdownValues[0]
            }
        }
        this.state = {
            openningDropdown: false,
            zIndex: 0,
            selectedOption: selectedOption,
            dropdownValues: props.dropdownValues || [],
        }
    }

    componentWillReceiveProps(nextProps) {
        // If selectedPlace from store change, all TopDropdown will change follow
        if (nextProps.selectedOption && this.state.selectedOption
            && Object.keys(nextProps.selectedOption).length > 0
            && Object.keys(this.state.selectedOption).length > 0
            && nextProps.selectedOption.id != this.state.selectedOption.id
        ) {
            this.setState({ selectedOption: nextProps.selectedOption })
        }
        // If state.selectedOption empty, set value
        if (nextProps.dropdownValues && nextProps.dropdownValues.length > 0) {
            if ((!this.state.selectedOption) || Object.keys(this.state.selectedOption).length == 0) {
                this.setState({ selectedOption: nextProps.dropdownValues[0] })
            }
        }

    }

    updateDropdownValues(dropdownValues) {
        this.setState({ dropdownValues: dropdownValues })
    }
    updateSelectedOption(selectedOption) {
        this.setState({ selectedOption: selectedOption })
    }
    getValue() {
        return this.state.selectedOption;
    }
    toggle() {
        // LayoutAnimation.easeInEaseOut()
        this.setState({ openningDropdown: !this.state.openningDropdown })
    }
    open() {
        this.setState({ openningDropdown: true })
    }
    close() {
        this.setState({ openningDropdown: false })
    }
    componentWillMount() {

    }
    _handlePress(item) {
        this.setState({ selectedOption: item })
        this.props.onSelect && this.props.onSelect(item)
        // this.toggle()
        this.setState({ openningDropdown: false })
    }
    _handlePressOverlay = () => {
        this.props.onPressOverlay && this.props.onPressOverlay()
        this.close()
    }
    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', () => {
            console.log('Back Press Top Dropdown')
        })
    }
    render() {
        const { notifications, getNotificationRequest, getNotification } = this.props
        let { openningDropdown, selectedOption, dropdownValues } = this.state
        let maxHeight = openningDropdown ? (material.deviceHeight-material.toolbarHeight-260) : 0
        // let maxHeight = 50
        if (!dropdownValues || dropdownValues.length == 0){
            return <View />
        }
        if (selectedOption && Object.keys(selectedOption).length > 0){
            dropdownValues = dropdownValues.filter(item => item.id != this.state.selectedOption.id)
        }
        let overlayStyle = openningDropdown ? styles.ovarlayContainerOpen:styles.ovarlayContainerClose
        return (
            <View style={overlayStyle}>
                <List
                    contentContainerStyle={{ backgroundColor: material.primaryColor }}
                    dataArray={dropdownValues}
                    style={{
                        ...styles.dropdownList,
                        maxHeight,
                    }}
                    renderRow={(item) => {
                        return (
                            <ListItem onPress={e => this._handlePress(item)} style={styles.dropdownListItem}>
                                <Text  numberOfLines={1} style={styles.dropdownListItemText}>{item.name}</Text>
                            </ListItem>
                        )
                    }
                    }>
                </List>
                <TouchableWithoutFeedback onPress={()=>this._handlePressOverlay()}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            </View>

        )
    }
}