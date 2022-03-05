import 'package:flutter/material.dart';

class User {
  static int created = 0;
  int _id;
  String name;
  String email;

  User(String inName, String inEmail) {
    created++;
    this._id = created;
    this.name = inName;
    this.email = inEmail;
  }

  String getName() {
    return this.name;
  }

  String getEmail() {
    return this.email;
  }
}
