import UserRightNav from '../components/UserRightNav/UserRightNav';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.ProfileHeaderImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserRightNav);
// export default UserRightNav;
