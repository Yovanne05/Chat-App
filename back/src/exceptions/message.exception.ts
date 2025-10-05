export class MessageNotFoundException extends Error {
  constructor(id: string) {
    super(`Aucune conversation ou message trouvé avec l'ID : ${id}`);
    this.name = "MessageNotFoundException";
  }
}
