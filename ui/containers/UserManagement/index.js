/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import Modal from '~/ui/components/Modal'
import styles from './styles'
import UserCard from './components/UserCard'
import OwnerCard from './components/OwnerCard'

import * as commonActions from '~/store/actions/common'

const img = 'https://facebook.github.io/react/img/logo_og.png'
const data = []

for (let i = 0; i < 5; i++) {
    data.push({
        owner: {
            userName: 'User Name',
            img: img
        },
        employeeList: [
            { email: 'Email', phone: 'Phone Number', jobTitle: 'Manager', address: 'Hoang Quoc Viet', img: img},
            { email: 'Email', phone: 'Phone Number', jobTitle: 'Cashier', address: 'Hoang Quoc Viet', img: img},
            { email: 'Email', phone: 'Phone Number', jobTitle: 'Accountant', address: 'Hoang Quoc Viet', img: img}
        ]
    })
}

data.push({
    owner: {
        userName: 'User Name',
        img: img
    },
    employeeList: []
})

@connect(state=>({
    
}), {...commonActions})

class UserManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            updateInfoChecked: false,
            deleteAccountChecked: false
        }
    }
    
    componentDidMount() {
        
    }
    
    onAccountPress(data) {
        this.setState({
            data: data
        }, () => {
            this.setState({
                modalOpen: true
            })
        })
    }
    
    renderEmployeeRow(data, sectionID, rowID, highlightRow) {
        return (
            <ListItem style={styles.listEmployeeItem}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                            <Row style={styles.topLeftGrid}/>
                            <Row style={styles.bottomLeftGrid}/>
                        </Col>
                        <Col>
                            <Row style={[styles.topRightGrid, {borderBottomWidth: 1}]}/>
                            <Row style={[styles.bottomRightGrid, {borderTopWidth: 1}]}/>
                        </Col>
                    </Col>
                    <Col style={{width: '80%', justifyContent: 'center'}}>
                        <Button
                            onPress={this.onAccountPress.bind(this, data)}
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
    
    renderRow(data) {
        blueLineBelowOwner = null
        console.log()
        if (data.employeeList.length != 0) {
            blueLineBelowOwner = this.renderBlueLineBelowOwner()
        }
        return (
            <ListItem style={styles.listItem}>
                <Grid>
                    <Col>
                        <Button style={styles.ownerButton}>
                            <OwnerCard data={data.owner}/>
                        </Button>
                        {blueLineBelowOwner}
                        <List
                            dataArray={data.employeeList}
                            renderRow={this.renderEmployeeRow.bind(this)}/>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
    
    onUpdateInfoPress() {
        this.setState({
            updateInfoChecked: !this.state.updateInfoChecked
        })
    }
    
    onDeleteAccountPress() {
        this.setState({
            deleteAccountChecked: !this.state.deleteAccountChecked
        })
    }
    
    renderModal() {
        return(
            <View style={styles.modalContainer}>
                <Grid>
                    <Col>
                        <Row style={{height: '30%', width: '90%', alignSelf: 'center'}}>
                            <UserCard data={this.state.data}/>
                        </Row>
                        <Row style={{height: '50%'}}>
                            <Col style={{width: '70%'}}>
                                <Row style={{alignItems: 'center'}}>
                                    <Text style={styles.rowText}>Thay đổi thông tin</Text>
                                </Row>
                                <Row style={{alignItems: 'center'}}>
                                    <Text style={styles.rowText}>Xoá tài khoản khỏi danh sách</Text>
                                </Row>
                            </Col>
                            <Col style={{width: '30%'}}>
                                <Row style={styles.rowCheckBox}>
                                    <CheckBox
                                        style={{borderWidth: 2}}
                                        onPress={this.onUpdateInfoPress.bind(this)}
                                        checked={this.state.updateInfoChecked}/>
                                </Row>
                                <Row style={styles.rowCheckBox}>
                                    <CheckBox
                                        style={{borderWidth: 2}}
                                        onPress={this.onDeleteAccountPress.bind(this)}
                                        checked={this.state.deleteAccountChecked}/>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{height: '20%'}}>
                            <Col style={{width: '50%'}}/>
                            <Col style={{width: '25%'}}>
                                <Button style={styles.modalButton}>
                                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                </Button>
                            </Col>
                            <Col style={{width: '25%'}}>
                                <Button style={styles.modalButton}>
                                    <Text style={styles.modalOkButtonText}>OK</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </View>
        )
    }
    
    onCreateUserPress() {
        const { forwardTo } = this.props
        forwardTo('userManagement/action/createUser')
    }
    
    render() {
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <List
                        style={{marginBottom: 50, marginTop: 20}}
                        dataArray={data}
                        renderRow={this.renderRow.bind(this)}/>
                </Content>
                <Modal onCloseClick={e=>this.setState({modalOpen:false})} open={this.state.modalOpen}>
                    {this.renderModal()}
                </Modal>
                <Button
                    onPress={this.onCreateUserPress.bind(this)}
                    style={styles.addUserButton}>
                    <Text style={styles.addUserText}>Add User</Text>
                </Button>
            </Container>
        )
    }
}

export default UserManagement