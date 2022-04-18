import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:theme_manager/theme.dart';
import 'package:provider/provider.dart';
import 'screens/home_page.dart';
import 'screens/settings_page.dart';
import 'screens/login_page.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:async';

bool _requireLogin = true;
String _initialRoute = "";

Future main() async {
  await dotenv.load(fileName: ".env");
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences.getInstance().then((prefs) {
    var isDarkTheme = prefs.getBool("isDarkTheme") ?? true;
    print(isDarkTheme);
    bool savedvalue = prefs.getBool("isDarkTheme");
    print("Main Read isDarkTheme $savedvalue");
    var requireLogin = prefs.getBool("requireLogin") ?? true;
    print(requireLogin);
    savedvalue = prefs.getBool("requireLogin");
    print("Main Read requireLogin $savedvalue");
    _requireLogin =
        savedvalue; //This is needed to pass it to MyApp startup login, Kludgy
    return runApp(
      ChangeNotifierProvider<ThemeProvider>(
        child: MyApp(),
        create: (BuildContext context) {
          return ThemeProvider(isDarkTheme,
              requireLogin); //??Here we tell ThemeProvider darkTheme read at startup, we need the same for LoginRequired to adjust widget
        },
      ),
    );
  });
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //TODO: Use the provider to select the shared preferences
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        print("MyApp Read requireLogin $_requireLogin");
        /*_requireLogin == true
            ? _initialRoute = '/login'
            : _initialRoute = '/home';*/
        _initialRoute = '/login';
        return MaterialApp(
          theme: themeProvider.getTheme,
          debugShowCheckedModeBanner: false,
          initialRoute: _initialRoute, //'/welcome',
          routes: {
            LoginPage.id: (context) => LoginPage(),
            HomePage.id: (context) => HomePage(),
            SettingsPage.id: (context) => SettingsPage(),
          },
        );
      },
    );
  }
}
