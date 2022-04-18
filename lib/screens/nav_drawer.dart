import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import '../screens/settings_page.dart';
import '../screens/home_page.dart';
import '../screens/map_page.dart';
import '../screens/about_page.dart';
import '../screens/login_page.dart';
import '../constants.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

class NavDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 240,
      child: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Container(
                child: Text(
                  'Garage Predictions',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                  textAlign: TextAlign.left,
                ),
                alignment: Alignment.bottomLeft,
              ),
              /*decoration: BoxDecoration(
                  color: kPrimaryColor,
                  image: DecorationImage(
                      fit: BoxFit.none, //scaleDown,  // was fill
                      //scale: 0.5,
                      image: AssetImage('images/living_centerline.gif'))),*/
              // height: 125.0,
              // width: 125.0,
            ),
            ListTile(
              leading: Icon(Icons.input),
              title: Text('Home'),
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => HomePage(),
                  ),
                ),
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Settings'),
              //onTap: () => {SettingsPage()}, //{Navigator.of(context).pop()},
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => SettingsPage(),
                  ),
                ),
              },
            ),
            ListTile(
              leading: Icon(Icons.map),
              title: Text('Map'),
              //onTap: () => {SettingsPage()}, //{Navigator.of(context).pop()},
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => MapPage(),
                  ),
                ),
              },
            ),
            ListTile(
              leading: Icon(Icons.people),
              title: Text('About Us'),
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => AboutPage(),
                  ),
                ),
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('Logout'),
              onTap: () => {logout(context)},
            ),
            ListTile(
              leading: Icon(Icons.exit_to_app),
              title: Text('Close'),
              onTap: () => {Navigator.of(context).pop()},
            ),
          ],
        ),
      ),
    );
  }

  void logout(BuildContext context) {
    print("Logging out!");
    // No need to await since we do not need a response
    http.post(Uri.parse(dotenv.env['root'] + "logout"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        });
    print("Logged out");
    Navigator.of(context).push(
        MaterialPageRoute(builder: (BuildContext context) => LoginPage()));
  }
}
