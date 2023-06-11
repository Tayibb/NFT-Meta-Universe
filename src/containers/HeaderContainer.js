import DashHeader from '../pages/Admin/DashHeader/DashHeader';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.ProfileHeaderImage
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DashHeader);
// export default Amin-DashHeader;
