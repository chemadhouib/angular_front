import { User } from './user.model';

export class CarPoolTrip {
  constructor(
    public id = 0,
    public departure = '',
    public arrival = '',
    public date = new Date(),
    public duration = 0,
    public availableSeats = 0,
    public totalSeats = 0,
    public luggageType = '',
    public petsAllowed = false,
    public smokingAllowed = false,
    public price = 0,
    public driver: User = null,
    public passengers: User[] = null
  ) {}
}
