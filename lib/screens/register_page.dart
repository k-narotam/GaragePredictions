import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:theme_manager/theme.dart';
import '../constants.dart';
import '../screens/nav_drawer.dart';

class RegisterPage extends StatefulWidget {
  String password = "";
  String email;
  RegisterPage(String email, String password) {
    this.email = email;
    this.password = password;
    print("Email = " + email);
  }
  RegisterPageState createState() => RegisterPageState();
  static const String id = '/register';
}

class RegisterPageState extends State<RegisterPage> {
  final GlobalKey<FormFieldState> formFieldKey = GlobalKey();
  int code = -1;
  bool validCode = true;

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

  bool isNumeric(String s) {
    if (s == null) {
      return false;
    }
    return double.parse(s, (e) => null) != null;
  }

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
                    "We have sent a confirmation link to your Email!",
                    // style: Theme.of(context).textTheme.headline4.copyWith(
                    //     color: Colors.white, fontWeight: FontWeight.bold),
                    style: Theme.of(context).textTheme.headline4,
                  ),
                  SizedBox(width: 30.0, height: 35.0),
                  Text(
                    "Please confirm your account and return to log in.",
                    // style: Theme.of(context).textTheme.headline4.copyWith(
                    //     color: Colors.white, fontWeight: FontWeight.bold),
                    style: Theme.of(context).textTheme.headline4,
                  ),
                  //Spacer(flex: 1), // 1/6
                  SizedBox(width: 30.0, height: 35.0),
                  //Spacer(flex: 1), // 1/6
                  InkWell(
                    //onTap: () => Get.to(InputPage()),
                    // onTap: () => Get.to(InputPage()),
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
                        "Log In",
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
}
