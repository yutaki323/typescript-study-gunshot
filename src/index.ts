import * as action from './App/Action'

import * as g from './App/Gun'
import * as m from './App/Magazine'
import * as b from './App/Bullet'

(async function() {
  const gun :g.Gun = await action.choiceGun()

  const magazine :m.Magazine = await action.choiceMagazine()

  const bulletGenerator :Function = await action.choiceBulletGenerator()

  // 操作
  while(true) {
    const result :boolean = await action.operate(gun, magazine, bulletGenerator)

    if (result === false) {
      break
    }
  }
})()