import { PROFILE_HEADER_IMAGE, USER_PROFILE_HEADER_IMAGE, HEADER_LOGO } from '../constants';

export default function LogoImage(state = {}, action) {
    switch (action.type) {
        case PROFILE_HEADER_IMAGE:
            return {
                profileImageUrl: action.data
            };
        case USER_PROFILE_HEADER_IMAGE:
            return {
                UserProfileImageUrl: action.data
            };
        default:
            return state;
    }
}
