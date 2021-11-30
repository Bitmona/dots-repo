/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 10.30651124837891,
        y: 10.30651124837891
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.penColor = Color.rgb(101, 255, 0);
      while (!!this.touching(Color.rgb(100, 255, 0))) {
        this.stage.vars.positions += 1;
        this.goto(this.random(-240, 240), this.random(-180, 180));
        yield;
      }
      this.penDown = true;
      this.penDown = false;
      this.stage.vars.dots += 1;
      this.stage.vars.positions = 0;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.effects.ghost = 100;
    this.stage.vars.positions = 0;
    this.stage.vars.dots = 0;
    this.clearPen();
    this.penSize = 20;
  }

  *whenGreenFlagClicked3() {
    this.stage.vars.seconds = 0;
    while (true) {
      if (this.stage.vars.seconds == 60) {
        this.broadcast("message1");
      }
      yield* this.wait(1);
      this.stage.vars.seconds += 1;
      yield;
    }
  }

  *whenIReceiveMessage1() {
    this.stage.vars.dpm = this.stage.vars.dots;
    return;
  }
}
