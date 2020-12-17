// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    score = 0;
    eggsMap = [];

    @property(cc.Prefab)
    Egg: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Label)
    ScoreDisplay: cc.Label = null;


    @property(cc.Label)
    gameDuration: cc.Label = null;

    timer: number = 60;


    onLoad () {
        this.spawnEggs();

        this.gameDuration.string = this.timer.toString();
    }

    spawnEggs() {

        for(let x = 1; x < 10; x++){
            let newEgg = cc.instantiate(this.Egg);

            this.eggsMap.push(newEgg);

            this.node.addChild(newEgg);

            newEgg.setPosition(this.getNewEggPosition());

            newEgg.getComponent('Eggs').game = this;
        }

    }

    gainScore() {
        this.score += 1;

        this.ScoreDisplay.string = 'Score: ' + this.score;
    }

    gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }

    getNewEggPosition(){
        let maxX = this.node.width/2;
        let maxY = this.node.height/2;

        let randX = (Math.random() - 0.5) * 2 * maxX;
        let randY = (Math.random() - 0.5) * 2 * maxY;

        return cc.v2(randX, randY);
    }

    start () {

    }

    update (dt) {

        if(this.timer <= 0){
            this.gameOver();
            return;
        }

        this.timer -= dt
        this.gameDuration.string = Math.round(this.timer).toString();
    }
}
