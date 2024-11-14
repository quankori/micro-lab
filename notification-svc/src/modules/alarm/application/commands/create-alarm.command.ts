export class CreateAlarmCommand {
  constructor(
    public name: string,
    public severity: string,
  ) {}
}
