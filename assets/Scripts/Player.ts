// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    accUp    = false;
    accDown  = false;
    accLeft  = false;
    accRight = false;

    animState = null;

    @property
    moveSpeed:number = 250;

    @property(cc.SpriteFrame)
    faceUp = null;

    @property(cc.SpriteFrame)
    faceDown = null;

    @property(cc.SpriteFrame)
    faceLeft = null;

    @property(cc.SpriteFrame)
    faceRight = null

    moveAction() {

    }

    onKeyDown(event) {
        switch(event.keyCode){
            case cc.macro.KEY.w:
                this.accUp = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.s:
                this.accDown = true;
                break;
        }
    }

    onKeyUp(event) {
        let anime = this.node.getComponent(cc.Animation);
        let sprite = this.node.getComponent(cc.Sprite);
        anime.stop();

        switch(event.keyCode){
            case cc.macro.KEY.w:
                this.accUp = false;
                sprite.spriteFrame = this.faceUp;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                sprite.spriteFrame = this.faceRight;
                break;
            case cc.macro.KEY.a:
                this.accLeft = false;
                sprite.spriteFrame = this.faceLeft;
                break;
            case cc.macro.KEY.s:
                this.accDown = false;
                sprite.spriteFrame = this.faceDown;
                break;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let anime = this.node.getComponent(cc.Animation);
        this.animState = anime.getAnimationState('running_up');

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }

    update (dt) {
        let anime = this.node.getComponent(cc.Animation);
        var playing = this.animState.isPlaying;

        if(this.accUp) {
            this.node.y += this.moveSpeed * dt
            if(!playing){
                this.animState = anime.play('running_up');
            }
        }
        else if(this.accDown) {
            this.node.y -= this.moveSpeed * dt
            if(!playing){
                this.animState = anime.play('running_down');
            }
        }
        if(this.accLeft) {
            this.node.x -= this.moveSpeed * dt
            if(!playing){
                this.animState = anime.play('running_left');
            }
        }
        if(this.accRight) {
            this.node.x += this.moveSpeed * dt
            if(!playing){
                this.animState = anime.play('running_right');
            }
        }
    }
}
