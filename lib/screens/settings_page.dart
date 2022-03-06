import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:theme_manager/theme.dart';
import '../constants.dart';

bool _isDarkTheme = true;
bool _requireLogin = true;
bool _isUsingHive = true;

class SettingsPage extends StatefulWidget {
  static const String id = '/settings';
  final String title;

  const SettingsPage({Key key, this.title}) : super(key: key);

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    ThemeProvider themeProvider =
        Provider.of<ThemeProvider>(context, listen: false);
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
                    Container(
                      //Must constrain with this container to stop uncontrolled width from breaking render, spread control a bonus
                      width: MediaQuery.of(context).size.width * 0.75,
                      //height: MediaQuery.of(context).size.height*0.50,
                      child: CheckboxListTile(
                          title: const Text('Require Login'),
                          secondary: Icon(Icons.account_circle_outlined),
                          //value: _requireLogin,
                          value: themeProvider.isLoginRequired(),
                          onChanged: (bool value) {
                            setState(() {
                              _requireLogin = value;
                            });
                            _requireLogin == true
                                ? themeProvider.requireLogin()
                                : themeProvider.noLogin();
                          }),
                    ),
                  ],
                ),
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
              Navigator.pop(context);
            },
            child: Text('Close Settings'),
          ),
        ],
      ),
    );
  }
}

// May want to refactor later to modularize spaghetti code like this

// Widget _buildPreferenceSwitch(BuildContext context) {
//   return Row(
//     mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//     children: <Widget>[
//       Text('Shared Pref'),
//       Switch(
//           activeColor: Theme.of(context).accentColor,
//           value: _isUsingHive,
//           onChanged: (newVal) {
//             if (kIsWeb) {
//               return;
//             }
//             _isUsingHive = newVal;
//             setState(() {
//               initSettings();
//             });
//           }),
//       Text('Hive Storage'),
//     ],
//   );
// }
//
//   Widget _buildThemeSwitch(BuildContext context) {
//     return Row(
//       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//       children: <Widget>[
//         Text('Light Theme'),
//         Switch(
//             activeColor: Theme.of(context).accentColor,
//             value: _isDarkTheme,
//             onChanged: (newVal) {
//               _isDarkTheme = newVal;
//               setState(() {});
//             }),
//         Text('Dark Theme'),
//       ],
//     );
//   }
// }
// Widget _buildThemeSwitch(BuildContext context) {
//   return Row(
//     mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//     children: <Widget>[
//       Text('Light Theme'),
//       Switch(
//           activeColor: Theme.of(context).accentColor,
//           value: _isDarkTheme,
//           onChanged: (newVal) {
//             _isDarkTheme = newVal;
//             setState(() {});
//           }),
//       Text('Dark Theme'),
//     ],
//   );
// }
// }

// class AppBody extends StatefulWidget {
//   @override
//   _AppBodyState createState() => _AppBodyState();
// }
//
// class _AppBodyState extends State<AppBody> {
//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: <Widget>[
//         _buildClearCacheButton(context),
//         SizedBox(
//           height: 25.0,
//         ),
//         // ElevatedButton(
//         //   onPressed: () {
//         //     openAppSettings(context);
//         //   },
//         //   child: Text('Start Demo'),
//         // ),
//         ElevatedButton(
//           onPressed: () {
//             Navigator.pop(context);
//           },
//           child: Text('Close Settings'),
//         ),
//       ],
//     );
//   }
//
//   void openAppSettings(BuildContext context) {
//     // Navigator.of(context).push(MaterialPageRoute(
//     //   builder: (context) => AppSettings(),
//     // ));
//     null;
//   }
//
//   Widget _buildClearCacheButton(BuildContext context) {
//     return ElevatedButton(
//       onPressed: () {
//         Settings.clearCache();
//         showSnackBar(
//           context,
//           'Cache cleared for selected cache.',
//         );
//       },
//       child: Text('Clear selected Cache'),
//     );
//   }
// }
//
// void showSnackBar(BuildContext context, String message) {
//   ScaffoldMessenger.of(context).showSnackBar(
//     SnackBar(
//       content: Text(
//         message,
//         style: TextStyle(
//           color: Colors.white,
//         ),
//       ),
//       backgroundColor: Theme.of(context).primaryColor,
//     ),
//   );
// }
