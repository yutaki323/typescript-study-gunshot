import * as c from './Factory'
import * as g from './Gun'
import * as m from './Magazine'
import * as b from './Bullet'

import prompts from 'prompts'

export const choiceGun = async function() :Promise<g.Gun> {
  const response = await prompts({
    type: "select",
    name: "target",
    message: "銃を試射できるスクリプトです。どの銃を試しますか？",
    choices: c.GunFactory.choices()
  })

  const gun: g.Gun = c.GunFactory[response.target]()

  return gun
}

export const choiceMagazine = async function() :Promise<m.Magazine> {
  const response = await prompts({
    type: "select",
    name: "target",
    message: "どのマガジンを試しますか？",
    choices: c.MagazineFactory.choices()
  })

  const magazine: m.Magazine = c.MagazineFactory[response.target]()

  return magazine
}

export const choiceBulletGenerator = async function() :Promise<Function> {
  const response = await prompts({
    type: "select",
    name: "target",
    message: "どの弾丸を試しますか？",
    choices: c.BulletFactory.choices()
  })

  const bulletGenerator :Function = c.BulletFactory[response.target]

  return bulletGenerator
}

export const operate = async function(gun: g.Gun, magazine: m.Magazine, bulletGenerator: Function) : Promise<boolean> {
  const response = await prompts({
    type: "select",
    name: "target",
    message: "次のアクション",
    choices: c.ActionFactory.choices()
  })

  const result :boolean = c.ActionFactory[response.target](gun, magazine, bulletGenerator)

  return result
}
