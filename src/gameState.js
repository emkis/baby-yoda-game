import {
  SCENES,
  NIGHT_CHANCE,
  getNextHungerTime,
  getNextDieTime,
  getNextPoopTime,
  getNextMonsterTime,
} from "./constants";
import { 
  modFox, 
  modScene, 
  toggleMonsters, 
  togglePoopBag, 
  writeModal, 
  toggleAttention,
  hideAttackStuff,
} from "./ui";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  timeToShowMonsters: -1,
  scene: 0,
  tick() {
    console.log(this);

    this.clock++;
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.timeToShowMonsters) {
      this.showMonsters()
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    } else if (this.clock === this.dieTime) {
      this.die();
    }

    return this.clock;
  },
  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModal();
    hideAttackStuff()
  },
  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    this.scene = Math.random() > NIGHT_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
    this.hungryTime = getNextHungerTime(this.clock);
  },
  handleUserAction(icon) {
    if (["FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)) return; 

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "defend":
        this.handleDefend();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  showMonsters() {
    this.current = 'ATTACKED'
    this.dieTime = getNextDieTime(this.clock)
    modFox("scared")
    modScene('night')
    toggleMonsters()
    toggleAttention()
  },
  handleDefend() {
    if (this.current === 'ATTACKED') {
      toggleMonsters()
      toggleAttention()
      modScene('day')
      this.dieTime = -1
      this.timeToShowMonsters = -1
      this.startCelebrating()
      this.hungryTime = getNextHungerTime(this.clock)
    }
  },
  cleanUpPoop() {
    if (this.current === "POOPING") {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock + 3);
      this.timeToShowMonsters = getNextMonsterTime(this.clock + 2)
    }
  },
  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
  feed() {
    if (this.current !== "HUNGRY") {
      return;
    }

    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },
  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    modFox("idling");
  },
  clearTimes() {
    this.wakeTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.timeToShowMonsters = -1
  },
  getHungry() {
    if (this.current === 'IDLING') {
      this.current = "HUNGRY";
      this.dieTime = getNextDieTime(this.clock);
      this.hungryTime = -1;
      modFox("hungry");
    }
  },
  die() {
    this.current = "DEAD";
    modScene("dead");
    modFox("dead");
    this.clearTimes();
    writeModal("Baby yoda morreu :( <br/> Aperte o botão do centro pra iniciar o jogo novamente");
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
