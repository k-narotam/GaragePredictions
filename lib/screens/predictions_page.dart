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

class PredictionsPage extends StatefulWidget {
  @override
  _PredictionsPageState createState() => _PredictionsPageState();
}

class _PredictionsPageState extends State<PredictionsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Garage Predictor"),
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
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              'Check Future Page',
              // style: kTitleTextStyle,
            ),
          ),
          Container(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'This will show all garages for a particular day.',
                textAlign: TextAlign.center,
                // style: kTitleTextStyle,
              )),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Home'),
          ),
          // ],
          // ),
        ],
      ),
    );
  }
}