import 'package:flutter/material.dart';
import '../constants.dart';

class ResultsPage extends StatelessWidget {
  static const String id = '/results';
  ResultsPage({@required this.interpretation, @required this.resultText});
  //final String bmiResult;
  final String resultText;
  final String interpretation;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Centerline'),
        backgroundColor: kPrimaryColor,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          SizedBox(width: 50.0, height: 15.0),
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              resultText,
              textAlign: TextAlign.center,
              // style: kTitleTextStyle,
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Close Results'),
          ),
        ],
      ),
    );
  }
}
