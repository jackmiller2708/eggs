// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property
    pickRadius = 0;

    getPlayerDistance() {
        let playerPos = this.game.player.getPosition();

        let dist = this.node.position.sub(playerPos).mag();

        return dist
    }

    onPicked() {
        this.game.gainScore();

        this.node.destroy();

        let map = this.game.eggsMap.filter(egg => egg['_active']);

        if(map.length == 0){
            this.game.gameOver();

            return;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            // Invoke collecting behavior
            this.onPicked();
            return;
        }
    }
}
