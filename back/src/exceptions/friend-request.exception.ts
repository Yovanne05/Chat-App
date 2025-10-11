export class FriendRequestNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Demande d'ami introuvable: ${identifier}`);
    this.name = "FriendRequestNotFoundException";
  }
}

export class FriendRequestActionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FriendRequestActionException";
  }
}
