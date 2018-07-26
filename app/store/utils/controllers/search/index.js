import * as TYPES from 'actions/actionTypes';
import TrayBar from 'utils/process/trayMenuBar';

const searchController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.SEARCH_WINDOW_HIDE: {
      TrayBar.hideWindow();
      break;
    }
  }
};

export default searchController;