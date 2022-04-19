import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart'; //May migrate to use get later
import 'package:provider/provider.dart';
import 'package:theme_manager/screens/settings_page.dart';
import 'package:theme_manager/theme.dart';
import '../constants.dart';
import '../screens/register_page.dart';
import '../screens/home_page.dart';
import '../screens/nav_drawer.dart';
import '../screens/forgot_password_page.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class LoginPage extends StatefulWidget {
  static const String id = '/login';
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  String password = "";
  String email;

  final myController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    //super.dispose();
  }

  bool isEmailValid(String email) {
    Pattern pattern =
        /*r*/ '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\$'; // unescape the $
    RegExp regex = new RegExp(pattern);
    return regex.hasMatch(email);
  }

  Future<int> login(String email, String password) async {
    try {
      final http.Response answer = await http
          .post(
            Uri.parse(dotenv.env['root'] + "login"),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode(
                <String, dynamic>{'email': email, 'password': password}),
          )
          .timeout(Duration(seconds: 10));
      Map<String, dynamic> output = jsonDecode(answer.body);

      if (output["error"] == "") {
        print("Logged in!");
        String rawCookie = answer.headers['set-cookie'];
        String cookie = "";
        if (rawCookie != null) {
          int index = rawCookie.indexOf(';');
          cookie = (index == -1) ? rawCookie : rawCookie.substring(0, index);
        }
        print("Fetched cookie");
        //await fetchFavorites();
        // Success
        SettingsPage.cookie = cookie;
        Navigator.push(
          context,
          MaterialPageRoute(
            //builder: (context) => SettingsPage(title: 'Settings'),
            builder: (context) => HomePage(),
          ),
        );
        return 0;
      } else {
        print(output["error"]);
        return 1;
      }
    } catch (e) {
      print("Caught exception");
      print(e.toString());
      return 1;
    }
  }

  Future<int> register(String email, String password) async {
    try {
      final http.Response answer = await http
          .post(
            Uri.parse(dotenv.env['root'] + "register"),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode(
                <String, dynamic>{'email': email, 'password': password}),
          )
          .timeout(Duration(seconds: 5));
      Map<String, dynamic> output = jsonDecode(answer.body);
      if (output["error"] == "") {
        // Success
        return 0;
      } else {
        print(output["error"]);
        return 1;
      }
    } catch (e) {
      print(e.toString());
      return 1;
    }
    return 1;
  }

  Widget build(BuildContext context) {
    return new WillPopScope(
        onWillPop: () async => Future.value(false),
        child: Scaffold(
          resizeToAvoidBottomInset: false,
          // No appbar until logged in
          appBar: AppBar(
            title: Text("Garage Predictions"),
            backgroundColor: kPrimaryColor,
            centerTitle: true,
            leading: IconButton(
              icon: Icon(Icons.menu),
              onPressed: () {
                print('menu');
              },
            ),
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
          drawer: NavDrawer(),
          body: Stack(
            children: [
              // SvgPicture.asset("assets/icons/bg.svg", fit: BoxFit.fill),
              SafeArea(
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: kDefaultPadding),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(width: 50.0, height: 35.0),
                      //Spacer(flex: 1), //2/6
                      Text(
                        "Garage Predictions",
                        // style: Theme.of(context).textTheme.headline4.copyWith(
                        //     color: Colors.white, fontWeight: FontWeight.bold),
                        style: Theme.of(context)
                            .textTheme
                            .headline4
                            .copyWith(fontWeight: FontWeight.bold),
                      ),
                      Text("Enter your Email and password to login below"),
                      SizedBox(width: 50.0, height: 35.0),
                      //Spacer(flex: 1), // 1/6
                      TextField(
                        controller: myController,
                        decoration: InputDecoration(
                          // filled: true,
                          // fillColor: Color(0xFF1C2341),
                          hintText: "Email",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(12)),
                          ),
                        ),
                      ),
                      SizedBox(width: 30.0, height: 10.0),
                      TextField(
                        controller: passwordController,
                        obscureText: true,
                        decoration: InputDecoration(
                          // filled: true,
                          // fillColor: Color(0xFF1C2341),
                          hintText: "Password",
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
                          email = myController.text;
                          password = passwordController.text;
                          print("Email: $email");
                          print("Password: $password");
                          if (email != null && password != null) {
                            await login(email, password);
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
                            "Login",
                            style: Theme.of(context)
                                .textTheme
                                .button
                                .copyWith(color: Colors.black),
                          ),
                        ),
                      ),
                      SizedBox(width: 50.0, height: 10.0),
                      InkWell(
                        //onTap: () => Get.to(InputPage()),
                        // onTap: () => Get.to(InputPage()),
                        onTap: () async {
                          // Call register
                          email = myController.text;
                          password = passwordController.text;
                          print("Email: $email");
                          print("Password: $password");
                          //name = myController.text;
                          //ProfilePage.setName(name);
                          await register(email, password);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              //builder: (context) => SettingsPage(title: 'Settings'),
                              builder: (context) =>
                                  RegisterPage(email, password),
                            ),
                          );
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
                            "Register",
                            style: Theme.of(context)
                                .textTheme
                                .button
                                .copyWith(color: Colors.black),
                          ),
                        ),
                      ),
                      SizedBox(width: 30.0, height: 10.0),
                      //Spacer(flex: 1), // 1/6
                      InkWell(
                        //onTap: () => Get.to(InputPage()),
                        // onTap: () => Get.to(InputPage()),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              //builder: (context) => SettingsPage(title: 'Settings'),
                              builder: (context) => ForgotPasswordPage(),
                            ),
                          );
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
                            "Forgot Password",
                            style: Theme.of(context)
                                .textTheme
                                .button
                                .copyWith(color: Colors.black),
                          ),
                        ),
                      ),
                      // it will take 2/6 spaces
                    ],
                  ),
                ),
              ),
            ],
          ),
        ));
  }
}
