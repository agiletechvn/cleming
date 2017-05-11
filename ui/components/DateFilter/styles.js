import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
    dateFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    stickPart: {
        paddingRight: 15,
        borderRightColor: PRIMARY_COLOR,
        borderRightWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    calendarIcon: {
        color: PRIMARY_COLOR,
        fontSize: 20,
        marginRight: 9,
        marginLeft: 10,
    },
    filterIntevalLabel: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    },
    intevalValue: {

    },
    dateFilterList: {
        // padding: 50,
        marginRight: 10,
        flexDirection: 'row'
    },
    dateFilterListItemDeactive: {
        borderBottomColor: 'transparent',
        marginRight: 25,
        color: 'rgba(0,0,0,0.5)',
        padding: 5
    },
    dateFilterListItemActive: {
        borderBottomColor: 'transparent',
        marginRight: 25,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        padding: 5
    }


}