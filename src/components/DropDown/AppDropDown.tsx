import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { AppColors } from '../../assets/colors/AppColors';
import { AppFonts } from '../../constants/AppFonts';

interface Drop {
    data: any;
    lable: string;
    onSelect: CallableFunction;
}
const AppDropDown = ({ data, lable, onSelect }: Drop) => {
    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);
    return (
        <View>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                containerStyle={{
                    borderWidth: 1,
                    borderColor: AppColors.borderColor,
                    borderRadius: 16,
                }}
                itemTextStyle={{ color: AppColors.placeholderColor }}
                data={data}
                // search
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={lable}
                searchPlaceholder="Search..."
                value={value}
                onChange={(item: any) => {
                    setValue(item.value);
                    onSelect && onSelect(item.label);
                }}
            />
        </View>
    )
}

export default AppDropDown

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: AppColors.borderColor,
        backgroundColor: AppColors.white,
        borderRadius: 16,
        paddingHorizontal: 10,
        marginVertical: '3%',
    },
    icon: {
        marginRight: 8,
    },
    placeholderStyle: {
        paddingLeft: 6,
        fontSize: 16,
        fontFamily: AppFonts.GeneralSans.regular,
        color: AppColors.placeholderColor,
    },
    selectedTextStyle: {
        paddingLeft: 6,
        fontSize: 16,
        fontFamily: AppFonts.GeneralSans.medium,
        color: AppColors.black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 45,
        fontSize: 16,
        borderRadius: 8,
        backgroundColor: AppColors.white,
    },
});