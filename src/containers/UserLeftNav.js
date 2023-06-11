import UserLeftNav from '../components/UserLeftNav/UserLeftNav';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.LogoImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserLeftNav);
// export default UserLeftNav;
