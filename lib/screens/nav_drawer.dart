import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import '../screens/settings_page.dart';
import '../screens/feedback_page.dart';
import '../screens/welcome_page.dart';
import '../screens/profile_page.dart';
import '../constants.dart';

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
                  'living centerline',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                  textAlign: TextAlign.left,
                ),
                alignment: Alignment.bottomLeft,
              ),
              decoration: BoxDecoration(
                  color: kPrimaryColor,
                  image: DecorationImage(
                      fit: BoxFit.none, //scaleDown,  // was fill
                      //scale: 0.5,
                      image: AssetImage('images/living_centerline.gif'))),
              // height: 125.0,
              // width: 125.0,
            ),
            ListTile(
              leading: Icon(Icons.input),
              title: Text('Welcome'),
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => WelcomePage(),
                  ),
                ),
              },
            ),
            ListTile(
              leading: Icon(Icons.verified_user),
              title: Text('Profile'),
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ProfilePage(),
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
              leading: Icon(Icons.border_color),
              title: Text('Feedback'),
              onTap: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => FeedbackPage(),
                  ),
                ),
              },
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
}
