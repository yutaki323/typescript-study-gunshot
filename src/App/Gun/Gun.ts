import * as m from '../Magazine'
import * as b from '../Bullet'
import event from '../Event'

export default abstract class Gun
{
  protected abstract name: string

  protected semiAuto: boolean = false

  public magroom: m.Magazine | null = null

  public chamber: b.Bullet | null = null

  getName(): string {
    return this.name
  }

  getBulletCount(): number {
    let bulletCount = 0

    if (this.magroom instanceof m.Magazine) {
      bulletCount += this.magroom.getStockCount()      
    }

    if (this.chamber instanceof b.Bullet) {
      bulletCount += 1
    }

    return bulletCount
  }

  isSemiAuto(): boolean {
    return this.semiAuto
  }

  setMagazine(magazine: m.Magazine): boolean {
    if (this.magroom instanceof m.Magazine) {
      event.emit('Gun.SetMagazine.Error.Exists', { gun: this, magazine: this.magroom })
      return false
    }

    this.magroom = magazine

    event.emit('Gun.SetMagazine.Success', { gun: this, magazine: magazine })

    return true
  }

  unsetMagazine(): boolean {
    if (this.magroom instanceof m.Magazine) {
      const magazine = this.magroom

      this.magroom = null

      event.emit('Gun.UnsetMagazine.Success', { gun: this, magazine: magazine })
      return true
    }

    event.emit('Gun.UnsetMagazine.Error.NoMagazine', { gun: this })
    return false
  }

  setBullet(bullet: b.Bullet | undefined = undefined): boolean {
    if (this.chamber instanceof b.Bullet) {
      this.unsetBullet()
    }

    if (bullet instanceof b.Bullet) {
      this.chamber = bullet
      event.emit('Gun.SetBullet.Success', { gun: this, bullet: bullet })
      return true
    }

    if (this.magroom === null) {
      event.emit('Gun.SetBullet.Error.NoMagazine', { gun: this })
      return false
    }

    bullet = this.magroom.pullBullet()

    if (bullet instanceof b.Bullet) {
      this.chamber = bullet
      return true
    } 

    event.emit('Gun.SetBullet.Error.EmptyMagazine', { gun: this, magazine: this.magroom })
    return false
  }

  unsetBullet(): boolean {
    if (this.chamber instanceof b.Bullet) {
      const bullet = this.chamber

      this.chamber = null

      event.emit('Gun.UnsetBullet.Success', { gun: this, bullet: bullet })

      return true
    }

    event.emit('Gun.UnsetBullet.Error.NoBullet', { gun: this })
    return false
  }

  shot(): boolean {
    if (this.chamber instanceof b.Bullet) {
      const bullet: b.Bullet = this.chamber

      this.chamber = null

      event.emit('Gun.Shot.Success', { gun: this, bullet: bullet })

      if (this.isSemiAuto()) {
        this.setBullet()
      }

      return true
    }

    event.emit('Gun.Shot.Error.NoBullet', { gun: this })

    return false
  }
}