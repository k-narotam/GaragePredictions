import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart'; //May migrate to use get later
import 'package:provider/provider.dart';
import 'package:theme_manager/theme.dart';
import '../constants.dart';
import '../screens/check_future_page.dart';
import '../screens/profile_page.dart';
import '../screens/home_page.dart';
import '../screens/nav_drawer.dart';

import '../user.dart';

class RegisterPage extends StatelessWidget {
  final GlobalKey<FormFieldState> formFieldKey = GlobalKey();
  static const String id = '/register';
  int code = -1;
  bool validCode = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // No appbar until logged in
      appBar: AppBar(
        title: Text("Register"),
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
                    "Confirm your Email",
                    // style: Theme.of(context).textTheme.headline4.copyWith(
                    //     color: Colors.white, fontWeight: FontWeight.bold),
                    style: Theme.of(context)
                        .textTheme
                        .headline4
                        .copyWith(fontWeight: FontWeight.bold),
                  ),
                  Text(
                      "We sent a code to your email! Please enter the code below"),
                  SizedBox(width: 50.0, height: 35.0),
                  //Spacer(flex: 1), // 1/6
                  TextFormField(
                      key: formFieldKey,
                      controller: myController,
                      decoration: InputDecoration(
                        // filled: true,
                        // fillColor: Color(0xFF1C2341),
                        hintText: "Code (6 digits)",
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(12)),
                        ),
                      ),
                      validator: (value) {
                        if (value.isEmpty ||
                            !isNumeric(value) ||
                            value.length != 6) {
                          return "Code must be a 6 digit int.";
                        } else if (int.parse(value) != 1) {
                          return "Incorrect code, try again";
                        }
                        return null;
                      }),
                  SizedBox(width: 30.0, height: 35.0),
                  //Spacer(flex: 1), // 1/6
                  InkWell(
                    //onTap: () => Get.to(InputPage()),
                    // onTap: () => Get.to(InputPage()),
                    onTap: () {
                      formFieldKey.currentState.validate();
                      try {
                        code = int.parse(myController.text);
                      } catch (error) {
                        validCode = false;
                        print(error);
                        print("Error");
                      }
                      print("Button pressed. Code = $code");
                      if ((validCode) && (code == 1)) {
                        ProfilePage.setName("Temp");
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            //builder: (context) => SettingsPage(title: 'Settings'),
                            builder: (context) => HomePage(),
                          ),
                        );
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
                        "Verify",
                        style: Theme.of(context)
                            .textTheme
                            .button
                            .copyWith(color: Colors.black),
                      ),
                    ),
                  ),
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
                        "Change Account Information",
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
