export class User {
  constructor(
    public id = 0,
    public firstName = '',
    public lastName = '',
    public phoneNumber = '',
    public address = '',
    public email = '',
    public password = '',
    public rate = 0,
    public isActive = true,
    public isDrivingLicenseVerified = false,
    public comments = [],
    public rateCount = 0,
    public gender = ''
  ) {}
}
