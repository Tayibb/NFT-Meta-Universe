import { HEADER_LOGO } from '../constants';

export default function LogoImage(state = {}, action) {
    switch (action.type) {
        case HEADER_LOGO:
            return {
                HeaderLogo: action.data
            };
        default:
            return state;
    }
}
