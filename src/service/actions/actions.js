import { PROFILE_HEADER_IMAGE, USER_PROFILE_HEADER_IMAGE, HEADER_LOGO } from '../constants';

export const setProfileHeaderImage = (profileImageUrl) => {
    return {
        type: PROFILE_HEADER_IMAGE,
        data: profileImageUrl
    };
};
export const setUserProfileHeaderImage = (UserProfileImageUrl) => {
    return {
        type: USER_PROFILE_HEADER_IMAGE,
        data: UserProfileImageUrl
    };
};
export const setlogo = (logo) => {
    return {
        type: HEADER_LOGO,
        data: logo
    };
};
