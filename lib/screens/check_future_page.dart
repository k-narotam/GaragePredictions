import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../screens/results_page.dart';
import 'package:provider/provider.dart';
import '../screens/settings_page.dart'; //Needed here if we enabled on page quick settings change, disabled for now
import '../screens/nav_drawer.dart';
import 'package:theme_manager/calculator_brain.dart';
import 'package:table_calendar/table_calendar.dart';
import '../constants.dart';
import '../user.dart';

class CheckFuturePage extends StatefulWidget {
  @override
  _CheckFuturePageState createState() => _CheckFuturePageState();
}

class _CheckFuturePageState extends State<CheckFuturePage> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();
  DateTime _selectedDay;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Check Future Page"),
        backgroundColor: kPrimaryColor,
        centerTitle: true,
        // leading: IconButton(
        //   icon: Icon(Icons.menu),
        //   onPressed: () {
        //     print('menu');
        //   },
        // ), //disabled menu, using nav drawer
        //actions: <Widget>[  //disabled settings from iconin appBar, use option from Nav drawer
        // IconButton(
        //   icon: Icon(Icons.settings),
        //   onPressed: () {
        //     print('settings');
        //     Navigator.push(
        //       context,
        //       MaterialPageRoute(
        //         //builder: (context) => SettingsPage(title: 'Settings'),
        //         builder: (context) => SettingsPage(),
        //       ),
        //     );
        //   },
        // )
        //],
      ),
      drawer: NavDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          TableCalendar(
            firstDay: DateTime.utc(2010, 10, 16),
            lastDay: DateTime.utc(2030, 3, 14),
            focusedDay: _focusedDay,
            calendarFormat: _calendarFormat,
            selectedDayPredicate: (day) {
              // Use `selectedDayPredicate` to determine which day is currently selected.
              // If this returns true, then `day` will be marked as selected.

              // Using `isSameDay` is recommended to disregard
              // the time-part of compared DateTime objects.
              return isSameDay(_selectedDay, day);
            },
            onDaySelected: (selectedDay, focusedDay) {
              if (!isSameDay(_selectedDay, selectedDay)) {
                // Call `setState()` when updating the selected day
                setState(() {
                  _selectedDay = selectedDay;
                  _focusedDay = focusedDay;
                });
              }
            },
            onFormatChanged: (format) {
              if (_calendarFormat != format) {
                // Call `setState()` when updating calendar format
                setState(() {
                  _calendarFormat = format;
                });
              }
            },
            onPageChanged: (focusedDay) {
              // No need to call `setState()` here
              _focusedDay = focusedDay;
            },
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
