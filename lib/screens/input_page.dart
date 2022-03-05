import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../screens/results_page.dart';
import 'package:provider/provider.dart';
import '../screens/settings_page.dart'; //Needed here if we enabled on page quick settings change, disabled for now
import '../screens/nav_drawer.dart';
import 'package:theme_manager/calculator_brain.dart';
import '../constants.dart';
import '../user.dart';

double _happiness = 5;
double _sleep = 8;
double _energy = 5;
double _stress = 1;

int height = 60;
int weight = 160;

class InputPage extends StatefulWidget {
  @override
  _InputPageState createState() => _InputPageState();
}

class _InputPageState extends State<InputPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Centerline"),
        backgroundColor: kPrimaryColor,
        centerTitle: true,
        // leading: IconButton(
        //   icon: Icon(Icons.menu),
        //   onPressed: () {
        //     print('menu');
        //   },
        // ), //disabled menu, using nav drawer
        //actions: <Widget>[  //disabled settings from iconin appBar, use option from Nav drawer
        // IconButton(
        //   icon: Icon(Icons.settings),
        //   onPressed: () {
        //     print('settings');
        //     Navigator.push(
        //       context,
        //       MaterialPageRoute(
        //         //builder: (context) => SettingsPage(title: 'Settings'),
        //         builder: (context) => SettingsPage(),
        //       ),
        //     );
        //   },
        // )
        //],
      ),
      drawer: NavDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          SizedBox(width: 50.0, height: 30.0),
          Center(child: Text('How happy do you feel today?')),
          Column(children: [
            IconButton(
                onPressed: () {
                  _happiness = 0;
                },
                icon: Image.asset("sadface.png"))
          ]),
          /*Slider(
              value: _happiness,
              min: 0,
              max: 10,
              divisions: 10,
              label: getLabel(_happiness),
              onChanged: (double value) {
                setState(() {
                  _happiness = value;
                });
              }),*/
          Center(child: Text('How many hours did you sleep last night?')),
          Slider(
              value: _sleep,
              min: 0,
              max: 12,
              divisions: 12,
              label: sleepLabel(_sleep),
              onChanged: (double value) {
                setState(() {
                  _sleep = value;
                });
              }),
          Center(
              child: Text(
                  'Would you describe today as stressful, relaxing, or neither?')),
          Slider(
              value: _stress,
              min: 0,
              max: 2,
              divisions: 2,
              label: stressLabel(_stress),
              onChanged: (double value) {
                setState(() {
                  _stress = value;
                });
              }),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              // Navigator.pop(context);
              // All calculations are done in the calculator_brain
              // Input page creates a new CalculatorBrain object and passes it all the relevant inputs
              // Input page then accesses that object to get the outputs to pass them to the results page for display
              CalculatorBrain calc = CalculatorBrain(
                  stress: _stress.toInt(),
                  happiness: _happiness.toInt(),
                  sleep: _sleep.toInt());
              //  Navigator.pushNamed(context, '/results');
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ResultsPage(
                    //pass all your input data to calculatorBrain object here
                    /*bmiResult: calc.calculateBMI(),
                    interpretation: calc.getInterpretation(),*/
                    resultText: calc.getOutput(),
                  ),
                ),
              );
            },
            child: Text('Results Page'),
          ),
        ],
      ),
    );
  }

  String sleepLabel(double val) {
    if (val < 12) {
      return val.toInt().toString();
    } else
      return "12+";
  }

  String stressLabel(double val) {
    if (val == 0) return "Relaxing";
    if (val == 1) return "Neither";
    if (val == 2) return "Stressful";
  }

  String getLabel(double val) {
    return val.toInt().toString();
  }
}
