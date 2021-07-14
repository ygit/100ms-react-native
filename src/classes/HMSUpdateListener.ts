export default class HMSUpdateListener {
  onJoin?: Function;
  onPeerUpdate?: Function;
}

export enum HMSActions {
  ON_UPDATE = 'ON_UPDATE',
  ON_JOIN = 'ON_JOIN',
}
