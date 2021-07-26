import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { globalStyles } from '../../../shared/globalStyles';
import { globalConstants } from '../../../constants';
import { primaryLogo } from '../../../shared/generalAssets';

export const AppUpdateModal = ( { dialog, setDialog } ) => {
    const _openStore = () => {
        WebBrowser.openBrowserAsync( dialog.link );
    }
    return (
        <View style={[ styles.container ]}>

            <Modal
                visible={dialog.showDialog}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => { setDialog( { ...dialog, showDialog: false } ) }}>
                <Card disabled={true} style={[ styles.modalCard ]}>
                    <View style={globalStyles.centerCenter}>
                        <Image source={primaryLogo} style={styles.logo} />
                    </View>
                    <Text style={[ globalStyles.textCenter, globalStyles.textPrimary, globalStyles.mb20, globalStyles.textBold ]}>App Update</Text>
                    <Text style={[ globalStyles.textCenter ]}>A new version of Daily MSG is now available. Download now to enjoy our latest features. 😻</Text>
                    <View style={[ globalStyles.mt40 ]}>
                        <Button onPress={_openStore} style={[ globalStyles.bgPribgsemary ]}>
                            Download Now
                        </Button>
                        <Button onPress={() => { setDialog( { ...dialog, showDialog: false } ) }} appearance="ghost">
                            <Text style={globalStyles.textDanger}>Maybe Later</Text>
                        </Button>
                    </View>
                </Card>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCard: {
        width: ( 90 / 100 ) * globalConstants.SCREEN_WIDTH,
        minHeight: ( 50 / 100 ) * globalConstants.SCREEN_HEIGHT,
        justifyContent: 'center'
    }, logo: {
        height: 50,
        width: 50,
        marginBottom: 10
    },
} );