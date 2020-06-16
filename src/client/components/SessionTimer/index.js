import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { setUserDataPropType } from "../../commonPropTypes";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";

let timerId = null;

function SessionTimer(props) {
  const TIMEOUT_MS = 30 * 60 * 1000;
  const history = useHistory();
  const { action, setUserData } = props;

  function startOrUpdate() {
    clear();
    timerId = setTimeout(() => {
      if (sessionStorage.getItem(AUTH_STRINGS.authToken)) {
        sessionStorage.removeItem(AUTH_STRINGS.authToken);
        history.push(routes.retroCertsAuth);
        setUserData({
          status: AUTH_STRINGS.statusCode.sessionTimedOut,
        });
      }
    }, TIMEOUT_MS);
  }

  function clear() {
    clearTimeout(timerId);
    timerId = null;
  }

  if (action === "startOrUpdate") {
    startOrUpdate();
  } else if (action === "clear") {
    clear();
  }

  // No HTML to render.
  return false;
}

SessionTimer.propTypes = {
  action: PropTypes.string.isRequired,
  setUserData: setUserDataPropType.isRequired,
};

SessionTimer.getTimerIdForTest = function () {
  return timerId;
};

export default SessionTimer;
