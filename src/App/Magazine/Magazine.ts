import * as b from '../Bullet'
import event from '../Event'

export default abstract class Magazine
{
  protected abstract name: string
  protected max: number = 6
  protected stock: b.Bullet[] = []

  getName(): string {
    return this.name
  }

  getStockCapacity(): number {
    return this.max
  }

  getStockCount(): number {
    return this.stock.length
  }

  pushBullet(bullet: b.Bullet): boolean {
    if (this.stock.length >= this.max) {
        return false
    }

    this.stock.push(bullet)

    return true
  }

  pullBullet(): b.Bullet | undefined {
    return this.stock.shift()
  }

  fullLoad(bulletGenerator: () => b.Bullet): void {
    for (let i = 0; i < this.max; i ++) {
      if (this.pushBullet(bulletGenerator()) === false) {
        break
      }
    }

    event.emit('Magazine.FulLoad.Success', { magazine: this, bullet: bulletGenerator() })
  }
}
