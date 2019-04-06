import Magazine from './Magazine'
import * as b from '../Bullet'
import event from '../Event'

export default class Magazine44AutoMag extends Magazine
{
  protected name: string = '.44オートマグ用マガジン';
  protected max: number = 7;

  pushBullet(bullet: b.Bullet): boolean {
    if (bullet instanceof b.Bullet44amp) {
      return super.pushBullet(bullet)
    }

    event.emit('Magazine.PushBullet.Error.Compatibility', { magazine: this, bullet: bullet })
    return false;
  }
}
