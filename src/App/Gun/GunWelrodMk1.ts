import Gun from './Gun'
import * as m from '../Magazine'
import * as b from '../Bullet'
import event from '../Event'

export default class GunWelrodMk1 extends Gun
{
  protected name: string = 'ウェルロッドMk.1';
  protected semiAuto: boolean = false

  setMagazine(magazine: m.Magazine): boolean {
    if (magazine instanceof m.MagazineWelrodMk1) {
      return super.setMagazine(magazine)
    }

    event.emit('Gun.SetMagazine.Error.Compatibility', { gun: this, magazine: magazine })
    return false;
  }

  setBullet(bullet: b.Bullet | undefined = undefined): boolean {
    if (bullet instanceof b.Bullet9mm || bullet === undefined) {
      return super.setBullet(bullet)
    }

    event.emit('Gun.SetBullet.Error.Compatibility', { gun: this, bullet: bullet })
    return false;
  }

  shotSound(bullet: b.Bullet): string {
    return '< プシュッ >'
  }
}