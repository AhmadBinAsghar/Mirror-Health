import { ScrollView, Switch, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppHeader from '../../../../components/Header/AppHeader'
import en from '../../../../../translation/en.json';
import { useNavigation } from '@react-navigation/native'
import SmallText from '../../../../components/AppText/SmallText'
import { AppFonts } from '../../../../constants/AppFonts'
import { AppColors } from '../../../../assets/colors/AppColors'
import AppButton from '../../../../components/Button/AppButton'

const NotificationSettings = () => {
    const navigation: any = useNavigation();
    const [NotiEnabled, setIsNotiEnabled] = React.useState<boolean>(false);
    const [smsEnabled, setIsSmsEnabled] = React.useState<boolean>(true);
    const [isEnabled1, setIs1Enabled] = React.useState<boolean>(false);
    const [isEnabled2, setIs2Enabled] = React.useState<boolean>(true);
    const [isEnabled3, setIs3Enabled] = React.useState<boolean>(false);
    const [isEnabled4, setIs4Enabled] = React.useState<boolean>(true);
    return (
        <SafeAreaView style={[styles.wrapper, { paddingTop: 0 }]}>
            <AppHeader title={en.Headings.Notificationsettings} onCrossPress={() => { navigation.goBack() }} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
            <ScrollView>
                <View style={styles.title}>
                    <SmallText text={en.Notifications.Appnotifications} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                </View>
                <View style={styles.detail}>
                    <View style={styles.text}>
                        <SmallText text={en.Notifications.EventNoti} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text='Lorem ipsum dolor sit amet, consectetur' customStyle={{ fontSize: 10, color: AppColors.placeholderColor, marginTop: 5 }} />
                    </View>
                    <View style={[styles.switch, { backgroundColor: NotiEnabled ? AppColors.blue : AppColors.lighGrey }]}>
                        <Switch
                            trackColor={{ false: AppColors.transparent, true: AppColors.transparent }}
                            thumbColor={AppColors.white}
                            ios_backgroundColor={AppColors.blue}
                            onValueChange={() => setIsNotiEnabled(!NotiEnabled)}
                            value={NotiEnabled}
                        />
                    </View>
                </View>
                <View style={styles.seperater} />
                <View style={styles.detail}>
                    <View style={styles.text}>
                        <SmallText text={en.Notifications.SmsNoti} customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text='Lorem ipsum dolor sit amet, consectetur' customStyle={{ fontSize: 10, color: AppColors.placeholderColor, marginTop: 5 }} />
                    </View>
                    <View style={[styles.switch, { backgroundColor: smsEnabled ? AppColors.blue : AppColors.lighGrey }]}>
                        <Switch
                            trackColor={{ false: AppColors.transparent, true: AppColors.transparent }}
                            thumbColor={AppColors.white}
                            ios_backgroundColor={smsEnabled ? AppColors.blue : AppColors.lighGrey}
                            onValueChange={() => setIsSmsEnabled(!smsEnabled)}
                            value={smsEnabled}
                        />
                    </View>
                </View>
                <View style={styles.title}>
                    <SmallText text={en.Notifications.MembersAlerts} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                </View>
                <View style={styles.detail}>
                    <View style={styles.text}>
                        <SmallText text='Placeholder title' customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text='Lorem ipsum dolor sit amet, consectetur' customStyle={{ fontSize: 10, color: AppColors.placeholderColor, marginTop: 5 }} />
                    </View>
                    <View style={[styles.switch, { backgroundColor: isEnabled1 ? AppColors.blue : AppColors.lighGrey }]}>
                        <Switch
                            trackColor={{ false: AppColors.transparent, true: AppColors.transparent }}
                            thumbColor={AppColors.white}
                            ios_backgroundColor={AppColors.blue}
                            onValueChange={() => setIs1Enabled(!isEnabled1)}
                            value={isEnabled1}
                        />
                    </View>
                </View>
                <View style={styles.seperater} />
                <View style={styles.detail}>
                    <View style={styles.text}>
                        <SmallText text='Placeholder title' customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text='Lorem ipsum dolor sit amet, consectetur' customStyle={{ fontSize: 10, color: AppColors.placeholderColor, marginTop: 5 }} />
                    </View>
                    <View style={[styles.switch, { backgroundColor: isEnabled2 ? AppColors.blue : AppColors.lighGrey }]}>
                        <Switch
                            trackColor={{ false: AppColors.transparent, true: AppColors.transparent }}
                            thumbColor={AppColors.white}
                            ios_backgroundColor={AppColors.blue}
                            onValueChange={() => setIs2Enabled(!isEnabled2)}
                            value={isEnabled2}
                        />
                    </View>
                </View>
                <View style={styles.title}>
                    <SmallText text={en.Notifications.Media} customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }} />
                </View>
                <View style={styles.detail}>
                    <View style={styles.text}>
                        <SmallText text='Placeholder title' customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text='Lorem ipsum dolor sit amet, consectetur' customStyle={{ fontSize: 10, color: AppColors.placeholderColor, marginTop: 5 }} />
                    </View>
                    <View style={[styles.switch, { backgroundColor: isEnabled3 ? AppColors.blue : AppColors.lighGrey }]}>
                        <Switch
                            trackColor={{ false: AppColors.transparent, true: AppColors.transparent }}
                            thumbColor={AppColors.white}
                            ios_backgroundColor={AppColors.blue}
                            onValueChange={() => setIs3Enabled(!isEnabled3)}
                            value={isEnabled3}
                        />
                    </View>
                </View>
                <View style={styles.seperater} />
                <View style={styles.detail}>
                    <View style={styles.text}>
                        <SmallText text='Placeholder title' customStyle={{ fontFamily: AppFonts.GeneralSans.medium }} />
                        <SmallText text='Lorem ipsum dolor sit amet, consectetur' customStyle={{ fontSize: 10, color: AppColors.placeholderColor, marginTop: 5 }} />
                    </View>
                    <View style={[styles.switch, { backgroundColor: isEnabled4 ? AppColors.blue : AppColors.lighGrey }]}>
                        <Switch
                            trackColor={{ false: AppColors.transparent, true: AppColors.transparent }}
                            thumbColor={AppColors.white}
                            ios_backgroundColor={AppColors.blue}
                            onValueChange={() => setIs4Enabled(!isEnabled4)}
                            value={isEnabled4}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.saveBtn}>
                <AppButton txtStyle={{ color: AppColors.white }} onPress={() => { navigation.goBack() }} text={en.Buttons.Save} colors={[AppColors.lightBlue, AppColors.darkBlue]} customStyle={{ borderWidth: 0 }} />
            </View>
        </SafeAreaView>
    )
}

export default NotificationSettings