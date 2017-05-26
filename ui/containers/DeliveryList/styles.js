import {PRIMARY_COLOR, WARNING_COLOR, ERROR_COLOR, SUCCESS_COLOR} from '~/ui/shared/constants'
export default{
    container: {
        paddingTop: 50, 
    },
    contentContainer: {
      padding: 0,
      margin: 10,
    },
    contentContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    deliveryBlock: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 2,
        
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        
        marginBottom: 10,
        // padding: 10,
        marginLeft: 0,
        marginRight: 0,
        alignSelf: 'center',
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    block: {
        flexDirection: 'column',
        // borderStyle: 'dotted',
        // borderBottomWidth: 0.5,
        // borderBottomColor: 'rgba(0,0,0,0.5)',
        marginTop: 5,
        marginBottom: 5
    },
    deliveryCodeBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deliveryCodeWaitingConfirm: {
        color: WARNING_COLOR
    },
    deliveryCodeWaitingDelivery: {
        color: PRIMARY_COLOR
    },
    deliveryCodeSuccess: {
        color: SUCCESS_COLOR
    },
    icon: {
        fontSize: 20,
        marginRight: 5
    },
    avatar: {
        width: 40,
        height: 40
    },
    phoneNumber: {
        color: PRIMARY_COLOR
    },
    phoneIcon: {
        color: PRIMARY_COLOR
    },
    reject: {
        color: 'rgba(0,0,0,0.5)'
    },
    confirm: {
        color: PRIMARY_COLOR
    },
    time: {
        marginRight: 5
    }
}