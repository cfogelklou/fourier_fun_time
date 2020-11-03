/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  LineChart,
} from 'react-native-chart-kit';

import * as Native from './sau/sau_src/rn_audio';

Native.Api.StopAudioIn();
Native.Api.StartAudioIn(48000);

//const App: () => React$Node = () => {
class App extends React.Component {
  fftResFn:Function;

  constructor(props) {
    super(props);
    this.state={
      fftDims:null,
      fftData:[1,2,3,4],
    };
    this.fftResFn = this.fftResFn.bind(this);
    this.setState = this.setState.bind(this);
  }  

  fftResFn(evt){
    if ((evt) && (evt.rspData) && (evt.rspData.floatArr) && (evt.rspData.numFloats)){
      this.setState({fftData:[...evt.rspData.floatArr]});
    }
  }; 

  componentDidMount(){    
    Native.Api.RnAudioApi.inst().addListener('rsp_fft_result', this.fftResFn );
  }

  componentWillUnmount(){
    Native.Api.RnAudioApi.inst().removeListener('rsp_fft_result', this.fftResFn);
  }

  drawFft() {
    const fftData = (this.state.fftData) ? this.state.fftData :[1,3,5,7];
    const linedata = {
      datasets: [
        {
          data: fftData,
          strokeWidth: 2, // optional
          withDots: false,
          color: (opacity = 255) => `rgba(0, 0, 0, 255)`,
        }
      ]
    };

    return (this.state.fftDims != null) ? (
      <LineChart
      data={linedata}
      width={this.state.fftDims.width} // from react-native
      height={this.state.fftDims.height}
      withShadow={false}
      withInnerLines={false}
      verticalLabelRotation={90}
      chartConfig={{
        backgroundColor: Colors.white,
        backgroundGradientFrom: Colors.white,
        backgroundGradientTo: Colors.white,
        decimalPlaces: 5,
        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 2
        },
      }}
      bezier
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 2
      }}
  />) : <></>
  }

  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <View 
              style={styles.body}
              onLayout={(event)=>{
                const {width, height} = event.nativeEvent.layout;
                const maxDim = (width > height) ? 0.9*width : 0.9*height;
                if (this.state.fftDims == null){
                  this.setState({fftDims: {width:maxDim, height:maxDim/2}});
                }
            }}>
              { this.drawFft() }
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    //backgroundColor: Colors.lighter,
    //flex:1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex:1,    
  },
});

export default App;
