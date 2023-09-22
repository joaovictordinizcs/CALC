import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function App() {
  const buttons = [
    ['C', 'DEL', '%', '÷'],
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    ['+/-', 0, '.', '='],
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const secondNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + secondNumber).toString());
        break;
      case '-':
        setCurrentNumber((firstNumber - secondNumber).toString());
        break;
      case 'x':
        setCurrentNumber((firstNumber * secondNumber).toString());
        break;
      case '/':
        setCurrentNumber((firstNumber / secondNumber).toString());
        break;
      default:
        break;
    }
  }

  function handleInput(buttonPressed) {
    if (typeof buttonPressed === 'number' || buttonPressed === '.') {
      setCurrentNumber(currentNumber + buttonPressed.toString());
    } else if (buttonPressed === 'DEL') {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else if (buttonPressed === 'C') {
      setCurrentNumber('');
      setLastNumber('');
    } else if (buttonPressed === '+/-') {
    } else if (buttonPressed === '=') {
      setLastNumber(currentNumber + ' = ');
      calculator();
    } else {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map(button => (
              <TouchableOpacity
                onPress={() => handleInput(button)}
                key={button.toString()}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      button === '='
                        ? '#3dd0e3'
                        : typeof button === 'number'
                        ? '#e0e0e0'
                        : '#0093a6',
                  },
                ]}>
                <Text
                  style={[
                    styles.textButton,
                    {
                      color: typeof button === 'number' ? 'black' : 'white',
                      fontSize: 30,
                    },
                  ]}>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5',
    paddingRight: 10,
  },
  resultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flex: 5,
    flexDirection: 'column',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 20,
  },
});
