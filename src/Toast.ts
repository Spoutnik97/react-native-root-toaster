import { DeviceEventEmitter } from 'react-native';

export const Toast = {
  show: (message: string, duration = 3000) => {
    DeviceEventEmitter.emit('showToaster', {
      message,
      duration: duration,
    });
  },
};
