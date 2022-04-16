import 'package:flutter/material.dart';
import '../constants.dart';

class FeedbackPage extends StatefulWidget {
  FeedbackPage();

  @override
  State<FeedbackPage> createState() => _FeedbackPageState();
}

class _FeedbackPageState extends State<FeedbackPage> {
  final emailController = TextEditingController();
  final feedbackController = TextEditingController();
  final GlobalKey<FormFieldState> formFieldKey = GlobalKey();

  bool isEmailValid(String email) {
    Pattern pattern =
        /*r*/ '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\$'; // unescape the $
    RegExp regex = new RegExp(pattern);
    return regex.hasMatch(email);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Garage Predictor'),
        backgroundColor: kPrimaryColor,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              'Feedback Page',
              // style: kTitleTextStyle,
            ),
          ),
          Container(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'We value your feedback!',
                textAlign: TextAlign.center,
                // style: kTitleTextStyle,
              )),
          TextFormField(
              key: formFieldKey,
              controller: emailController,
              decoration: InputDecoration(
                // filled: true,
                // fillColor: Color(0xFF1C2341),
                hintText: "Feedback",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(12)),
                ),
              ),
              validator: (value) {
                print("Value is " + value);
                if (value != "") {
                  Navigator.pop(context);
                  // Add in the call to the api
                  return null;
                } else {
                  return "Sorry, can not send an empty message.";
                }
              }),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              formFieldKey.currentState.validate();
            },
            child: Text('Send Feedback'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Close Page'),
          ),
        ],
      ),
    );
  }
}
