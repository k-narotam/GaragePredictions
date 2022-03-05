import 'dart:math';

class CalculatorBrain {
  CalculatorBrain({this.stress, this.happiness, this.sleep});
  //CalculatorBrain({this.height, this.weight});

  //final int height;
  //final int weight;

  int stress;
  int happiness;
  int sleep;
  int score;

  double _bmi;

  int makeScore() {
    return (happiness) - (stress * 5) + (sleep - 6);
  }

  String getOutput() {
    score = makeScore();
    if (score > 0) {
      return "Glad you're having a good day!";
    } else {
      return "Hope the day gets better! :)";
    }
  }

  /*String calculateBMI() {
    _bmi = weight / pow(height / 100, 2);
    return _bmi.toStringAsFixed(1);
  }

  String getResult() {
    if (_bmi >= 25) {
      return 'A good day!';
    } else if (_bmi > 18.5) {
      return 'Doing OK!';
    } else {
      return 'A rough day!';
    }
  }

  String getInterpretation() {
    if (_bmi >= 25) {
      return 'You are doing great, make the most of your day!';
    } else if (_bmi > 18.5) {
      return 'You have a normal body weight, good job!';
    } else {
      return 'You have a lower than normal body weight, you can eat a bit more!';
    }
  }*/
}
