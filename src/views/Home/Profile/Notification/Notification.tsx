import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import en from '../../../../../translation/en.json';
import AppHeader from '../../../../components/Header/AppHeader';
import { AppFonts } from '../../../../constants/AppFonts';
import { useNavigation } from '@react-navigation/native';
import NormalText from '../../../../components/AppText/NormalText';
import { AppColors } from '../../../../assets/colors/AppColors';
import SmallText from '../../../../components/AppText/SmallText';
import NoNotiContent from '../../../../components/NoNotification/NoNotiContent';
import moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppImages } from '../../../../assets/images/AppImages';
import AppButton from '../../../../components/Button/AppButton';
import { AppRoutes } from '../../../../constants/AppRoutes';
import NotificationSkeleton from '../../../../components/Skeletons/NotificationSkeleton';

export interface Notification {
  createdAt: string;
  type: string;
  message?: string;
  img: any;
  post?: any;
  isNew?: boolean;
  name: string;
}
const AllNoti = [
  // {
  //     createdAt: moment().format(),
  //     name: "Erica Mayers",
  //     type: "comment",
  //     message: "What a great recipe",
  //     img: AppImages.avatar,
  //     post: AppImages.image1,
  //     isNew: true
  // },
  // {
  //     createdAt: moment().format(),
  //     name: "Jeff Patterson",
  //     type: "react",
  //     message: "What a great recipe",
  //     img: AppImages.avatar2,
  //     post: AppImages.image1,
  //     isNew: true
  // },
  {
    createdAt: moment().subtract(5, 'days').format(),
    name: "Frank's",
    type: 'alert',
    message: 'is being monitored for High HBR',
    img: AppImages.avatar2,
    isNew: false,
  },
  {
    createdAt: moment().subtract(1, 'days').format(),
    name: "Dad's",
    type: 'alert',
    message: 'is being monitored for Sleep deficiency',
    img: AppImages.avatar2,
    isNew: false,
  },
  {
    createdAt: moment().subtract(1, 'days').format(),
    name: "Mom's",
    type: 'alert',
    message: 'being monitored for Sleep deficiency',
    img: AppImages.avatar2,
    isNew: false,
  },
  {
    createdAt: moment().subtract(1, 'days').format(),
    name: 'Larry Johnson',
    type: 'invite',
    message: 'What a great recipe',
    img: AppImages.avatar2,
    isNew: false,
  },
  // {
  //     createdAt: moment().subtract(1, 'days').format(),
  //     name: "Larry Smith",
  //     type: "repost",
  //     message: "What a great recipe",
  //     img: AppImages.avatar2,
  //     post: AppImages.image1,
  //     isNew: false
  // }
];
const Notification = () => {
  const navigation: any = useNavigation();
  const [notiType, setNotiType] = React.useState<string>('All');
  const [onLoad, setOnLoad] = React.useState<boolean>(true);

  const categorizeNotifications = (notifications: Notification[]) => {
    const today = moment();
    const Yesterday = moment().subtract(1, 'days');

    const categorized: { title: string; data: Notification[] }[] = [
      { title: 'Today', data: [] },
      { title: 'Yesterday', data: [] },
      { title: 'Earlier', data: [] },
    ];

    notifications.forEach(notification => {
      const notificationDate = moment(notification.createdAt);
      if (notificationDate.isSame(today, 'day')) {
        categorized[0].data.push(notification);
      } else if (notificationDate.isSame(Yesterday, 'days')) {
        categorized[1].data.push(notification);
      } else {
        categorized[2].data.push(notification);
      }
    });

    return categorized.filter(category => category.data.length > 0);
  };

  const filterNoti = () => {
    return AllNoti.filter(noti => noti.type.toLowerCase().includes('alert'));
  };

  React.useEffect(() => {
    setInterval(() => {
      setOnLoad(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.wrapper}>
      <AppHeader
        title={en.Headings.Notifications}
        onBackPress={() => {
          navigation.goBack();
        }}
        customStyle={{ fontFamily: AppFonts.GeneralSans.semiBold }}
        onThreeDots={() => {
          navigation.navigate(AppRoutes.NotificationSettings);
        }}
      />
      <View style={styles.body}>
        <View style={styles.options}>
          <TouchableOpacity
            style={[
              styles.item,
              {
                borderColor:
                  notiType === 'All' ? AppColors.blue : AppColors.borderColor,
              },
            ]}
            onPress={() => {
              setNotiType('All');
            }}
            activeOpacity={1}>
            <SmallText
              text={en.Notifications.all}
              customStyle={{
                color:
                  notiType === 'All'
                    ? AppColors.blue
                    : AppColors.placeholderColor,
                fontFamily: AppFonts.GeneralSans.semiBold,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.item,
              {
                borderColor:
                  notiType === 'Alert' ? AppColors.blue : AppColors.borderColor,
              },
            ]}
            onPress={() => {
              setNotiType('Alert');
            }}
            activeOpacity={1}>
            <SmallText
              text={en.Notifications.alert}
              customStyle={{
                color:
                  notiType === 'Alert'
                    ? AppColors.blue
                    : AppColors.placeholderColor,
                fontFamily: AppFonts.GeneralSans.semiBold,
              }}
            />
          </TouchableOpacity>
        </View>
        {notiType === 'All' && (
          <View style={[styles.body, { paddingHorizontal: 20 }]}>
            {onLoad ? (
              <NotificationSkeleton />
            ) : categorizeNotifications(AllNoti).length === 0 ? (
              <NoNotiContent />
            ) : (
              <SectionList
                contentContainerStyle={{
                  width: wp(85),
                  alignSelf: 'center',
                  paddingBottom: '10%',
                }}
                overScrollMode="never"
                sections={categorizeNotifications(AllNoti)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderSectionHeader={({ section: { title } }) => {
                  return (
                    <View style={{ backgroundColor: AppColors.background }}>
                      <NormalText
                        text={title}
                        customStyle={{
                          fontFamily: AppFonts.GeneralSans.medium,
                          fontSize: 14,
                          marginVertical: 15,
                        }}
                      />
                    </View>
                  );
                }}
                renderItem={({ item }) => (
                  <View style={styles.notificationItem}>
                    {item?.isNew && <View style={styles.ActiveDot} />}
                    <View>
                      <Image
                        source={item?.img}
                        resizeMode="contain"
                        style={styles.avatar}
                      />
                      {item?.type === 'react' && (
                        <Image
                          source={AppImages.heartRed}
                          resizeMode="contain"
                          style={styles.heartIcon}
                        />
                      )}
                      {item?.type === 'alert' && (
                        <Image
                          source={AppImages.alert}
                          resizeMode="contain"
                          style={styles.heartIcon}
                        />
                      )}
                    </View>
                    <View
                      style={[
                        styles.Details,
                        {
                          width: item?.isNew
                            ? wp(42)
                            : item.type === 'invite'
                              ? wp(38)
                              : wp(47),
                        },
                      ]}>
                      <SmallText
                        text={
                          item.type === 'alert'
                            ? `${item.name} alerts`
                            : item.name
                        }
                        customStyle={{
                          fontFamily: AppFonts.GeneralSans.semiBold,
                        }}
                      />
                      <SmallText
                        text={
                          item.type === 'react'
                            ? `reacted to your post`
                            : item.type === 'comment'
                              ? `commented: ${item?.message}`
                              : item.type === 'alert'
                                ? `${item.name} ${item.message}`
                                : item.type === 'invite'
                                  ? `Invites you to become a member`
                                  : `made a repost of your post`
                        }
                        customStyle={{ fontSize: 12, lineHeight: 18 }}
                      />
                    </View>
                    {item.type === 'invite' && (
                      <View style={styles.btnView}>
                        <AppButton
                          text="Add"
                          onPress={() => { }}
                          colors={[AppColors.lightBlue, AppColors.darkBlue]}
                          containerStyle={{
                            width: wp(15),
                            height: 30,
                            borderRadius: 8,
                          }}
                          customStyle={{
                            width: wp(15),
                            height: 30,
                            borderRadius: 8,
                            borderWidth: 0,
                          }}
                          txtStyle={{
                            fontFamily: AppFonts.GeneralSans.medium,
                            fontSize: 12,
                            color: AppColors.white,
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => { }}
                          activeOpacity={0.8}>
                          <Image
                            source={AppImages.crossLarge}
                            resizeMode="center"
                            tintColor={AppColors.grey}
                            style={{
                              width: 15,
                              height: 15,
                              marginHorizontal: 12,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {item.type === 'alert' && (
                      <SmallText
                        text="ALERT"
                        customStyle={{
                          fontFamily: AppFonts.GeneralSans.semiBold,
                          fontSize: 11,
                          padding: 3,
                          paddingHorizontal: 6,
                          backgroundColor: AppColors.error,
                          borderRadius: 100,
                          color: AppColors.red,
                          alignSelf: 'flex-start',
                          right: 0,
                        }}
                      />
                    )}
                    {item?.post && (
                      <Image
                        source={item.post}
                        resizeMode="contain"
                        style={styles.post}
                      />
                    )}
                  </View>
                )}
              />
            )}
          </View>
        )}
        {notiType === 'Alert' && (
          <View style={[styles.body, { paddingHorizontal: 20 }]}>
            {onLoad ? (
              <NotificationSkeleton />
            ) : categorizeNotifications(filterNoti()).length === 0 ? (
              <NoNotiContent />
            ) : (
              <SectionList
                contentContainerStyle={{
                  width: wp(85),
                  alignSelf: 'center',
                  paddingBottom: '10%',
                }}
                overScrollMode="never"
                sections={categorizeNotifications(filterNoti())}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderSectionHeader={({ section: { title } }) => {
                  return (
                    <View style={{ backgroundColor: AppColors.background }}>
                      <NormalText
                        text={title}
                        customStyle={{
                          fontFamily: AppFonts.GeneralSans.medium,
                          marginVertical: 15,
                        }}
                      />
                    </View>
                  );
                }}
                renderItem={({ item }) => (
                  <View style={styles.notificationItem}>
                    {item?.isNew && <View style={styles.ActiveDot} />}
                    <View>
                      <Image
                        source={item?.img}
                        resizeMode="contain"
                        style={styles.avatar}
                      />
                      {item?.type === 'alert' && (
                        <Image
                          source={AppImages.alert}
                          resizeMode="contain"
                          style={styles.heartIcon}
                        />
                      )}
                    </View>
                    <View
                      style={[
                        styles.Details,
                        { width: item?.isNew ? wp(42) : wp(47) },
                      ]}>
                      <SmallText
                        text={`${item.name} alerts`}
                        customStyle={{
                          fontFamily: AppFonts.GeneralSans.semiBold,
                        }}
                      />
                      <SmallText
                        text={`${item.name} ${item.message} `}
                        customStyle={{ fontSize: 12, lineHeight: 18 }}
                      />
                    </View>
                    {item.type === 'alert' && (
                      <SmallText
                        text="ALERT"
                        customStyle={{
                          fontFamily: AppFonts.GeneralSans.semiBold,
                          fontSize: 11,
                          padding: 2,
                          paddingHorizontal: 6,
                          backgroundColor: AppColors.error,
                          borderRadius: 100,
                          color: AppColors.red,
                          alignSelf: 'flex-start',
                        }}
                      />
                    )}
                  </View>
                )}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(Notification);
