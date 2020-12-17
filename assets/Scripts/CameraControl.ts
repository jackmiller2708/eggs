const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Player_Node: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        let target_position = this.Player_Node.getPosition();

        let current_position = this.node.getPosition();

        current_position.lerp( target_position, 0.1, current_position );

        this.node.setPosition(current_position)
    }
}
