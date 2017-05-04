import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Text, Icon, Thumbnail, Button, ScrollableTab } from 'native-base'
import { View, ListView, TouchableOpacity, Animated, Easing, Tabs, Tab } from 'react-native'
import styles from './styles'
import Content from '~/ui/components/Content'
import RadioPopup from '~/ui/components/RadioPopup'
import moment from 'moment'
export default class DateFilter extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            currentDateFilter: 'day',
            currentSelectValue: {
                from: '',
                to: '',
                display: ''
            }
        };
        this.dateFilterListValue = [
            {
                value: 'day',
                display: '1 day'
            },
            {
                value: 'week',
                display: '7 days'
            },
            {
                value: 'month',
                display: '1 month'
            },
            {
                value: 'year',
                display: '1 year'
            }
        ]
        this.dateFilterHeight = 0
        this.contentWidth = 0
    }
    getData() {
        return this.state
    }
    _handlePressTriggerDateFilterPopup() {
        // console.log('Press date filter')
        this.refs.dateFilterTypePopup.setModalVisible(true)
    }
    _handlePressDateFilter(item) {
        console.log('Item', item)
        this.setState({ currentSelectValue: item })
        this.props.onPressFilter({
            currentDateFilter: this.state.currentDateFilter,
            currentSelectValue: item
        })
    }
    _handleYesDateFilter(item) {
        // console.log('Date Filter item', item)
        this.setState({ currentDateFilter: item })
        this.setState({
            currentSelectValue: {
                from: '',
                to: '',
                display: ''
            }
        })
    }
    componentDidMount() {
        // this.refs.dateFilterList.scrollToEnd({ animated: false })
    }
    componentDidUpdate() {
        // this.refs.dateFilterList.scrollToEnd({ animated: false })
    }
    _getDataForFilter(filterType) {
        if (filterType == 'day') {
            // lastest 7 days
            return [6, 5, 4, 3, 2, 1, 0].map((item) => {
                let now = moment().subtract(item, 'days')
                return {
                    value: now.format('DD/MM/YYYY'),
                    display: now.format('DD/MM/YYYY')
                }
            })
        } else if (filterType == 'week') {
            return [6, 5, 4, 3, 2, 1, 0].map((item) => {
                let currentWeek = moment().subtract(item, 'weeks')
                let startWeek = moment().subtract(item, 'weeks').startOf('isoWeek')
                let endWeek = moment().subtract(item, 'weeks').endOf('isoWeek')
                return {
                    value: {
                        from: startWeek.format('DD/MM/YYYY'),
                        to: endWeek.format('DD/MM/YYYY')
                    },
                    display: startWeek.format('DD/MM/YYYY') + ' to ' + endWeek.format('DD/MM/YYYY')
                }
            })
        } else if (filterType == 'month') {
            return [6, 5, 4, 3, 2, 1, 0].map((item) => {
                let currentMonth = moment().subtract(item, 'months')
                let startMonth = moment().subtract(item, 'months').startOf('month')
                let endMonth = moment().subtract(item, 'months').endOf('month')
                return {
                    value: {
                        from: startMonth.format('DD/MM/YYYY'),
                        to: endMonth.format('DD/MM/YYYY')
                    },
                    display: currentMonth.format('MM/YYYY')
                }
            })
        } else if (filterType == 'year') {
            return [6, 5, 4, 3, 2, 1, 0].map((item) => {
                let currentYear = moment().subtract(item, 'years')
                let startYear = moment().subtract(item, 'years').startOf('year')
                let endYear = moment().subtract(item, 'years').endOf('year')
                return {
                    value: {
                        from: startYear.format('DD/MM/YYYY'),
                        to: endYear.format('DD/MM/YYYY')
                    },
                    display: currentYear.format('YYYY')
                }
            })
        }
    }
    _getDefaultCurrnetSelectValue(filterType) {
        if (filterType == 'day') {
            let now = moment()
            return {
                value: now.format('DD/MM/YYYY'),
                display: now.format('DD/MM/YYYY')
            }
        } else if (filterType == 'week') {
            let currentWeek = moment()
            let startWeek = moment().startOf('isoWeek')
            let endWeek = moment().endOf('isoWeek')
            return {
                value: {
                    from: startWeek.format('DD/MM/YYYY'),
                    to: endWeek.format('DD/MM/YYYY')
                },
                display: startWeek.format('DD/MM/YYYY') + ' to ' + endWeek.format('DD/MM/YYYY')
            }
        } else if (filterType == 'month') {
            let currentMonth = moment()
            let startMonth = moment().startOf('month')
            let endMonth = moment().endOf('month')
            return {
                value: {
                    from: startMonth.format('DD/MM/YYYY'),
                    to: endMonth.format('DD/MM/YYYY')
                },
                display: currentMonth.format('MM/YYYY')
            }
        } else if (filterType == 'year') {
            let currentYear = moment()
            let startYear = moment().startOf('year')
            let endYear = moment().endOf('year')
            return {
                value: {
                    from: startYear.format('DD/MM/YYYY'),
                    to: endYear.format('DD/MM/YYYY')
                },
                display: currentYear.format('YYYY')
            }
        }
    }
    render() {
        const currentDateFilterDisplay = this.dateFilterListValue.filter((item) => item.value == this.state.currentDateFilter)[0].display
        const _data = this._getDataForFilter(this.state.currentDateFilter)
        const data = this.ds.cloneWithRows(_data)
        var currentSelectValue = this.state.currentSelectValue.display ? this.state.currentSelectValue : this._getDefaultCurrnetSelectValue(this.state.currentDateFilter)

        return (
            <View style={styles.dateFilter}>
                <RadioPopup ref='dateFilterTypePopup' listValue={this.dateFilterListValue} selectedValue={this.state.currentDateFilter} onClickYes={this._handleYesDateFilter.bind(this)} />
                <TouchableOpacity onPress={() => this._handlePressTriggerDateFilterPopup()}>
                    <View style={styles.stickPart}>
                        <Icon name="event-note" style={styles.calendarIcon} />
                        <Text style={styles.filterIntevalLabel}>{currentDateFilterDisplay}</Text>
                    </View>
                </TouchableOpacity>
                <ListView style={styles.dateFilterList} horizontal={true} showsHorizontalScrollIndicator={false}
                    ref='dateFilterList' dataSource={data}
                    renderRow={
                        (rowData) => {
                            return (<TouchableOpacity onPress={() => this._handlePressDateFilter(rowData)}>
                                <Text style={(rowData.display).localeCompare(currentSelectValue.display) == 0 ? styles.dateFilterListItemActive : styles.dateFilterListItemDeactive}>{rowData.display}</Text>
                            </TouchableOpacity>
                            )
                        }
                    }
                />
            </View >
        )
    }
}