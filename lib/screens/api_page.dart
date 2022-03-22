import 'dart:convert';

import 'package:http/http.dart' as http;

mixin Api_Object implements Object {
  var url = '';
  var value = '';

  void apicall() async {
    try {
      final response = await http
          .post(
            Uri.parse(url),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode(<String, dynamic>{'key': value}),
          )
          .timeout(Duration(seconds: 5));
      print(response.body);
      if (response.statusCode == 200) {
        // Do stuff
      }
    } catch (e) {
      print("Error reaching server");
    }
  }
}
