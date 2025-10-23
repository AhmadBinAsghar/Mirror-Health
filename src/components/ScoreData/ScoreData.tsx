import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AppColors } from '../../assets/colors/AppColors';
import { AppImages } from '../../assets/images/AppImages';
import NormalText from '../AppText/NormalText';
import { AppFonts } from '../../constants/AppFonts';
import SmallText from '../AppText/SmallText';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import ConnectDeviceModal from '../Modals/ConnectDeviceModal';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../constants/AppRoutes';
import { CurveType } from '../GraphDataDisplay/GraphDataDisplay';
interface Scores {
  id: number;
  icon: any;
  score: string;
  title: string;
  status: string;
  color: string;
  data: any[];
  type: string;
  asof: string;
  screen: string;
  name: string;
}

const ScoreData = ({
  id,
  icon,
  score,
  title,
  status,
  color,
  data,
  type,
  screen,
  asof,
  name,
}: Scores) => {
  // const Device = useSelector((state: any) => state.bleDevice.bleData);
  const [showConnectModal, setShowConnectModal] =
    React.useState<boolean>(false);
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      disabled={name === 'Me' ? false : true}
      onPress={() => {
        navigation.navigate(screen, { routeData: score, asof: asof });
      }}
      activeOpacity={0.8}
      key={id}
      style={styles.wrapper}>
      <ConnectDeviceModal
        visible={showConnectModal}
        onClose={() => setShowConnectModal(!showConnectModal)}
        onContinue={() => {
          navigation.navigate(AppRoutes.Profile, { screen: AppRoutes.MyDevice });
        }}
      />
      <View style={styles.body}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={icon} resizeMode="cover" style={styles.icon} />
          <NormalText
            text={title}
            customStyle={{
              color: color,
              fontFamily: AppFonts.GeneralSans.semiBold,
              paddingHorizontal: 6,
            }}
          />
        </View>
        {name === 'Me' && <Image
          source={AppImages.arrowNext}
          resizeMode="contain"
          style={styles.icon}
        />}
      </View>
      <View style={styles.stats}>
        <View style={{ paddingBottom: 20 }}>
          <View
            style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
            <NormalText
              text={score}
              customStyle={{
                fontFamily: AppFonts.GeneralSans.semiBold,
                fontSize: 38,
                lineHeight: 54,
              }}
            />
            {status && status == 'Good000' && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 8,
                  borderRadius: 100,
                  backgroundColor: AppColors.error,
                  padding: 8,
                }}>
                <SmallText
                  text={'ALERT'}
                  customStyle={{
                    fontSize: 12,
                    color: AppColors.red,
                    fontFamily: AppFonts.GeneralSans.semiBold,
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
            {status && (
              <>
                <Image
                  source={
                    status === 'Good'
                      ? AppImages.checkBox
                      : AppImages.checkAlert
                  }
                  resizeMode="contain"
                  style={styles.icon}
                />
                <SmallText
                  text={status}
                  customStyle={{
                    color: status === 'Good' ? AppColors.green : AppColors.red,
                    fontFamily: AppFonts.GeneralSans.medium,
                    paddingHorizontal: 4,
                  }}
                />
              </>
            )}
          </View>
        </View>
        {name === 'Me' && <View style={styles.chart}>
          {type === 'Line' && data?.length > 0 && (
            <LineChart
              noOfSections={5}
              hideAxesAndRules
              curveType={CurveType.QUADRATIC}
              onlyPositive
              overflowBottom={20}
              overflowTop={20}
              xAxisColor={AppColors.transparent}
              yAxisColor={AppColors.transparent}
              initialSpacing={-20}
              data={data ? data?.slice(0, 7) : []}
              color={AppColors.blue}
              dashWidth={0}
              curved
              hideDataPoints={true}
              thickness={3}
              height={80}
            />
          )}
          {/* {type === "Bar" && <BarChart barWidth={5} frontColor={AppColors.blue} barBorderRadius={100} xAxisColor={AppColors.transparent} hideAxesAndRules yAxisColor={AppColors.transparent} initialSpacing={0} stackData={data} width={wp(40)} color={AppColors.blue} dashWidth={0} spacing={wp(3)} height={hp(12)} />} */}
          {type === 'Bar' && data?.length > 0 && (
            <View style={styles.fiftyLine} />
          )}
        </View>}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ScoreData);

const styles = StyleSheet.create({
  wrapper: {
    width: wp(85),
    alignSelf: 'center',
    padding: 16,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chart: {
    width: wp(40),
    height: hp(12),
    position: 'absolute',
    justifyContent: 'center',
    // backgroundColor: "red",
    right: 0,
  },
  fiftyLine: {
    width: wp(28),
    height: 2,
    right: 8,
    backgroundColor: AppColors.borderColor,
    position: 'absolute',
    borderRadius: 10,
  },
});
