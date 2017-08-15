import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, List, ListItem, Spinner, Text } from "native-base";
import { InteractionManager, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import DateFilter from "~/ui/components/DateFilter";
import * as commonAction from "~/store/actions/common";
import * as walletAction from "~/store/actions/wallet";
import TabsWithNoti from "~/ui/components/TabsWithNoti";
import Icon from "~/ui/elements/Icon";
import Border from "~/ui/elements/Border";
import moment from "moment";
import { formatNumber } from "~/ui/shared/utils";
import Content from "~/ui/components/Content";
import { getSession } from "~/store/selectors/auth";

import material from "~/theme/variables/material.js";
import I18n from '~/ui/I18n'
import ListViewExtend from '~/ui/components/ListViewExtend'
@connect(state => ({
    xsession: getSession(state),
}), { ...commonAction })
export default class CashoutHistory extends Component {
    constructor(props) {
        super(props)
        this.data=[
            {
                time: '06/07/2017',
                money: 1900000,
                status: 'received'
            },
            {
                time: '06/07/2017',
                money: 1950000,
                status: 'received'
            },
            {
                time: '08/07/2017',
                money: 2770000,
                status: 'received'
            },
        ]

        this.data1=[
            {
                time: '06/07/2017',
                money: 1900000,
                status: 'waiting'
            },
        ]
    }

    componentDidMount = () => {

    }
    _renderRow = (item) => {
        switch(item.status){
            case 'waiting':
                return (
                    <View style={styles.listItem}>
                        <Text medium gray>{item.time}</Text>
                        <View style={styles.row}>
                            <Text warning>{formatNumber(item.money)}đ</Text>
                            <Icon name='foward' style={styles.forwardIconWarning}/>
                        </View>
                    </View>
                )
            case 'received': 
                return (
                    <View style={styles.listItem}>
                        <Text medium gray>{item.time}</Text>
                        <View style={styles.row}>
                            <Text success>{formatNumber(item.money)}đ</Text>
                            <Icon name='foward' style={styles.forwardIconSuccess}/>
                        </View>
                    </View>
                )
        }
    }

    render() {
        const { forwardTo } = this.props
        return (
            <Container style={styles.container}>
                <View style={{...styles.rowCenter, ...styles.borderBottom}}>
                    <Text large bold success>{formatNumber(26034000)}đ</Text>
                </View>
                <View style={styles.rowLeft}>
                    <Text medium bold warning>{I18n.t('money_waiting_process')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <ListViewExtend
                    dataArray={this.data1}
                    renderRow={(item) => this._renderRow(item)}
                />
                <View style={{...styles.rowLeft, ...styles.borderTop}}>
                    <Text medium bold success>{I18n.t('money_received')}</Text>
                </View>
                <Border color='rgba(0,0,0,0.5)' size={1} />
                <ListViewExtend
                    dataArray={this.data}
                    renderRow={(item) => this._renderRow(item)}
                />



            </Container>
        )
    }
}