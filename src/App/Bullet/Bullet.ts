export default abstract class Bullet
{
  protected abstract name: string;

  getName(): string {
    return this.name
  }
}
