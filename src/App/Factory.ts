import * as g from './Gun'
import * as m from './Magazine'
import * as b from './Bullet'

interface Factory {
  choices(): {title: string, value: string}[]
  [key: string]: any
}

export const GunFactory: Factory = {
   choices() {
     return [
       {title: "Glock17", value: "glock17"},
       {title: "Glock17L(ロングバレル)", value: "glock17l"},
       {title: "ベレッタM92F", value: "m92f"},
       {title: ".44オートマグ", value: "automag"}
     ]
  },
  glock17: (): g.Gun => new g.GunGlock17,
  glock17l: (): g.Gun =>  new g.GunGlock17L,
  m92f: (): g.Gun => new g.GunM92F,
  automag: (): g.Gun => new g.Gun44AutoMag
};

export const MagazineFactory: Factory = {
   choices() {
    return [
      {title: "Glock17用", value: "glock17"},
      {title: "ベレッタM92F用", value: "m92f"},
      {title: ".44オートマグ用", value: "automag"}
    ]
  },
  glock17: ():m.Magazine => new m.MagazineGlockStandard,
  m92f: (): m.Magazine => new m.MagazineM92,
  automag: (): m.Magazine => new m.Magazine44AutoMag
};

export const BulletFactory: Factory = {
   choices() {
    return [
      {title: "9x19mmパラベラム弾", value: "p9mm"},
      {title: ".44口径(11.2mm)オートマチック用マグナム弾", value: "a44"}
    ]
  },
  p9mm: (): b.Bullet => new b.Bullet9mm,
  a44: (): b.Bullet => new b.Bullet44amp
};

export const ActionFactory: Factory = {
   choices() {
    return [
      {title: "撃つ", value: "shot"},
      {title: "弾丸をマガジンから装填", value: "load"},
      {title: "弾丸を薬室に直接装填", value: "loadDirect"},
      {title: "マガジンに弾丸をフル装填", value: "fullLoad"},
      {title: "銃にマガジンをセット", value: "setMagazine"},
      {title: "銃からマガジンを外す", value: "unsetMagazine"},
      {title: "終了", value: "finish"}
    ]
  },
  shot(gun: g.Gun, mag: m.Magazine, bulletGenerator: () => b.Bullet): boolean {
    gun.shot()
    return true
  },
  load(gun: g.Gun, mag: m.Magazine, bulletGenerator: () => b.Bullet): boolean {
    gun.setBullet()
    return true
  },
  loadDirect(gun: g.Gun, mag: m.Magazine, bulletGenerator: () => b.Bullet): boolean {
    gun.setBullet(bulletGenerator())
    return true
  },
  fullLoad(gun: g.Gun, mag: m.Magazine, bulletGenerator: () => b.Bullet): boolean {
    mag.fullLoad(bulletGenerator)
    return true
  },
  setMagazine(gun: g.Gun, mag: m.Magazine, bulletGenerator: () => b.Bullet): boolean {
    gun.setMagazine(mag)
    return true
  },
  unsetMagazine(gun: g.Gun, mag: m.Magazine, bulletGenerator: () => b.Bullet): boolean {
    gun.unsetMagazine()
    return true
  },
  finish(): boolean {
    return false
  }
};
