import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'
import { replaceOrderList, setOrderDenyReason } from '~/store/actions/order'
import { GENERAL_ERROR_MESSAGE } from '~/store/constants/app'
import { getToastMessage } from '~/ui/shared/utils'
const requestGetOrderList = createRequestSaga({
    request: api.order.getOrderList,
    key: 'getOrderList',    
    success: [
        (data) => {
            if (data && data.updated){
                return replaceOrderList(data)
            }
            return setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
        },               
    ],
})
const requestGetOrderDetail = createRequestSaga({
    request: api.order.getOrderDetail,
    key: 'getOrderDetail',    
})

const requestGetOrderDenyReason = createRequestSaga({
    request: api.order.getDenyOrderReason,
    key: 'getDenyOrderReason',    
    success: [
        (data)=>{
            console.log('Deny Order Reason', data)
            if (data && data.updated && data.updated.data){
                return setOrderDenyReason(data.updated.data)
            }
            return setToast(getToastMessage(GENERAL_ERROR_MESSAGE), 'info', null, null, 3000, 'top')
        }
    ],
})

const requestUpdateOrderStatus = createRequestSaga({
    request: api.order.updateOrderStatus,
    key: 'updateOrderStatus',    
})
export default [
    function* fetchWatcher() {
        yield [            
            takeLatest('app/getOrderList', requestGetOrderList),
            takeLatest('app/getOrderDetail', requestGetOrderDetail),
            takeLatest('app/getOrderDenyReason', requestGetOrderDenyReason),
            takeLatest('app/updateOrderStatus', requestUpdateOrderStatus)            
        ]
    },
    
]


