import color from 'color';
import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';

export default {
  platformStyle,
  platform,
    // AndroidRipple
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

    // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
    // New Variable
  badgePadding: (platform === 'ios') ? 3 : 0,

    // Button
  btnFontFamily: (platform === 'ios') ? 'Roboto' : 'Roboto_medium',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',

    // CheckBox
  get CheckboxRadius(){
    return this.checkboxSize / 2
  },
  CheckboxBorderWidth: 1,
  CheckboxPaddingLeft: 2,
  CheckboxPaddingBottom: (platform === 'ios') ? 0 : 5,
  CheckboxIconSize: (platform === 'ios') ? 18 : 14,
  CheckboxIconMarginTop: (platform === 'ios') ? undefined : 1,
  CheckboxFontSize: (platform === 'ios') ? 21 : 18,
  DefaultFontSize: 17,
  checkboxBgColor: '#039BE5',
  checkboxSize: 20,
  checkboxTickColor: 'transparent',
  get checkboxSizeLarge(){
    return this.checkboxSize * 1.5
  },

  // Segment
  segmentBackgroundColor: '#3F51B5',
  segmentActiveBackgroundColor: '#fff',
  segmentTextColor: '#fff',
  segmentActiveTextColor: '#3F51B5',
  segmentBorderColor: '#fff',
  segmentBorderColorMain: '#3F51B5',

    // New Variable
  get defaultTextColor() {
    return this.textColor;
  },


  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  btnTextSize: 14,
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },


    // Card
  cardDefaultBg: '#fff',


      // Color
  brandPrimary: '#0054a6',
  brandInfo: '#3F57D3',
  brandSuccess: '#00a651',
  brandDanger: '#ed1c24',
  brandWarning: '#f26522',
  brandSidebar: '#252932',

  red500: '#F44336',

  white500: '#ffffff',
  black500: '#000000',

  blue600: '#0085AC',
  blue500: '#2196F3',
  blue400: '#00A9D3',

  green500: '#4CAF50',
  green400: '#8CC63F',

  orange500: '#F7931E',

  gray600: '#4D4D4D',
  gray500: '#808080',
  gray400: '#B3B3B3',
  gray300: '#E8E8E8',
  gray200: '#F2F2F2',

  get primaryColor(){
    return this.blue400;
  },
  get warningColor(){
    return this.orange500;
  },
  get errorColor(){
    return this.red500;
  },
  get successColor(){
    return this.green400;
  },
  get backgroundColor1(){
    return this.gray200;
  },
  get textColor1(){
    return this.gray500;
  },

    // Font
  fontFamily: 'Roboto',
  fontSizeBase: 15,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },


    // Footer
  footerHeight: 40,
  footerDefaultBg: '#FFF',


    // FooterTab
  tabBarTextColor: '#c2c2c2',
  tabBarTextSize: (platform === 'ios') ? 14 : 11,
  activeTab: '#fff',
  sTabBarActiveTextColor: '#007aff',
  tabBarActiveTextColor: '#00aeef',
  tabActiveBgColor: undefined,

    // Tab
  topTabBarTextSize: 11,
  tabDefaultBg: '#3F51B5',
  topTabBarTextColor: '#808080',
  topTabBarActiveTextColor: '#02abd2',
  topTabDefaultBg: '#d7d7d7',
  topTabActiveBgColor: undefined,
  topTabBarBorderColor: 'transparent',
  topTabBarActiveBorderColor: '#117e9e',


    // Header
  toolbarBtnColor: '#fff',
  toolbarDefaultBg: '#00a9d4',
  toolbarHeight: (platform === 'ios') ? 76 : 56,
  toolbarIconSize: (platform === 'ios') ? 20 : 22,
  toolbarSearchIconSize: (platform === 'ios') ? 20 : 23,
  toolbarInputColor: '#fff',
  searchBarHeight: (platform === 'ios') ? 30 : 40,
  toolbarInverseBg: '#222',
  toolbarTextColor: '#fff',
  toolbarDefaultBorder: '#3F51B5',
  iosStatusbar: 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hexString();
  },


    // Icon
  iconFamily: 'MaterialIcons',
  iconFontSize: (platform === 'ios') ? 30 : 28,
  iconMargin: 7,
  iconHeaderSize: (platform === 'ios') ? 29 : 24,


    // InputGroup
  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',

  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#c2c2c2';
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 50,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon() {
    return this.inputPaddingLeft * 8;
  },


    // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (platform === 'ios') ? 37 : 30,
  lineHeight: (platform === 'ios') ? 20 : 24,


    // List
  listBorderColor: '#464646',
  listDividerBg: '#f4f4f4',
  listItemHeight: 45,
  listItemActiveColor: '#c7eafb',
  listBtnUnderlayColor: 'transparent',

    // Card
  cardBorderColor: '#ccc',

    // Changed Variable
  listItemPadding: (platform === 'ios') ? 10 : 12,

  listNoteColor: '#808080',
  listNoteSize: 13,


    // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',


    // Radio Button
  radioBtnSize: (platform === 'ios') ? 25 : 23,
  radioSelectedColorAndroid: '#5067FF',

    // New Variable
  radioBtnLineHeight: (platform === 'ios') ? 29 : 24,

  radioColor: '#7e7e7e',

  get radioSelectedColor() {
    return color(this.radioColor).darken(0.2).hexString();
  },


    // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',


    // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,
  tabTextColor: '#222222',


    // Text
  textColor: '#000',
  inverseTextColor: '#fff',
  noteFontSize: 14,
  noteTextColor: '#a8a8a8',
  linkTextColor: '#448ccb',

    // Title
  titleFontfamily: (platform === 'ios') ? 'Roboto' : 'Roboto_medium',
  titleFontSize: 15,
  subTitleFontSize: 14,
  subtitleColor: '#FFF',

    // New Variable
  titleFontColor: '#FFF',


    // Other
  borderRadiusBase: 2,
  borderWidth: (1/PixelRatio.getPixelSizeForLayoutSize(1)),
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hexString();
  },

  dropdownBg: '#000',
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  jumbotronBg: '#C9C9CE',
  jumbotronPadding: 30,
  deviceWidth,
  deviceHeight,

    // New Variable
  inputGroupRoundedBorderRadius: 30,

  // color theme
  grayColor: '#959595',  
  backgroundColor: '#e6e7e8',
};
