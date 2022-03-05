//TOTO: Make this class a changenotifier
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'constants.dart';
import 'package:google_fonts/google_fonts.dart';

class ThemeProvider extends ChangeNotifier{

  ThemeData _selectedTheme;
  bool _requireLogin;

  ThemeData light = ThemeData.light().copyWith(
    primaryColor: kPrimaryColor,
    scaffoldBackgroundColor: Colors.white,
    iconTheme: IconThemeData(color: kContentColorLightTheme),
    colorScheme: ColorScheme.light(
      primary: kPrimaryColor,
      secondary: kSecondaryColor,
      error: kErrorColor,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        primary: kPrimaryColor,
        // padding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        // textStyle: TextStyle(
        //     fontSize: 30,
        //     fontWeight: FontWeight.bold)
      ),
      // style: ElevatedButton.styleFrom(
      //   primary:  kPrimaryColor, // buttonColor: kPrimaryColor,     //  <-- dark color
      //   // textTheme: ButtonTextTheme.primary, //  <-- this auto selects the right color
      // //
      // ),

    ),

  );

  ThemeData dark = ThemeData.dark().copyWith(
    primaryColor: kPrimaryColor,
    scaffoldBackgroundColor: kContentColorLightTheme,
    iconTheme: IconThemeData(color: kContentColorDarkTheme),
    colorScheme: ColorScheme.dark(
      primary: kPrimaryColor,
      secondary: kSecondaryColor,
      error: kErrorColor,
    ),
    buttonTheme: ButtonThemeData(
      buttonColor: kPrimaryColor,     //  <-- dark color
      textTheme: ButtonTextTheme.primary, //  <-- this auto selects the right color
    ),
  );
  // final appBarTheme = AppBarTheme(centerTitle: false, elevation: 0);


  //Added variable to constructer to also stash the requirelogin mode
  ThemeProvider(bool darkThemeOn, bool requireLogin) {
    _selectedTheme = darkThemeOn ? dark : light;
    _requireLogin = requireLogin;
  }

  ThemeData get getTheme => _selectedTheme;

  //Need a new method to return isDarkMode as a bool
  bool isDarkMode(){
    if (_selectedTheme == dark) {
      return true;
    } else {
      return false;
    }
  }

  //Need a new method to return isLoginRequired as a bool
  bool isLoginRequired(){
    if (_requireLogin == true) {
      print('Themeprovider returning $_requireLogin');
      return true;
    } else {
      return false;
    }
  }

  Future<void> swapTheme() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (_selectedTheme == dark) {
      _selectedTheme = light;
      prefs.setBool("isDarkTheme",false);
      print("saving dark theme false");
    } else {
      _selectedTheme = dark;
      prefs.setBool("isDarkTheme",true);
      print("saving dark theme true");
    }
    notifyListeners();
  }

  Future<void> setDark() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool("isDarkTheme",true);
    print("saving dark theme true");
    bool savedvalue = prefs.getBool("isDarkTheme");
    print("Saved $savedvalue");
    _selectedTheme = dark;
    notifyListeners();
  }

  Future<void> setLight() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool("isDarkTheme",false);
    print("saving dark theme false");
    bool savedvalue = prefs.getBool("isDarkTheme");
    print("Saved $savedvalue");
    _selectedTheme = light;
    notifyListeners();
  }

  //TODO add function to store requireLogin, could refactor to be just one method
  Future<void> requireLogin() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool("requireLogin",true);
    print("saving require login true");
    bool savedvalue = prefs.getBool("requireLogin");
    print("Saved $savedvalue");
    _requireLogin = true;
    //no need notifyListeners();
  }

  Future<void> noLogin() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool("requireLogin",false);
    print("saving require login false");
    bool savedvalue = prefs.getBool("requireLogin");
    print("Saved $savedvalue");
    _requireLogin = false;
    //no need notifyListeners();
  }

}