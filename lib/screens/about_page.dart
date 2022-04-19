import 'package:flutter/material.dart';
import '../constants.dart';
import '../theme.dart';
import 'package:provider/provider.dart';

class AboutPage extends StatelessWidget {
  AboutPage();
  @override
  Widget build(BuildContext context) {
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
            child: Text(
              'About Page',
              // style: kTitleTextStyle,
            ),
          ),
          Container(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'We hope our app has been helpful in predicting UCF garage capacity! We aim to help you plan accordingly where to park based on the days you need to attend campus. This helps save time knowing the specific garage to head to upon arrival. We also offer mobile app support and continuously strive to improve our features. We would love to hear your insights and how you use our app! We are Group 17, Super Amazing Garage Predictions!',
                textAlign: TextAlign.center,
                // style: kTitleTextStyle,
              )),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Close Page'),
          ),
        ],
      ),
    );
  }
}
