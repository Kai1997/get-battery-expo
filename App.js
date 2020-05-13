import React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
let deviceWidth = Dimensions.get('window').width
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { batteryLevel: null};
    // this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let batteryLevel = await this._get();
    let b = await Battery.isLowPowerModeEnabledAsync();
    console.log("isLowPower",b)
    this.setState({ batteryLevel });
    await this.getIntervalPin();
  }
  _bt = async () => {
    let batteryLevel = await this._get();
    this.setState({ batteryLevel });
  }
  getIntervalPin = async () => {
    console.log("Vo day")
    this.timer = setInterval(() => {
      this._get().then(batteryLevel => {
         this.setState({
         batteryLevel
       })
      })
      
    }, 3000);
  }
  _get = async () => {
    let a = await Battery.getBatteryLevelAsync();
    return a;
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    let test, test2;
    if (this.state.batteryLevel) {
      let a  = Number((this.state.batteryLevel*100).toFixed(1));
      test = <ProgressCircle
            percent={Math.round(a)}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
            // outerCircleStyle ={{width: 100}}
        >
            <Text style={styles.pin}>{a}</Text>
        </ProgressCircle>
        if (a > 0 && a <= 20) {
            test2 = <Text style={styles.noteLow}>Pin yếu</Text>
        } else if (a > 20 && a <= 80) {
            test2 = <Text style={styles.noteMedium}>Pin đủ dùng</Text>
        } else {
            test2 = <Text style={styles.noteHigh}>Pin đầy</Text>
        }
    }
    console.log("chin",this.state.batteryLevel);
    return (
      <View style={styles.container}>
         {test}
          {test2}
         {/* <TouchableOpacity
          style={styles.button}
          onPress={this._bt}
        >
          <Text> Nhấn </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    fontSize: 40
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 30,
    margin: 50,
    fontSize: 50
  },
  noteLow : {
    fontSize: 50,
    color:'#f58d42'
  },
  noteMedium : {
    fontSize: 50,
    color:'#5a8544'
  },
  noteHigh : {
    fontSize: 50,
    color:'#7295b8'
  }
 
});