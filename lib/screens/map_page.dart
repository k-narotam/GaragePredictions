import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import "package:latlong2/latlong.dart" as latLng;
import 'package:theme_manager/screens/nav_drawer.dart';
import '../constants.dart';
import '../theme.dart';
import 'package:provider/provider.dart';

class MapPage extends StatelessWidget {
  MapPage();
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
        body: new FlutterMap(
          options: MapOptions(
              center: latLng.LatLng(28.6, -81.2), zoom: 15.0, maxZoom: 18.0),
          layers: [
            TileLayerOptions(
              urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              subdomains: ['a', 'b', 'c'],
              attributionBuilder: (_) {
                return Text("");
              },
            ),
            MarkerLayerOptions(
              markers: [
                Marker(
                  width: 80.0,
                  height: 80.0,
                  point: latLng.LatLng(51.5, -0.09),
                  builder: (ctx) => Container(
                    child: FlutterLogo(),
                  ),
                ),
              ],
            ),
          ],
        ));
  }
}
