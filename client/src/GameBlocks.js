import config from 'react-global-configuration';

export function GameBlock(props) {
    const blockSize = config.get('blockSize');
    var el_class = "game-block";
    var left = (props.x * blockSize || 0) + 'px';
    var top = (props.y * blockSize || 0) + 'px';
    if (props.className) {
        el_class = el_class + " " + props.className;
    }
    return (
        <div style={{left: left, top: top}} className={el_class}></div>
    )
}

export function SnakeBlock(props) {
    return (
        <GameBlock x={props.x} y={props.y} className="snake-block"></GameBlock>
    )
}

export function FoodBlock(props) {
    return (
        <GameBlock x={props.x} y={props.y} className="food-block"></GameBlock>
    )
}