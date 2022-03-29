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
import 'dart:collection';

class CheckFuturePage extends StatefulWidget {
  @override
  _CheckFuturePageState createState() => _CheckFuturePageState();
}

class _CheckFuturePageState extends State<CheckFuturePage> {
  DateTime kFirstDay = DateTime.utc(2010, 10, 16);
  DateTime kLastDay = DateTime.utc(2030, 3, 14);
  int selectedValue = 1;

  // Using a `LinkedHashSet` is recommended due to equality comparison override
  final Set<DateTime> _selectedDays = SplayTreeSet<DateTime>();

  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      _focusedDay = focusedDay;
      // Update values in a Set
      if (_selectedDays.contains(selectedDay)) {
        _selectedDays.remove(selectedDay);
      } else {
        _selectedDays.add(selectedDay);
      }
      print("Days selected" + _selectedDays.toString());
    });
  }

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
            headerStyle: HeaderStyle(formatButtonVisible: false),
            firstDay: kFirstDay,
            lastDay: kLastDay,
            focusedDay: _focusedDay,
            calendarFormat: _calendarFormat,
            selectedDayPredicate: (day) {
              // Use values from Set to mark multiple days as selected
              return _selectedDays.contains(day);
            },
            onDaySelected: _onDaySelected,
            onPageChanged: (focusedDay) {
              _focusedDay = focusedDay;
            },
          ),
          ElevatedButton(
            child: Text('Clear selection'),
            onPressed: () {
              setState(() {
                _selectedDays.clear();
              });
            },
          ),

          DropdownButton(
              value: selectedValue,
              items: [
                DropdownMenuItem(
                  child: Text("Garage A"),
                  value: 1,
                ),
                DropdownMenuItem(
                  child: Text("Garage C"),
                  value: 2,
                ),
                DropdownMenuItem(
                  child: Text("Garage D"),
                  value: 3,
                ),
                DropdownMenuItem(
                  child: Text("Garage H"),
                  value: 4,
                ),
                DropdownMenuItem(
                  child: Text("Garage I"),
                  value: 5,
                ),
                DropdownMenuItem(
                  child: Text("Garage Libra"),
                  value: 6,
                ),
              ],
              onChanged: (value) {
                setState(() {
                  selectedValue = value;
                });
              }),

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
