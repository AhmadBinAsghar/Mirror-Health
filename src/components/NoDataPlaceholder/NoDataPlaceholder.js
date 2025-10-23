import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';
// import { AppImages } from '../../../assets/images/AppImages';

const NoDataPlaceholder = ({ isImageVisible = true }) => {
    return (
        <View style={styles.container}>
            {/* {isImageVisible && <Image style={styles.logo} source={AppImages.noRecord} />} */}
            <Text style={styles.titleStyle}>{'noRecordFound'}</Text>
        </View>
    );
}

export default NoDataPlaceholder