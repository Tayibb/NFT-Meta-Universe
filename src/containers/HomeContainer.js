import Profile from '../pages/Profile/Profile';
import { connect } from 'react-redux';
import { setProfileHeaderImage, setUserProfileHeaderImage } from '../service/actions/actions';

const mapStateToProps = (state) => ({
    // data:state.cardItems
});
const mapDispatchToProps = (dispatch) => ({
    setProfileImageHandler: (data) => dispatch(setProfileHeaderImage(data)),
    setUserProfileImageHandler: (data) => dispatch(setUserProfileHeaderImage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default Profile;
