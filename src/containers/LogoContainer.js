import SideBar from '../pages/Admin/SideBar/SideBar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.LogoImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
// export default SideBar;
