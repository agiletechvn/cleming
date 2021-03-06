/**
 * Created by vjtc0n on 5/4/17.
 */
import React, {Component} from 'react'
import {
    Button, List, ListItem, Switch, Spinner,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row,
    Text
} from 'native-base'
import CheckBox from '~/ui/elements/CheckBox'
import {TouchableHighlight, InteractionManager} from 'react-native'
import {connect} from 'react-redux'

import Modal from '~/ui/components/Modal'
import styles from './styles'
import UserCard from './components/UserCard'
import OwnerCard from './components/OwnerCard'

import * as commonActions from '~/store/actions/common'
import * as accountActions from '~/store/actions/account'
import * as authSelectors from '~/store/selectors/auth'
import * as placeAction from '~/store/actions/place'
import * as accountSelectors from '~/store/selectors/account'
import {getSelectedPlace} from '~/store/selectors/place'
import TopDropdown from '~/ui/components/TopDropdown'
import material from '~/theme/variables/material.js'
import I18n from '~/ui/I18n'
const img = 'https://facebook.github.io/react/img/logo_og.png'

@connect(state => ({
    session: authSelectors.getSession(state),
    listEmployee: accountSelectors.getListEmployee(state),
    user: authSelectors.getUser(state),
    place: state.place,
    selectedPlace: getSelectedPlace(state),
}), {...commonActions, ...accountActions, ...placeAction})

class UserManagement extends Component {
    constructor(props) {
        super(props)

        this.data = []
        this.rowIDOfEmployee = 0
        this.employeeData = []

        this.state = {
            modalOpen: false,
            updateInfoChecked: false,
            deleteAccountChecked: false,
            isFetchingData: false,
            showReload: false,
            // data: [],
            // rowIDOfEmployee: 0
        }
    }

    _loadListEmployee(placeId) {
        const {getListEmployee, session, user} = this.props
        getListEmployee(session, placeId, (err, data) => {

            if(err){
                this.setState({
                    showReload: true,
                })
            } else {
                let data = []
                for (let i = 0; i < 1; i++) {
                    data.push({
                        owner: user,
                        employeeList: this.props.listEmployee,
                    })
                }            
                this.data = data
                this.setState({
                    isFetchingData: false,
                    showReload: false,
                })
            }            
        })
    }

    componentDidMount() {
        this.componentWillFocus();
    }

    componentWillBlur() {
        this.setState({
            isFetchingData: true
        })
    }

    reloadPlace(){
        const {app} = this.props
        let currentPlace = app.topDropdown.getValue()
        if (currentPlace && Object.keys(currentPlace).length > 0) {
            this._loadListEmployee(currentPlace.id)
        }
    }

    componentWillFocus() {
        const {app} = this.props
        app.topDropdown.setCallbackPlaceChange(this._handleChangePlace)
        // InteractionManager.runAfterInteractions(()=> {
        this.reloadPlace()
        // })
    }

    onAccountPress(data, rowID) {
        this.employeeData = data
        this.rowIDOfEmployee = rowID
        this.setState({
            modalOpen: true
        })
    }

    renderEmployeeRow(data, sectionID, rowID, highlightRow) {
        let lastLeftVerticalBlueLineLength = null
        let lastRightVerticalBlueLineLength = null
        if (rowID == (this.props.listEmployee.length - 1)) {
            lastLeftVerticalBlueLineLength = 1
            lastRightVerticalBlueLineLength = 0
        } else {
            lastLeftVerticalBlueLineLength = '100%'
            lastRightVerticalBlueLineLength = '100%'
        }
        return (
            <ListItem style={styles.listEmployeeItem}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                            <Row style={styles.topLeftGrid}/>
                            <Row style={{...styles.bottomLeftGridContainer}}>
                                <View style={{...styles.bottomLeftGrid, height: lastLeftVerticalBlueLineLength}}/>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{...styles.topRightGrid, borderBottomWidth: 1}}/>
                            <Row style={styles.bottomRightGridContainer}>
                                <View style={{height: lastRightVerticalBlueLineLength, ...styles.bottomRightGrid}}/>
                            </Row>
                        </Col>
                    </Col>
                    <Col style={{width: '80%', justifyContent: 'center'}}>
                        <Button
                            onPress={this.onAccountPress.bind(this, data, rowID)}
                            style={styles.accountButton}>
                            <UserCard data={data}/>
                        </Button>
                    </Col>
                </Grid>
            </ListItem>
        )
    }

    renderBlueLineBelowOwner() {
        return (
            <View style={{height: 20}}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                            <Row style={styles.topLeftGrid}/>
                            <Row style={styles.bottomLeftGrid}/>
                        </Col>
                        <Col>
                            <Row style={styles.topRightGrid}/>
                            <Row style={styles.bottomRightGrid}/>
                        </Col>
                    </Col>
                    <Col style={{width: '80%'}}/>
                </Grid>
            </View>
        )
    }

    onUpdateUserPress() {
        const {forwardTo} = this.props
        // this.props.setEmployee(null)
        forwardTo('userManagement/action/updateUser')
    }

    renderRow(data) {
        blueLineBelowOwner = null
        console.log()
        if (this.props.listEmployee.length != 0) {
            blueLineBelowOwner = this.renderBlueLineBelowOwner()
        }
        return (
            <ListItem style={styles.listItem}>
                <Grid>
                    <Col>
                        <Button
                            onPress={this.onUpdateUserPress.bind(this)}
                            style={styles.ownerButton}>
                            <OwnerCard data={data.owner}/>
                        </Button>
                        {blueLineBelowOwner}
                        <List
                            removeClippedSubviews={false}
                            dataArray={data.employeeList}
                            renderRow={this.renderEmployeeRow.bind(this)}/>
                    </Col>
                </Grid>
            </ListItem>
        )
    }

    onUpdateInfoPress() {
        this.setState({
            updateInfoChecked: !this.state.updateInfoChecked,
            deleteAccountChecked: false
        })
    }

    onDeleteAccountPress() {
        this.setState({
            deleteAccountChecked: !this.state.deleteAccountChecked,
            updateInfoChecked: false
        })
    }

    onCancelModal() {
        this.setState({
            modalOpen: false
        })
    }

    onSubmitModal() {
        const {forwardTo, selectedPlace, app} = this.props
        if (this.state.updateInfoChecked) {
            this.setState({
                modalOpen: false,
                updateInfoChecked: !this.state.updateInfoChecked
            })

            // update current user
            this.props.setEmployee(this.props.listEmployee[this.rowIDOfEmployee])

            forwardTo(`userManagement/action/updateEmployeeInfo/${this.rowIDOfEmployee}`)
        } else if (this.state.deleteAccountChecked) {
            let currentPlace = app.topDropdown.getValue()
            this.props.deleteEmployeeInfo(this.props.session, this.props.listEmployee[this.rowIDOfEmployee].bizAccountId, () => {
                this._loadListEmployee(selectedPlace.id)
            })
            this.setState({
                modalOpen: false,
                isFetchingData: true,
                deleteAccountChecked: !this.state.deleteAccountChecked
            })
        }
    }

    renderModal() {
        return (
            <View style={styles.modalContainer}>
                <ListItem noBorder style={{height: 65}}>
                    <UserCard data={this.employeeData}/>
                </ListItem>
                <ListItem noBorder onPress={this.onUpdateInfoPress.bind(this)}
                          style={{justifyContent: 'space-between',zIndex:99}}>

                    <Text medium style={styles.rowText}>{I18n.t('page_change_info')}</Text>
                    <CheckBox
                        disabled={true}
                        checked={this.state.updateInfoChecked}
                        type="radio"
                    />
                </ListItem>
                <ListItem noBorder onPress={this.onDeleteAccountPress.bind(this)}
                          style={{justifyContent: 'space-between'}}>
                    <Text medium style={styles.rowText}>{I18n.t('remove_account_from_list')}</Text>
                    <CheckBox
                        checked={this.state.deleteAccountChecked}
                        type="radio"
                    />
                </ListItem>
                <ListItem noBorder style={{justifyContent:'center'}}>
                        <Button
                            onPress={this.onCancelModal.bind(this)}
                            style={styles.modalButton}>
                            <Text style={styles.modalCancelButtonText}>Cancel</Text>
                        </Button>
                        <Button
                            onPress={this.onSubmitModal.bind(this)}
                            style={styles.modalButton}>
                            <Text style={styles.modalOkButtonText}>OK</Text>
                        </Button>
                </ListItem>
            </View>
        )
    }

    onCreateUserPress() {
        const {forwardTo} = this.props
        this.props.setEmployee(null)
        forwardTo('userManagement/action/createUser')
    }

    renderAddEmployeeButton() {
        if (typeof  this.data != 'undefined') {
            let data0 = this.data[0];
            // console.warn('data[0] ' + JSON.stringify(data0, null, 2));
            if (typeof data0 != 'undefined') {
                owner = data0.owner;
                if (typeof owner != 'undefined') {
                    // console.warn('owner ' + JSON.stringify(owner, null, 2));
                    if (owner.accTitle == 1) {
                        return (
                            <Button
                                onPress={this.onCreateUserPress.bind(this)}
                                style={styles.addUserButton}>
                                <Text medium style={styles.addUserText}>{I18n.t('add_account')}</Text>
                            </Button>)
                    }
                }
                // console.warn('owner undefined');
            }
        }
    }

    _handleChangePlace = (item) => {
        this._loadListEmployee(item.id)
    }

    render() {
        const {place, selectedPlace, app} = this.props        

        if (this.state.isFetchingData) {
            return (
                <View style={{
                    backgroundColor: material.white500,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner color={material.primaryColor}/>
                </View>
            )
        }
        return (
            <Container>
                {this.state.showReload && 
                    <Button full danger onPress={()=>this.reloadPlace()}>
                        <Text>{I18n.t('err_loading')}</Text>
                    </Button>            
                }
                <Content style={{backgroundColor: material.white500}}>
                    <List
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                        style={{marginBottom: 50, marginTop: 20}}
                        dataArray={this.data}
                        renderRow={this.renderRow.bind(this)}/>
                </Content>
                <Modal onCloseClick={e => this.setState({modalOpen: false})} open={this.state.modalOpen}>
                    {this.renderModal()}
                </Modal>
                {this.renderAddEmployeeButton()}
            </Container>
        )
    }
}

export default UserManagement