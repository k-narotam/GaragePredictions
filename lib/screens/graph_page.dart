import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:theme_manager/constants.dart';
import 'package:theme_manager/screens/GarageData.dart';
import 'package:theme_manager/screens/nav_drawer.dart';
import 'package:provider/provider.dart';
import '../../../screens/settings_page.dart'; //Needed here if we enabled on page quick settings change, disabled for now
import '../../../screens/nav_drawer.dart';
import '../../../constants.dart';
import 'package:charts_flutter/flutter.dart' as charts;

import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

import 'home_page.dart';
import '../theme.dart';
import 'package:provider/provider.dart';

class GraphPage extends StatefulWidget {
  GraphPage(this.data, this.garageid, this.day);
  final myController = TextEditingController();
  final GlobalKey<FormFieldState> formFieldKey = GlobalKey();
  String garageid;
  final String day;
  final List<GarageData>
      data; /*= [
    new GarageData(0, 5),
    new GarageData(1, 25),
    new GarageData(2, 100),
    new GarageData(3, 75),
  ];*/
  @override
  _GraphPageState createState() => _GraphPageState();
}

class _GraphPageState extends State<GraphPage> {
  String selectedValue;
  String garageValue;

  String intToDay(String day) {
    List<String> days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return days[int.parse(day)];
  }

  String intToShortDay(String day) {
    List<String> days = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];
    return days[int.parse(day)];
  }

  @override
  Widget build(BuildContext context) {
    List<charts.Series<GarageData, num>> series = [
      charts.Series(
          id: "Garage Data",
          data: widget.data,
          domainFn: (GarageData series, _) => series.hour,
          measureFn: (GarageData series, _) => series.available,
          colorFn: (GarageData series, _) =>
              charts.ColorUtil.fromDartColor(Colors.blue))
    ];

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
          Text(
            'Predictions for ' +
                (widget.garageid == "l"
                    ? "Libra"
                    : "Garage " + widget.garageid.toUpperCase()) +
                ' on ' +
                intToDay(widget.day),
            textAlign: TextAlign.center,
            textScaleFactor: 2.0,
            // style: kTitleTextStyle,
          ),
          ConstrainedBox(
            constraints: BoxConstraints.expand(
                height: 200.0), // give the height according to you
            child: charts.LineChart(
              series,
              animate: false,
              domainAxis: const charts.NumericAxisSpec(
                tickProviderSpec:
                    charts.BasicNumericTickProviderSpec(zeroBound: true),
                viewport: charts.NumericExtents(0, 23),
              ),
            ), // your chart here
          ),
          SizedBox(width: 30.0, height: 10.0),
          TextFormField(
            key: widget.formFieldKey,
            controller: widget.myController,
            decoration: InputDecoration(
              // filled: true,
              // fillColor: Color(0xFF1C2341),
              hintText: "Add Favorite Hour (0-23)",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(12)),
              ),
            ),
            validator: (value) {
              try {
                int hour = int.parse(value);
                if (hour >= 0 && hour <= 23) {
                  return "";
                }
                return "Must enter a valid hour from 0 to 23";
              } catch (e) {
                return "Must enter a valid hour from 0 to 23";
              }
            },
          ),
          InkWell(
            //onTap: () => Get.to(InputPage()),
            // onTap: () => Get.to(InputPage()),
            onTap: () async {
              // Call login
              widget.formFieldKey.currentState.validate();
              String favoriteHour = widget.myController.text;
              print("Favorite hour: $favoriteHour");
              try {
                int hour = int.parse(favoriteHour);
                if (hour <= 23 && hour >= 0) {
                  await addFavorite(widget.garageid, widget.day, hour);
                }
                if (favoriteHour != null) {
                  widget.myController.clear();
                } else {
                  print("Empty email or password");
                }
                widget.myController.clear();
              } catch (e) {
                print(e);
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
                "Add Favorite",
                style: Theme.of(context)
                    .textTheme
                    .button
                    .copyWith(color: Colors.black),
              ),
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: kPrimaryColor,
            ),
            onPressed: () {
              //Navigator.pushNamed(context, '/');
              Navigator.pop(context);
            },
            child: Text('Back'),
          ),
          // ],
          // ),
        ],
      ),
    );
  }

  Future<String> addFavorite(String garage, String day, num hour) async {
    try {
      print("Awaiting response");
      print("Weekday:" + intToShortDay(day));
      print("Garage: " + garage);
      print("Hour:" + hour.toString());
      final http.Response answer = await http.post(
          Uri.parse(dotenv.env['root'] + "add_favorite"),
          headers: <String, String>{
            'cookie': SettingsPage.cookie,
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: jsonEncode(<String, dynamic>{
            'garage_id': garage,
            "weekday": intToShortDay(day),
            "time": hour
          }));
      print("Sent successfully. " + answer.body);
      Map<String, dynamic> output = jsonDecode(answer.body);
      print("Received value " + output.toString());
      print("Done adding favorite");
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => HomePage()));
      return output.toString();
    } catch (e) {
      print("Caught exception");
      print(e.toString());
    }
    return "Sorry, no data received";
  }
}
