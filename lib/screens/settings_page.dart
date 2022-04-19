import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:theme_manager/theme.dart';
import '../constants.dart';
import 'login_page.dart';

import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

bool _isDarkTheme = true;
bool _requireLogin = true;
bool _isUsingHive = true;

class SettingsPage extends StatefulWidget {
  static const String id = '/settings';
  @override
  _SettingsPageState createState() => _SettingsPageState();

  final myController = TextEditingController();

  static String cookie = "";
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    ThemeProvider themeProvider =
        Provider.of<ThemeProvider>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: Text('Garage Predictions'),
        backgroundColor: kPrimaryColor,
        actions: <Widget>[
          IconButton(
            // icon: Icon(Icons.settings),
            // onPressed: (){
            //   print('settings');
            // }, //using nav drawer instead for now
            icon: Icon(Icons.brightness_6),
            color: Colors.white,
            onPressed: () {
              ThemeProvider themeProvider =
                  Provider.of<ThemeProvider>(context, listen: false);
              themeProvider.swapTheme();
            },
          )
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Container(
            padding: EdgeInsets.all(15.0),
            // alignment: Alignment.bottomLeft,
            child: Text(
              'Settings Page',
              // style: kTitleTextStyle,
            ),
          ),
          Container(
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: <Widget>[
                    Text('Light Theme'),
                    Switch(
                        activeColor: Theme.of(context).accentColor,
                        //value: _isDarkTheme,
                        value: themeProvider.isDarkMode(),
                        onChanged: (newVal) {
                          _isDarkTheme = newVal;
                          setState(() {
                            _isDarkTheme = newVal;
                          });
                          _isDarkTheme == true
                              ? themeProvider.setDark()
                              : themeProvider.setLight();
                        }),
                    Text('Dark Theme'),
                  ],
                ),
              ],
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
              // padding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
              // textStyle: TextStyle(
              //     fontSize: 30,
              //     fontWeight: FontWeight.bold)
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              // Confirmation
              showDialog(
                  context: context,
                  builder: (BuildContext context) => CupertinoAlertDialog(
                        title: Text("Are you sure you want to delete account?"),
                        content: Text(
                            "You are about to delete your account. This cannot be undone."),
                        actions: [
                          CupertinoDialogAction(
                            isDefaultAction: true,
                            child: Text("Delete account forever."),
                            onPressed: () {
                              this.deactivate();
                              deleteAccount();
                              Navigator.of(context).push(MaterialPageRoute(
                                  builder: (BuildContext context) =>
                                      LoginPage()));
                            },
                          ),
                          CupertinoDialogAction(
                              isDefaultAction: false,
                              child: Text("Cancel."),
                              onPressed: () {
                                this.deactivate();
                                Navigator.pop(context);
                              })
                        ],
                      ));
            },
            child: Text('Delete Account'),
          ),
          SizedBox(width: 30.0, height: 10.0),
          TextField(
            controller: widget.myController,
            obscureText: true,
            decoration: InputDecoration(
              // filled: true,
              // fillColor: Color(0xFF1C2341),
              hintText: "New Password",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(12)),
              ),
            ),
          ),
          SizedBox(width: 30.0, height: 10.0),
          //Spacer(flex: 1), // 1/6
          InkWell(
            //onTap: () => Get.to(InputPage()),
            // onTap: () => Get.to(InputPage()),
            onTap: () async {
              // Call login
              String newPassword = widget.myController.text;
              print("New password: $newPassword");
              if (newPassword != null) {
                await changePassword(newPassword);
                widget.myController.clear();
              } else {
                print("Empty email or password");
              }
            },

            child: Container(
              width: double.infinity,
              alignment: Alignment.center,
              padding: EdgeInsets.all(kDefaultPadding * 0.75), // 15
              decoration: BoxDecoration(
                gradient: kPrimaryGradient,
                borderRadius: BorderRadius.all(Radius.circular(12)),
              ),
              child: Text(
                "Reset Password",
                style: Theme.of(context)
                    .textTheme
                    .button
                    .copyWith(color: Colors.black),
              ),
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
              // padding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
              // textStyle: TextStyle(
              //     fontSize: 30,
              //     fontWeight: FontWeight.bold)
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Close Settings'),
          ),
        ],
      ),
    );
  }

  Future<String> deleteAccount() async {
    try {
      final http.Response answer = await http.post(
          Uri.parse(dotenv.env['root'] + "delete_acc"),
          headers: <String, String>{
            'cookie': SettingsPage.cookie,
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: jsonEncode(<String, dynamic>{'garage_id': ""}));
      //print("Sent successfully. " + answer.body);
      Map<String, dynamic> output = jsonDecode(answer.body);
      //print("Received value " + output.toString());
      int i = 0;

      return output.toString();
    } catch (e) {
      print("Caught exception");
      print(e.toString());
    }
    return "Sorry, no data received";
  }

  Future<String> changePassword(String newPassword) async {
    try {
      final http.Response answer = await http.post(
          Uri.parse(dotenv.env['root'] + "change_password"),
          headers: <String, String>{
            'cookie': SettingsPage.cookie,
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: jsonEncode(<String, dynamic>{'new_password': newPassword}));
      //print("Sent successfully. " + answer.body);
      Map<String, dynamic> output = jsonDecode(answer.body);
      //print("Received value " + output.toString());
      int i = 0;

      return output.toString();
    } catch (e) {
      print("Caught exception");
      print(e.toString());
    }
    return "Sorry, no data received";
  }
}
