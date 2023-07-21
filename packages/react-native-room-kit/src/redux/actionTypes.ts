const createRequests = (base: String) => {
  const statusObject = {
    REQUEST: `${base}_REQUEST`,
    SUCCESS: `${base}_SUCCESS`,
    FAILED: `${base}_FAILED`,
  };
  return statusObject;
};

const ADD_MESSAGE = createRequests('ADD_MESSAGE');

const ADD_PINNED_MESSAGE = createRequests('ADD_PINNED_MESSAGE');

const CLEAR_MESSAGE_DATA = createRequests('CLEAR_MESSAGE_DATA');

const SET_PEER_STATE = 'SET_PEER_STATE';

const CLEAR_PEER_DATA = createRequests('CLEAR_PEER_DATA');

const SAVE_USER_DATA = createRequests('SAVE_USER_DATA');

const SET_HMS_INSTANCE = 'SET_HMS_INSTANCE';

const CLEAR_HMS_INSTANCE = 'CLEAR_HMS_INSTANCE';

const CHANGE_PIP_MODE_STATUS = 'CHANGE_PIP_MODE_STATUS';

const RESET_JOIN_CONFIG = 'RESET_JOIN_CONFIG';

const CHANGE_MIRROR_CAMERA = 'CHANGE_MIRROR_CAMERA';

const CHANGE_SHOW_STATS = 'CHANGE_SHOW_STATS'; // RTC Stats

const CHANGE_SHOW_HLS_STATS = 'CHANGE_SHOW_HLS_STATS'; // HLS Stats

const CHANGE_ENABLE_HLS_PLAYER_CONTROLS = 'CHANGE_ENABLE_HLS_PLAYER_CONTROLS'; // HLS Stats

const CHANGE_SHOW_CUSTOM_HLS_PLAYER_CONTROLS =
  'CHANGE_SHOW_CUSTOM_HLS_PLAYER_CONTROLS';

const CHANGE_AUTO_SIMULCAST = 'CHANGE_AUTO_SIMULCAST';

const SET_RTC_STATS = 'SET_RTC_STATS';

const CHANGE_HLS_ASPECT_RATIO = 'CHANGE_HLS_ASPECT_RATIO';

const SET_MODAL_TYPE = 'SET_MODAL_TYPE';

const SET_PEER_TO_UPDATE = 'SET_PEER_TO_UPDATE';

export default {
  ADD_PINNED_MESSAGE,
  ADD_MESSAGE,
  CLEAR_MESSAGE_DATA,
  CLEAR_PEER_DATA,
  SET_PEER_STATE,
  SAVE_USER_DATA,
  SET_HMS_INSTANCE,
  CLEAR_HMS_INSTANCE,
  CHANGE_PIP_MODE_STATUS,
  RESET_JOIN_CONFIG,
  CHANGE_MIRROR_CAMERA,
  CHANGE_SHOW_STATS,
  CHANGE_AUTO_SIMULCAST,
  CHANGE_SHOW_HLS_STATS,
  CHANGE_ENABLE_HLS_PLAYER_CONTROLS,
  CHANGE_SHOW_CUSTOM_HLS_PLAYER_CONTROLS,
  CHANGE_HLS_ASPECT_RATIO,
  SET_RTC_STATS,
  SET_MODAL_TYPE,
  SET_PEER_TO_UPDATE,
};

export enum HmsStateActionTypes {
  CLEAR_STATES = 'CLEAR_STATES',
  SET_PREBUILT_DATA = 'SET_PREBUILT_DATA',
  SET_ROOM_STATE = 'SET_ROOM_STATE',
  SET_LOCAL_PEER_STATE = 'SET_LOCAL_PEER_STATE',
  SET_ROLES_STATE = 'SET_ROLES_STATE',
  SET_IS_LOCAL_AUDIO_MUTED_STATE = 'SET_IS_LOCAL_AUDIO_MUTED_STATE',
  SET_IS_LOCAL_VIDEO_MUTED_STATE = 'SET_IS_LOCAL_VIDEO_MUTED_STATE',
  SET_IS_LOCAL_SCREEN_SHARED_STATE = 'SET_IS_LOCAL_SCREEN_SHARED_STATE',
  SET_ROOM_LOCALLY_MUTED = 'SET_ROOM_LOCALLY_MUTED',
  SET_USER_NAME = 'SET_USER_NAME',
  ADD_TO_PREVIEW_PEERS_LIST = 'ADD_TO_PREVIEW_PEERS_LIST',
  REMOVE_FROM_PREVIEW_PEERS_LIST = 'REMOVE_FROM_PREVIEW_PEERS_LIST',
}
