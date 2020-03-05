import { NativeModules } from 'react-native';

type RootToasterType = {
  getDeviceName(): Promise<string>;
};

const { RootToaster } = NativeModules;

export default RootToaster as RootToasterType;
