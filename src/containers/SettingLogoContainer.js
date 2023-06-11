import Setting from '../pages/Settings/Setting';
import { connect } from 'react-redux';
import { setlogo } from '../service/actions/actions';

const mapStateToProps = (state) => ({
    // data:state.cardItems
});
const mapDispatchToProps = (dispatch) => ({
    setLogoHandler: (data) => dispatch(setlogo(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
// export default Setting;
