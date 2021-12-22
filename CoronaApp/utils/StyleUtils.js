import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 160.7;
const guidelineBaseHeight = 779.7;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

const textSize = scale(14);
const headerSize = scale(24);

export {textSize, headerSize, scale, verticalScale, moderateScale};