import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector, useStore } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import type { AppStackParamList } from '../../navigator';
import { styles } from './styles';
import { getMeetingUrl, validateUrl } from '../../utils/functions';
import { COLORS } from '../../utils/theme';
import {
  CustomButton,
  CustomInput,
  DefaultModal,
  JoinSettingsModalContent,
} from '../../components';
import { setRoomID } from '../../redux/actions';
import { Constants } from '../../utils/types';
import { RootState } from '../../redux';
import { callService } from '../../utils/functions';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import { QRCodeIcon, ThreeDotsIcon } from '../../icons';

type QRCodeScreenProp = NativeStackNavigationProp<
  AppStackParamList,
  'QRCodeScreen'
>;

// @ts-ignore
const isHermes = () => !!global.HermesInternal;

const QRCode = () => {
  const navigate = useNavigation<QRCodeScreenProp>().navigate;
  const { top, bottom, left, right } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const store = useStore();

  const roomLink = useSelector(
    (state: RootState) => state.app.roomID || getMeetingUrl()
  );
  const debugMode = useSelector(
    (state: RootState) => state.app.joinConfig.debugMode
  );
  const [joinDisabled, setJoinDisabled] = useState<boolean>(true);
  const [joiningLink, setJoiningLink] = useState<string>('');
  const [moreModalVisible, setMoreModalVisible] = useState(false);

  const onJoinPress = () => {
    if (joiningLink.includes('app.100ms.live/')) {
      dispatch(setRoomID(joiningLink.replace('meeting', 'preview')));

      callService(
        joiningLink,
        (
          roomCode: string,
          userId: string,
          tokenEndpoint: string | undefined,
          initEndpoint: string | undefined,
          layoutEndPoint: string | undefined,
        ) => {
          // Saving Meeting Link to Async Storage for persisting it between app starts.
          AsyncStorage.setItem(
            Constants.MEET_URL,
            joiningLink.replace('preview', 'meeting')
          );
          // @ts-ignore
          navigate('HMSPrebuiltScreen', {
            roomCode,
            userId,
            initEndPoint: initEndpoint,
            tokenEndPoint: tokenEndpoint,
            layoutEndPoint: layoutEndPoint,
            debugMode, // default is false, will deal with this later
          });
        },
        (errorMsg: string) => {
          Toast.showWithGravity(errorMsg, Toast.LONG, Toast.TOP);
        }
      );
    } else {
      Alert.alert('Error', 'Invalid URL');
    }
  };

  const handleMorePress = () => setMoreModalVisible(true);

  const closeMoreModal = () => setMoreModalVisible(false);

  const onScanQRCodePress = () => {
    navigate('QRCodeScannerScreen');
  };

  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide();
    }, 1000);
  }, []);

  useEffect(() => {
    setJoinDisabled(!validateUrl(joiningLink));
  }, [joiningLink]);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        setJoiningLink(url);
      }
    });

    const updateUrl = ({ url }: { url: string }) => {
      if (url) {
        setJoiningLink(url);
      }
    };
    Linking.addEventListener('url', updateUrl);

    return () => {
      Linking.removeEventListener('url', updateUrl);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(Constants.MEET_URL, (_error, url) => {
        if (url && url === roomLink) {
          setJoiningLink(url);
        }
      });
    }, [roomLink])
  );

  useEffect(() => {
    if (roomLink) {
      setJoiningLink(roomLink);
    }
  }, [roomLink]);

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            paddingTop: 24 + top,
            paddingLeft: 24 + left,
            paddingRight: 24 + right,
            paddingBottom: 24 + bottom,
          },
        ]}
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >
        {/* ts-ignore: ignore-next */}
        <View
          style={{
            backgroundColor: 'black',
            top: 20,
            right: 20,
            position: 'absolute',
          }}
        ></View>

        <Image
          style={styles.image}
          resizeMode="stretch"
          source={require('../../assets/illustration.png')}
        />
        <View>
          <Text style={styles.heading}>Experience the power of 100ms</Text>
          <Text style={styles.description}>
            Jump right in by pasting a room link or scanning a QR code
          </Text>
        </View>
        <View style={styles.joiningLinkInputView}>
          <Text style={styles.joiningLinkInputText}>Joining Link</Text>
        </View>

        <CustomInput
          value={joiningLink}
          onChangeText={setJoiningLink}
          inputStyle={styles.joiningLinkInput}
          placeholderTextColor={COLORS.TEXT.DISABLED}
          placeholder="Paste the link here"
          multiline
          blurOnSubmit
        />

        <View style={{ flexDirection: 'row' }}>
          <CustomButton
            title="Join Now"
            onPress={onJoinPress}
            disabled={joinDisabled}
            viewStyle={[styles.joinButton, joinDisabled && styles.disabled]}
            textStyle={[
              styles.joinButtonText,
              joinDisabled && styles.disabledText,
            ]}
          />
          <CustomButton
            onPress={handleMorePress}
            viewStyle={styles.moreButton}
            RightIcon={<ThreeDotsIcon style={styles.moreButtonIcon} />}
          />
        </View>

        <View style={styles.horizontalSeparator} />

        <CustomButton
          title="Scan QR Code"
          onPress={onScanQRCodePress}
          viewStyle={styles.scanQRButton}
          textStyle={styles.joinButtonText}
          LeftIcon={<QRCodeIcon style={styles.scanQRButtonIcon} />}
        />
      </ScrollView>

      <DefaultModal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        modalVisible={moreModalVisible}
        viewStyle={{ height: 700 }}
        setModalVisible={closeMoreModal}
      >
        <JoinSettingsModalContent />
      </DefaultModal>
    </KeyboardAvoidingView>
  );
};

export { QRCode };