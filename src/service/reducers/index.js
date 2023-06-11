import { combineReducers } from 'redux';
import ProfileHeaderImage from './reducer';
import LogoImage from './logoReducer';

export default combineReducers({
    ProfileHeaderImage,
    LogoImage
});
