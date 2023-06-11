import AdminLeftNav from '../components/MobileNavLeft/MobileNavLeft';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.LogoImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLeftNav);
// export default AdminDashHeader;
