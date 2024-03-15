import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, StatusBar, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <TopBar />
      <Main />
    </SafeAreaView>
  );
}


function TopBar() {
  return(
    <View style={styles.topBar}>
      <Image source={require('./assets/icon2.png')} style={styles.topBarIcon}/>
      <Text style={styles.topBarText}>
        Submeter Calculator
      </Text>
    </View>
  )
};

function Main() {
  const [amount, setAmount] = useState('0.00');
  const [rate, setRate] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [previousAmount, setPreviousAmount] = useState('');

  const calculate = () => {
  const currentAmountFloat = parseFloat(currentAmount);
  const previousAmountFloat = parseFloat(previousAmount);
  const rateFloat = parseFloat(rate);

  const newAmount = currentAmountFloat - previousAmountFloat; 
  const amount = newAmount * rateFloat;
  setAmount(amount.toFixed(2));
  Keyboard.dismiss();

  const previousAmountTrans = currentAmountFloat
  AsyncStorage.setItem('previousAmount', previousAmountTrans.toString());
};

function getPreviousTransaction() {
    AsyncStorage.getItem('previousAmount')
    .then(value => {
      if (value !== null) {
        setPreviousAmount(value);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const clean = () => {
    setAmount('0.00');
    setRate('');
    setCurrentAmount('');
    setPreviousAmount('');
};

useEffect(() => {
  getPreviousTransaction();
}, []);

  return(
    <View style={styles.main}>
      <View style={styles.displayContainer}>
        <Text style={styles.phpDisplay}>Php</Text>
        <Text style={styles.textDisplay}>{amount}</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Current Amount:</Text>
          <TextInput style={styles.input} keyboardType="decimal-pad" onChangeText={text => setCurrentAmount(text)} 
          value={currentAmount.toString()}/>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Previous Amount:</Text>
          <TextInput style={styles.input} keyboardType="decimal-pad" 
          inputMode='decimal'
          onChangeText={text => setPreviousAmount(text)} 
          value={previousAmount.toString()}/>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Rate:</Text>
          <TextInput style={styles.input} keyboardType="decimal-pad" 
          onChangeText={text => setRate(text)} 
          value={rate.toString()}
          />
        </View>
      <View style={styles.calculateContainer}>
        <TouchableOpacity style={styles.button} onPress={calculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <View style={styles.cleanContainer}>
          <TouchableOpacity style={styles.cleanButton} onPress={clean}>
          <Text style={styles.cleanButtonText}>Clear</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
      <Image source={require('./assets/cat.png')} style={styles.catImage}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4C4',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4C4'
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    height: 50,
    backgroundColor: '#A86E28',
    justifyContent: 'flex-start',
    gap: 10,
  },
  topBarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  topBarIcon: {
    width: 30,
    height: 30,
  },
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    gap: 40,
  },
  displayContainer: {
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  phpDisplay: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 20,
    color: '#A86E28'
  },
  textDisplay: {
    fontSize: 60,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 20
  },
  inputContainer: {
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
  },
  fieldContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A86E28',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  fieldText: {
    fontSize: 20,
    fontWeight: '600',
  },
  cleanContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 50
  },
  cleanButton: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEC796',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  calculateContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cleanButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  catImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 35,
    right: 30
  }
});
