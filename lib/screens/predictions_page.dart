import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:theme_manager/screens/GarageData.dart';
import '../screens/nav_drawer.dart';
import '../constants.dart';
import 'package:http/http.dart' as http;
import 'dart:async';

import 'graph_page.dart';
import 'home_page.dart';
import '../theme.dart';
import 'package:provider/provider.dart';

class PredictionsPage extends StatefulWidget {
  @override
  _PredictionsPageState createState() => _PredictionsPageState();
}

class _PredictionsPageState extends State<PredictionsPage> {
  void initState() {
    super.initState();
    garageValue = "a";
    selectedValue = "1";
    //WidgetsBinding.instance.addPostFrameCallback((_) => fetchFavorites());
  }

  String selectedValue;
  String garageValue = "a";
  List<DropdownMenuItem<String>> get dropdownItems {
    List<DropdownMenuItem<String>> menuItems = [
      DropdownMenuItem(child: Text("Sunday"), value: "0"),
      DropdownMenuItem(child: Text("Monday"), value: "1"),
      DropdownMenuItem(child: Text("Tuesday"), value: "2"),
      DropdownMenuItem(child: Text("Wednesday"), value: "3"),
      DropdownMenuItem(child: Text("Thursday"), value: "4"),
      DropdownMenuItem(child: Text("Friday"), value: "5"),
      DropdownMenuItem(child: Text("Saturday"), value: "6"),
    ];
    return menuItems;
  }

  List<DropdownMenuItem<String>> get dropdownGarages {
    List<DropdownMenuItem<String>> menuItems = [
      DropdownMenuItem(child: Text("Garage A"), value: "a"),
      //DropdownMenuItem(child: Text("Garage B"), value: "b"),
      DropdownMenuItem(child: Text("Garage C"), value: "c"),
      DropdownMenuItem(child: Text("Garage D"), value: "d"),
      DropdownMenuItem(child: Text("Garage I"), value: "i"),
      DropdownMenuItem(child: Text("Libra"), value: "l"),
    ];
    return menuItems;
  }

  /* String dayToDay(String day) {
    List<String> days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    List<String> shortDays = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];

    return days[int.parse(day)];
  }*/

  int maxSpots(String garage) {
    if (garage == "a") {
      return 1623;
    } else if (garage == "b") {
      return 1259;
    } else if (garage == "c") {
      return 1852;
    } else if (garage == "d") {
      return 1900;
    } else if (garage == "h") {
      return 1284;
    } else if (garage == "i") {
      return 1231;
    }
    return 1007;
  }

  List<GarageData> data;
  Future<int> trends() async {
    try {
      final http.Response answer = await http
          .post(
            Uri.parse(dotenv.env['root'] + "trend"),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode(<String, dynamic>{
              'garage_id': garageValue,
              'day': int.parse(selectedValue)
            }),
          )
          .timeout(Duration(seconds: 10));
      Map<String, dynamic> output = jsonDecode(answer.body);
      print("Succesfully posted! Received " + output.toString());
      data = <GarageData>[];
      int i = 0;
      List<dynamic> myList = output["predictions"];
      int max = maxSpots(garageValue);
      while (i < output["predictions"].length) {
        print("Accessing index " + i.toString());
        data.add(
            new GarageData(i, maximum(max - myList.elementAt(i).toInt(), 0)));
        i++;
      }
      return 0;
    } catch (e) {
      print(e);
    }
    return 1;
  }

  int maximum(int a, int b) {
    if (a > b) {
      return a;
    }
    return b;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Garage Predictions"),
        backgroundColor: kPrimaryColor,
        centerTitle: true,
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
          Container(
            padding: EdgeInsets.all(15.0),
            child: Text(
              'Trends',
              // style: kTitleTextStyle,
            ),
          ),
          Container(
              padding: EdgeInsets.all(15.0),
              child: Text(
                'Please select a garage and day.',
                textAlign: TextAlign.center,
                // style: kTitleTextStyle,
              )),
          DropdownButton(
              value: selectedValue,
              onChanged: (String newValue) {
                setState(() {
                  selectedValue = newValue;
                });
              },
              items: dropdownItems),
          DropdownButton(
              value: garageValue,
              onChanged: (String newValue) {
                setState(() {
                  garageValue = newValue;
                });
              },
              items: dropdownGarages),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () async {
              // Call trend api, process data, and insert into data. Then send to the graph page
              print("Pressed button!");
              print("Garage id is " + garageValue);
              print("Day is " + selectedValue);
              await trends();
              print("Done!");

              /*List<GarageData> data = [
                  new GarageData(0, 5),
                  new GarageData(1, 25),
                  new GarageData(2, 100),
                  new GarageData(3, 75),
                ];*/
              String tmp = garageValue;
              if (garageValue == "l") {
                tmp = "Libra";
              } else {
                tmp = "Garage " + garageValue.toUpperCase();
              }
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          GraphPage(data, garageValue, selectedValue)));
            },
            child: Text('Predict!'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Home'),
          ),
          // ],
          // ),
        ],
      ),
    );
  }
}
