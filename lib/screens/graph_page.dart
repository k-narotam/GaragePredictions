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

class GraphPage extends StatefulWidget {
  GraphPage(this.data, this.garageid, this.day);
  final String garageid;
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
  /// Create one series with sample hard coded data.
  List<charts.Series<GarageData, int>> _createSampleData() {
    return [
      new charts.Series<GarageData, int>(
        id: 'Sales',
        colorFn: (_, __) => charts.MaterialPalette.blue.shadeDefault,
        domainFn: (GarageData sales, _) => sales.hour,
        measureFn: (GarageData sales, _) => sales.available,
        data: widget.data,
      )
    ];
  }

  String selectedValue;
  String garageValue;

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
        title: Text("Garage Predictor"),
        backgroundColor: kPrimaryColor,
        centerTitle: true,
      ),
      drawer: NavDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Text(
            'Predictions for ' + widget.garageid + ' on ' + widget.day,
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
}
