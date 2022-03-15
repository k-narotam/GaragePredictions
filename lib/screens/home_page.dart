import 'package:flutter/material.dart';
import '../constants.dart';
import '../screens/nav_drawer.dart';
import '../screens/check_future_page.dart';
import '../screens/predictions_page.dart';

class HomePage extends StatelessWidget {
  static const String id = '/home';
  HomePage();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
        backgroundColor: kPrimaryColor,
      ),
      drawer: NavDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          SizedBox(width: 50.0, height: 35.0),
          /*Image(
              image: AssetImage('images/living_centerline.gif'),
              height: 100,
              width: 100),*/
          Container(
            padding: EdgeInsets.all(10.0),
            child: Text(
              'Current Availability',
              textAlign: TextAlign.center,
              textScaleFactor: 2.0,
              // style: kTitleTextStyle,
            ),
          ),
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              'Garage A: 50%\nGarage B: 82%',
              textAlign: TextAlign.center,
              // style: kTitleTextStyle,
            ),
          ),
          /*Image(
              image: AssetImage('images/living_centerline.gif'),
              height: 100,
              width: 100),*/
          Container(
            padding: EdgeInsets.all(10.0),
            child: Text(
              'Favorites',
              textAlign: TextAlign.center,
              textScaleFactor: 2.0,
              // style: kTitleTextStyle,
            ),
          ),
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              'Tuesday 3pm\nFriday 9am',
              textAlign: TextAlign.center,
              // style: kTitleTextStyle,
            ),
          ),
          SizedBox(width: 50.0, height: 3.0),
          /*Image(
              image: AssetImage('images/living_centerline.gif'),
              height: 100,
              width: 100),*/
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => CheckFuturePage()));
            },
            child: Text('Check Future Page'),
          ),
          SizedBox(width: 50.0, height: 10.0),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => PredictionsPage()));
            },
            child: Text('Predict A Day!'),
          )
        ],
      ),
    );
  }
}
