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

  fullLoad(bulletGenerator: Function): void {
    this.stock = []

    let bullet: b.Bullet

    for (let i = 0; i < this.max; i ++) {
      bullet = bulletGenerator()
      if (this.pushBullet(bulletGenerator()) === false) {
        return
      }
    }

    event.emit('Magazine.FulLoad.Success', { magazine: this, bullet: bulletGenerator() })
  }
}
