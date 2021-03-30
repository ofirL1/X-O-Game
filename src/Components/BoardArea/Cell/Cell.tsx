import { Component } from "react";
import xImage from "../../../Asset/Images/x.png"
import oImage from "../../../Asset/Images/o.png"
import "./Cell.css";

interface CellProps{
    value: string;
    cellClass?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface CellState{
    value: string;
}

function Cell(props: CellProps): JSX.Element {
    return (
        <div className={"Cell " + props.cellClass} onClick={props.onClick}>
			{props.value === "X" ? <img src={xImage}/> : null }
            {props.value === "O" ? <img src={oImage}/> : null }
        </div>
    );
}

export default Cell;
