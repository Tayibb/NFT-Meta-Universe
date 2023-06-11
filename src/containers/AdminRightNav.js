import AdminRightNav from '../components/MobileNavRIght/MobileNavRight';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.ProfileHeaderImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRightNav);
// export default AdminDashHeader;
