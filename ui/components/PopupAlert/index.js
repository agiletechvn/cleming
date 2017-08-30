import React, { Component } from 'react'
import { Text, Button} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import I18n from '~/ui/I18n'
import { connect } from 'react-redux'
export default class PopupInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            text: props.text || ''
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    show(text){
        this.setState({modalVisible: true, text: text})
    }
    _close = () => {
        this.setState({ modalVisible: false })
    }
    render() {
        const  {text} = this.state
        return (
            <Modal 
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this._close()}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.textContanter}>
                            <Text medium bold grayDark>{text}</Text>
                        </View>
                        <View>
                        <View style={styles.confirmContainer}>

                            <Button transparent style={styles.btnRight}
                                onPress={()=>{
                                    this._close()
                                    this.props.onOk()   
                                }}
                                >
                                <Text primary>{I18n.t('ok')}</Text>
                            </Button>
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}