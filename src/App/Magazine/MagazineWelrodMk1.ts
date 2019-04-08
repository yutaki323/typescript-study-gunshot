import Magazine from './Magazine'
import * as b from '../Bullet'
import event from '../Event'

export default class MagazineWelrodMk1 extends Magazine
{
  protected name: string = 'ウェルロッドMk1マガジン';
  protected max: number = 5;

  pushBullet(bullet: b.Bullet): boolean {
    if (bullet instanceof b.Bullet9mm) {
      return super.pushBullet(bullet)
    }

    event.emit('Magazine.PushBullet.Error.Compatibility', { magazine: this, bullet: bullet })
    return false;
  }
}
