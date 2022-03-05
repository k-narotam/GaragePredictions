import 'package:flutter/material.dart';
import '../constants.dart';
import '../screens/nav_drawer.dart';
import '../screens/input_page.dart';

class WelcomePage extends StatelessWidget {
  static const String id = '/welcome';
  WelcomePage();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Centerline'),
        backgroundColor: kPrimaryColor,
      ),
      drawer: NavDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          SizedBox(width: 50.0, height: 35.0),
          Image(
              image: AssetImage('images/living_centerline.gif'),
              height: 100,
              width: 100),
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              'Welcome to Centerline! Check out today\'s survey!',
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
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => InputPage()));
            },
            child: Text('Input Page'),
          ),
        ],
      ),
    );
  }
}
