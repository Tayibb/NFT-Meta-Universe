import UserDashHeader from '../pages/User/DashHeader/DashHeader';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.ProfileHeaderImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashHeader);
// export default UserDashHeader;
