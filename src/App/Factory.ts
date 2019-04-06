import * as g from './Gun'
import * as m from './Magazine'
import * as b from './Bullet'

interface Factory {
  choices(): {title: string, value: string}[]
  [key: string]: Function
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
  glock17() {
    return new g.GunGlock17
  },
  glock17l() {
    return new g.GunGlock17L
  },
  m92f() {
    return new g.GunM92F
  },
  automag() {
    return new g.Gun44AutoMag
  }
};

export const MagazineFactory: Factory = {
   choices() {
    return [
      {title: "Glock17用", value: "glock17"},
      {title: "ベレッタM92F用", value: "m92f"},
      {title: ".44オートマグ用", value: "automag"}
    ]
  },
  glock17() {
    return new m.MagazineGlockStandard
  },
  m92f() {
    return new m.MagazineM92
  },
  automag() {
    return new m.Magazine44AutoMag
  }
};

export const BulletFactory: Factory = {
   choices() {
    return [
      {title: "9x19mmパラベラム弾", value: "p9mm"},
      {title: ".44口径(11.2mm)オートマチック用マグナム弾", value: "a44"}
    ]
  },
  p9mm() {
    return new b.Bullet9mm
  },
  a44() {
    return new b.Bullet44amp
  }
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
  shot(gun: g.Gun, mag: m.Magazine, bulletGenerator: Function) {
    gun.shot()
  },
  load(gun: g.Gun, mag: m.Magazine, bulletGenerator: Function) {
    gun.setBullet()
  },
  loadDirect(gun: g.Gun, mag: m.Magazine, bulletGenerator: Function) {
    gun.setBullet(bulletGenerator())
  },
  fullLoad(gun: g.Gun, mag: m.Magazine, bulletGenerator: Function) {
    mag.fullLoad(bulletGenerator)
  },
  setMagazine(gun: g.Gun, mag: m.Magazine, bulletGenerator: Function) {
    gun.setMagazine(mag)
  },
  unsetMagazine(gun: g.Gun, mag: m.Magazine, bulletGenerator: Function) {
    gun.unsetMagazine()
  },
  finish() {
    return false
  }
};
