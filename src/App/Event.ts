import * as g from './Gun'
import * as m from './Magazine'
import * as b from './Bullet'
import mitt from 'mitt';
import consola from 'consola'

const event: mitt.Emitter = new mitt()

event.on(
  'Gun.SetMagazine.Success',
  (option: { gun: g.Gun, magazine: m.Magazine }) => {
    consola.info(
      option.gun.getName()+'に'+
      option.magazine.getName()+'をセットしました。'+
      ' [残弾 '+option.gun.getBulletCount()+']'
    )
  }
)

event.on(
  'Gun.SetMagazine.Error.Exists',
  (option: { gun: g.Gun, magazine: m.Magazine }) => {
    consola.error(
      option.gun.getName()+'に'+
      option.magazine.getName()+'がすでにセットされています。'
    )
  }
)

event.on(
  'Gun.SetMagazine.Error.Compatibility',
  (option: { gun: g.Gun, magazine: m.Magazine }) => {
    consola.error(
      option.gun.getName()+'に'+
      option.magazine.getName()+'はセットできません！'
    )
  }
)


event.on(
  'Gun.UnsetMagazine.Success',
  (option: { gun: g.Gun, magazine: m.Magazine }) => {
    consola.info(
      option.gun.getName()+'から'+
      option.magazine.getName()+'を外しました。'
    )
  }
)

event.on(
  'Gun.UnsetMagazine.Error.NoMagazine',
  (option: { gun: g.Gun }) => {
    consola.warn('マガジンが'+option.gun.getName()+'にセットされていません。')
  }
)

event.on(
  'Gun.SetBullet.Error.NoMagazine',
  (option: { gun: g.Gun }) => {
    consola.warn('マガジンが'+option.gun.getName()+'にセットされていないので弾丸を装填できません。')
  }
)

event.on(
  'Gun.SetBullet.Error.Compatibility',
  (option: { gun: g.Gun, bullet: b.Bullet }) => {
    consola.error(
      option.gun.getName()+'に'+
      option.bullet.getName()+'は装填できません！'
    )
  }
)

event.on(
  'Gun.SetBullet.Error.EmptyMagazine',
  (option: { gun: g.Gun, magazine: m.Magazine }) => {
    consola.warn(option.magazine.getName()+'が空です。')
  }
)

event.on(
  'Gun.SetBullet.Success',
  (option: { gun: g.Gun, bullet: b.Bullet }) => {
    consola.ready(
      option.bullet.getName()+'を薬室に装填しました。'+
      ' [残弾 '+option.gun.getBulletCount()+']'
    )
  }
)

event.on(
  'Gun.UnsetBullet.Error.NoBullet',
  (option: { gun: g.Gun }) => {
    consola.warn(option.gun.getName()+'の薬室に弾丸がありません！')
  }
)

event.on(
  'Gun.UnsetBullet.Success',
  (option: { gun: g.Gun, bullet: b.Bullet }) => {
    consola.info(
      option.bullet.getName()+'が薬室から排莢されました。'+
      ' [残弾 '+option.gun.getBulletCount()+']'
    )
  }
)

event.on(
  'Gun.Shot.Error.NoBullet',
  (option: { gun: g.Gun }) => {
    consola.warn(option.gun.getName()+'の薬室に弾丸がありません！')
  }
)

event.on(
  'Gun.Shot.Success',
  (option: { gun: g.Gun, bullet: b.Bullet }) => {
    consola.success(
      '<<<!! Bang !!>>>'+
      option.bullet.getName()+'を発射しました！'+
      ' [残弾 '+option.gun.getBulletCount()+']'
     )
  }
)

event.on(
  'Magazine.FulLoad.Success',
  (option: { magazine: m.Magazine, bullet: b.Bullet }) => {
    consola.info(
      option.magazine.getName()+'を'+
      option.bullet.getName()+
      'でフル装填しました。('+option.magazine.getStockCapacity()+'発)'
    )
  }
)

event.on(
  'Magazine.PushBullet.Error.Compatibility',
  (option: { magazine: m.Magazine, bullet: b.Bullet }) => {
    consola.error(
      option.magazine.getName()+'に'+
      option.bullet.getName()+'は装填できません！'
    )
  }
)

export default event