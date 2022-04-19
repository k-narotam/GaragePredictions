import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart'; //May migrate to use get later
import 'package:provider/provider.dart';
import 'package:theme_manager/theme.dart';
import '../constants.dart';
import '../screens/home_page.dart';
import '../screens/nav_drawer.dart';

import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

class ForgotPasswordPage extends StatefulWidget {
  static const String id = '/forgot_password';

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final GlobalKey<FormFieldState> formFieldKey = GlobalKey<FormFieldState>();

  int code = -1;

  String email = "";

  bool validCode = true;

  bool isEmailValid(String email) {
    // Source for regex: https://stackoverflow.com/a/61512807
    bool emailValid = RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(email);
    print("Outcome is " + emailValid.toString());
    return emailValid;
  }

  Future<int> sendEmail(String email) async {
    print("Sending email");
    try {
      final http.Response answer = await http
          .post(Uri.parse(dotenv.env['root'] + "send_recovery"),
              headers: <String, String>{
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: jsonEncode(<String, dynamic>{'email': email}))
          .timeout(Duration(seconds: 10));
      Map<String, dynamic> output = jsonDecode(answer.body);

      if (output["error"] == "") {
        print("Sending email!");
        //await fetchFavorites();
        // Success
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
              padding: const EdgeInsets.symmetric(horizontal: kDefaultPadding),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(width: 50.0, height: 35.0),
                  //Spacer(flex: 1), //2/6
                  Text(
                    "Please enter your email",
                    // style: Theme.of(context).textTheme.headline4.copyWith(
                    //     color: Colors.white, fontWeight: FontWeight.bold),
                    style: Theme.of(context)
                        .textTheme
                        .headline4
                        .copyWith(fontWeight: FontWeight.bold),
                  ),
                  Text("We will send you a link to reset your password."),
                  SizedBox(width: 50.0, height: 35.0),
                  //Spacer(flex: 1), // 1/6
                  TextFormField(
                      key: formFieldKey,
                      controller: myController,
                      decoration: InputDecoration(
                        // filled: true,
                        // fillColor: Color(0xFF1C2341),
                        hintText: "Email",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(12)),
                        ),
                      ),
                      validator: (value) {
                        print("Validating. Email is " + value);
                        if (isEmailValid(value) == false) {
                          return "Must be a valid email.";
                        }
                        return null;
                      }),

                  SizedBox(width: 30.0, height: 35.0),

                  //Spacer(flex: 1), // 1/6
                  InkWell(
                    //onTap: () => Get.to(InputPage()),
                    // onTap: () => Get.to(InputPage()),
                    onTap: () async {
                      if (formFieldKey.currentState.validate() == true) {
                        print("Trying to send");
                        // Proceed
                        if (await sendEmail(myController.text) == 0) {
                          print("Sent successfully");
                          Navigator.pop(context);
                        }
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
                        "Send email",
                        style: Theme.of(context)
                            .textTheme
                            .button
                            .copyWith(color: Colors.black),
                      ),
                    ),
                  ),
                  SizedBox(width: 30.0, height: 35.0),
                  InkWell(
                    onTap: () {
                      Navigator.pop(context);
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
                        "Remember your password? Return to login",
                        style: Theme.of(context)
                            .textTheme
                            .button
                            .copyWith(color: Colors.black),
                      ),
                    ),
                  ),
                  Spacer(flex: 2), // it will take 2/6 spaces
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  final myController = TextEditingController();

  final passwordController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    //super.dispose();
  }
}

bool isNumeric(String s) {
  if (s == null) {
    return false;
  }
  return double.parse(s, (e) => null) != null;
}
