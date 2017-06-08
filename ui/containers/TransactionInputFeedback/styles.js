import material from '~/theme/variables/material'
export default {
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        padding: 10
    },
    input: { 
        width: '100%', 
        height: 50, 
        fontSize: 14,
        flex: 0,
        backgroundColor: material.gray200,
        borderRadius: 2
    },
    okBtn: {
        backgroundColor: material.primaryColor,
        width: material.deviceWidth,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center'
    },
    row: {
        marginBottom: 20
    }
}