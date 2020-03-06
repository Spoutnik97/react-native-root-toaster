import React, { Component, FunctionComponent } from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

interface Styles {
  container: ViewStyle;
  safeContainer: ViewStyle;
  modal: ViewStyle;
  text: TextStyle;
}

interface Props {
  visible?: boolean;
  defaultDuration?: number;
  defaultMessage?: string;
  defaultColor?: string;
  CloseComponent?: FunctionComponent;
}

interface State {
  isVisible: boolean;
  duration: number;
  text?: string;
}

const MARGIN = 4;
const BLACK_COAL = '#2e3137';
const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: MARGIN * 4,
    paddingTop: MARGIN * 7,
    paddingBottom: MARGIN * 4,
  },
  safeContainer: {
    margin: 0,
    padding: 0,
  },
  modal: { flex: 1, margin: 0, justifyContent: 'flex-start' },
  text: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#ffffff',
    flex: 1,
  },
});

const DEFAULT_DURATION = 3000;
const ANIMATION_DELAY = 500;

export class RootToaster extends Component<Props, State> {
  state = {
    isVisible: this.props.visible || false,
    duration: this.props.defaultDuration || DEFAULT_DURATION,
    text: this.props.defaultMessage || '',
  };

  _hideTimeout = 0;
  _showTimeout = setTimeout(() => {}, 0);
  eventListener: EmitterSubscription | null = null;

  _show = (text?: string, duration?: number) => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content');
    }, ANIMATION_DELAY / 2);
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);

    this.setState({
      text: text || '',
      duration: duration || DEFAULT_DURATION,
      isVisible: true,
    });

    if (this.state.duration > 0) {
      this._showTimeout = setTimeout(() => this._hide(), this.state.duration);
    }
  };

  _hide = () => {
    StatusBar.setBarStyle('dark-content');
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);

    this.setState({ isVisible: false });
  };

  listener = (data: { message: string; duration?: number }): void => {
    this._show(data.message || '', data.duration);
  };

  componentDidMount = () => {
    this.eventListener = DeviceEventEmitter.addListener(
      'showToaster',
      this.listener
    );

    if (this.state.isVisible) {
      this._show();
    }
  };

  componentWillUnmount() {
    if (this.eventListener)
      DeviceEventEmitter.removeListener('showToaster', this.listener);
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        this._show();
      } else {
        this._hide();
      }
    }
  };

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        animationIn="slideInDown"
        animationInTiming={ANIMATION_DELAY}
        animationOut="slideOutUp"
        animationOutTiming={ANIMATION_DELAY}
        hasBackdrop={false}
        coverScreen={false}
        style={styles.modal}
      >
        <SafeAreaView
          style={[
            styles.safeContainer,
            { backgroundColor: this.props.defaultColor || BLACK_COAL },
          ]}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: this.props.defaultColor || BLACK_COAL },
            ]}
          >
            <Text style={styles.text}>{this.state.text}</Text>

            {this.props.CloseComponent && (
              <TouchableOpacity
                onPress={() => this._hide()}
                style={styles.container}
              >
                {this.props.CloseComponent({})}
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
