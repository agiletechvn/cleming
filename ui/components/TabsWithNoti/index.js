import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, ScrollableTab } from 'native-base'
import { View, ListView, TouchableOpacity, Animated, Easing, Tabs, Tab } from 'react-native'
import styles from './styles'
import Content from '~/ui/components/Content'
import RadioPopup from '~/ui/components/RadioPopup'
import moment from 'moment'
export default class TabsWithNoti extends Component {
    constructor(props) {
        super(props)
        console.log('Props', props)
        this.state = {
            activeTab: props.activeTab || 1
        }
    }
    _handlePressTab(item) {
        console.log('Tab Item', item)
        if (this.state.activeTab != item.tabID) {
            this.setState({ activeTab: item.tabID })
            this.props.onPressTab(item)
        }
    }
    render() {
        return (
            <View style={styles.tabBar}>
                {this.props.tabData.map((tabItem) => {
                    let isActive = (tabItem.tabID == this.state.activeTab)
                    return (

                        <View style={isActive ? styles.tabActive : styles.tabDeactive} key={tabItem.tabID}>
                            <TouchableOpacity onPress={() => this._handlePressTab(tabItem)}>
                                <View style={styles.tab}>
                                    <Text style={isActive ? styles.tabTextActive : styles.tabTextDeactive}>{tabItem.text}</Text>
                                    {tabItem.number && <View style={isActive?styles.tabNumberContainerActive:styles.tabNumberContainerDeactive}>
                                        <Text style={isActive ? styles.tabNumberActive : styles.tabNumberDeactive}>
                                            {tabItem.number}
                                        </Text>
                                    </View>}
                                </View>
                            </TouchableOpacity>
                        </View>

                    )
                })}
            </View>
        )
    }
}



{/*<View style={styles.tabBar}>
            <View style={styles.tabActive}>
                <Text style={styles.tabTextActive}>
                    Trả qua Clingme
                            </Text>
                <View style={styles.tabNumberContainer}>
                    <Text style={styles.tabNumberActive}>
                        4
                            </Text>
                </View>
            </View>
            <View style={styles.tab}>
                <Text style={styles.tabTextDeactive}>
                    Trả trực tiếp
                            </Text>
                <View style={styles.tabNumberContainer}>
                    <Text style={styles.tabNumberDeactive}>
                        50
                            </Text>
                </View>
            </View>
        </View>*/}