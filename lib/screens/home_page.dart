import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:theme_manager/screens/settings_page.dart';
import '../constants.dart';
import '../screens/nav_drawer.dart';
import '../screens/predictions_page.dart';

import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

import '../theme.dart';

class HomePage extends StatefulWidget {
  static const String id = '/home';
  HomePage();

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  void initState() {
    super.initState();
    print("Calling get Status");
    //WidgetsBinding.instance.addPostFrameCallback((_) => fetchFavorites());
    this.calledFavorites = false;
    this.calledStatus = false;
    WidgetsBinding.instance.addPostFrameCallback((_) => getStatus());
  }

  Future<String> fetchFavorites() async {
    try {
      final http.Response answer = await http.post(
          Uri.parse(dotenv.env['root'] + "list_favorites"),
          headers: <String, String>{
            'cookie': SettingsPage.cookie,
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: jsonEncode(<String, dynamic>{"garage_id": ""}));
      //print("Sent successfully. " + answer.body);
      Map<String, dynamic> output = jsonDecode(answer.body);
      //print("Received value " + output.toString());
      int i = 0;
      while (i < output["favorites"].length) {
        favoriteGarages.add(output["favorites"][i]["garage_id"]);
        favoriteStatus.add(output["favorites"][i]["garage_fullness"]);
        favoriteDays.add(output["favorites"][i]["weekday"]);
        favoriteHours.add(getHour(output["favorites"][i]["time"].toString()));
        i++;
      }

      return output.toString();
    } catch (e) {
      print("Caught exception");
      print(e.toString());
    }
    return "Sorry, no data received";
  }

  String getHour(var myHour) {
    print("My hour is " + myHour);
    int hourInt = int.parse(myHour);
    if (hourInt == 0) {
      return "12 AM";
    }
    if (hourInt <= 12) {
      return hourInt.toString() + " AM";
    }
    return (hourInt -= 12).toString() + " PM";
  }

  Future<String> status() async {
    try {
      final http.Response answer = await http.post(
          Uri.parse(dotenv.env['root'] + "status"),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          });
      //print("Sent successfully. " + answer.body);
      Map<String, dynamic> output = jsonDecode(answer.body);
      //print("Received listfavorites value " + output.toString());
      //setState(() {});
      garages = <String>[];
      garageIDs = <String>[];
      garages.add(output["data"][0]["spaces_avail"]);
      garages.add(output["data"][1]["spaces_avail"]);
      garages.add(output["data"][2]["spaces_avail"]);
      garages.add(output["data"][3]["spaces_avail"]);
      garages.add(output["data"][4]["spaces_avail"]);
      garages.add(output["data"][5]["spaces_avail"]);
      garages.add(output["data"][6]["spaces_avail"]);

      garageIDs.add(output["data"][0]["id"]);
      garageIDs.add(output["data"][1]["id"]);
      garageIDs.add(output["data"][2]["id"]);
      garageIDs.add(output["data"][3]["id"]);
      garageIDs.add(output["data"][4]["id"]);
      garageIDs.add(output["data"][5]["id"]);
      garageIDs.add(output["data"][6]["id"]);

      return output.toString();
    } catch (e) {
      print("Caught exception");
      print(e.toString());
    }
    //setState(() {});
    return "Sorry, no data received";
  }

  List<String> garages;
  List<String> garageIDs;
  bool calledStatus = false;
  String currentString = "";
  String favoriteString = "";
  List<String> favoriteGarages;
  List<num> favoriteStatus;
  List<String> favoriteDays;
  List<String> favoriteHours;
  bool calledFavorites = false;

  getStatus() async {
    print("Getting status");
    if (garages == null && calledStatus == false) {
      // Get status only once
      calledStatus = true;
      await status();
      String myStr = "";
      int index = 0;
      while (index < garages.length) {
        myStr += garageIDs.elementAt(index).toUpperCase() +
            ": " +
            garages.elementAt(index) +
            "\n";
        index++;
      }
      currentString = myStr;
      //print("Current string = " + currentString);
      setState(() {});
    }
    if (favoriteGarages == null && calledFavorites == false) {
      print("Time to fetch favorites again");
      calledFavorites = true;
      favoriteGarages = <String>[];
      favoriteStatus = <num>[];
      favoriteDays = <String>[];
      favoriteHours = <String>[];
      await fetchFavorites();
      String myStr = "";
      int index = 0;
      //print("Done fetching.");
      myStr = "Garage  \tDay      \t% Full\n";
      while (index < favoriteGarages.length) {
        print("Status: " + favoriteStatus.elementAt(index).toString());
        myStr += "Garage " +
            favoriteGarages.elementAt(index).toUpperCase() +
            " " +
            toDay(favoriteDays.elementAt(index)) +
            " at " +
            favoriteHours.elementAt(index) +
            ": " +
            (favoriteStatus.elementAt(index) * 100).toStringAsFixed(2) +
            "%\n";
        print(myStr);
        index++;
      }
      favoriteString = myStr;
      setState(() {});
    }
  }

  String toDay(String day) {
    switch (day) {
      case "mon":
        return "Monday";
      case "tue":
        return "Tuesday";
      case "wed":
        return "Wednesday";
      case "thu":
      case "thr":
        return "Thursday";
      case "fri":
        return "Friday";
      case "sat":
        return "Saturday";
      case "sun":
        return "Sunday";
      default:
        return "Invalid day";
    }
  }

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
      drawer: NavDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          SizedBox(width: 50.0, height: 35.0),
          /*Image(
              image: AssetImage('images/living_centerline.gif'),
              height: 100,
              width: 100),*/
          Container(
            padding: EdgeInsets.all(10.0),
            child: Text(
              'Current Availability',
              textAlign: TextAlign.center,
              textScaleFactor: 3.0,
              // style: kTitleTextStyle,
            ),
          ),
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              currentString,
              textAlign: TextAlign.center,
              // style: kTitleTextStyle,
            ),
          ),
          /*Image(
              image: AssetImage('images/living_centerline.gif'),
              height: 100,
              width: 100),*/
          Container(
            padding: EdgeInsets.all(10.0),
            child: Text(
              'Favorites',
              textAlign: TextAlign.center,
              textScaleFactor: 3.0,
              // style: kTitleTextStyle,
            ),
          ),
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              favoriteString,
              //fetchFavorites().toString(),
              textAlign: TextAlign.center,
              // style: kTitleTextStyle,
            ),
          ),
          SizedBox(width: 50.0, height: 3.0),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              this.calledStatus = false;
              this.calledFavorites = false;
              this.garages = null;
              this.favoriteGarages = null;
              setState(() {});
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => PredictionsPage()));
            },
            child: Text('Check Future Page'),
          )
        ],
      ),
    );
  }
}
