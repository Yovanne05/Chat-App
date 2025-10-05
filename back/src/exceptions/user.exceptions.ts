export class UserNotFoundException extends Error {
  constructor(identifier: string) {
    super(
      `Utilisateur introuvable avec l'identifiant ou le nom : ${identifier}`
    );
    this.name = "UserNotFoundException";
  }
}

export class FriendshipActionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FriendshipActionException";
  }
}
