import { Component } from "react";
import Cell from "../Cell/Cell";
import "./Board.css";

interface BoardState {
    squares: string[];
    xIsNext: boolean;
    winner: string;
}

class Board extends Component<{}, BoardState> {

    private lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    private steps = 0;

    public constructor(props: {}) {
        super(props);
        this.state = {
            squares: new Array<string>(9),
            xIsNext: true,
            winner: ""
        }
    }

    public handleClick(i: number): void {
        const squares = this.state.squares.slice();
        if (squares[i]) {

            return;
        }
        squares[i] = this.state.xIsNext ? "X" : null;
        this.setState({ squares: squares, xIsNext: !this.state.xIsNext},() => {
            setTimeout(() => {
                this.steps++;
                if (this.calculateWinner(squares) === "X") {
                    this.setState({winner: "X"})
                    return;
                }
                
                const computerCanWin: number = this.calculateComputerCanWin(this.state.squares);
                const playerCanWin: number = this.calculatePlayerCanWin(this.state.squares);

                console.log("computre can win in cell index : " + computerCanWin)
                if (computerCanWin !== null && squares[computerCanWin] === null) {
                    console.log("computer can win")
                    squares[computerCanWin] = "O";
                }
                else if(playerCanWin !== null && squares[playerCanWin] === null){
                    console.log("player can win")
                    squares[playerCanWin] = "O";
                    console.log("player cannot win because computer")

                }
                else{
                    console.log("random O")
                    const emptyCells = [];
                    
                    for (let i = 0; i < squares.length; i++) {
                        if(squares[i] === null){
                            emptyCells.push(i)
                        }                        
                    }
                        const randomCell = Math.floor(Math.random()* emptyCells.length);
                        squares[emptyCells[randomCell]] = "O"
                }
                this.setState({squares: squares, xIsNext: !this.state.xIsNext},() => {
                    this.steps++;

                    if (this.calculateWinner(squares) === "O") {
                        setTimeout(() => {
                            this.setState({winner: "O"})
                        },1000)
                    }
                });
            },1000)
        })
    }

    public componentDidMount(): void{
        const squares = this.state.squares.slice();
        for (let i = 0; i < squares.length; i++) {
            squares[i] = null;
            
        }
        this.setState({squares})
    }

    public render(): JSX.Element {
        const winner = this.state.winner;
        return (
            <div className="Board">

                {winner ? 
                
                <div className="Status">
                    {winner === "X" || winner === "O" ? <h1>The Winner is : {winner}</h1> : <h1>No one win it: {winner} </h1>}
                </div> : 
                <>
                    <div className="Line-Group">
                        <Cell onClick={() => this.handleClick(0)} value={this.state.squares[0]} cellClass="left-top" />
                        <Cell onClick={() => this.handleClick(1)} value={this.state.squares[1]} cellClass="mid-top" />
                        <Cell onClick={() => this.handleClick(2)} value={this.state.squares[2]} cellClass="right-top" />
                    </div>
                    <div className="Line-Group">
                        <Cell onClick={() => this.handleClick(3)} value={this.state.squares[3]} cellClass="left-mid" />
                        <Cell onClick={() => this.handleClick(4)} value={this.state.squares[4]} cellClass="mid-mid" />
                        <Cell onClick={() => this.handleClick(5)} value={this.state.squares[5]} cellClass="right-mid" />
                    </div>
                    <div className="Line-Group">
                        <Cell onClick={() => this.handleClick(6)} value={this.state.squares[6]} cellClass="left-bottom" />
                        <Cell onClick={() => this.handleClick(7)} value={this.state.squares[7]} cellClass="mid-bottom" />
                        <Cell onClick={() => this.handleClick(8)} value={this.state.squares[8]} cellClass="right-bottom" />
                    </div>
                </>     
                }
            </div>
        );
    }

    public calculateWinner(squares: string[]) {
    
        for (let i = 0; i < this.lines.length; i++) {
          const [a, b, c] = this.lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
          else if(this.steps === 9){
              this.setState({winner: "tie"});
          }
        }
        return null;
      }

      public calculateComputerCanWin(squares: string[]) {
    
        for (let i = 0; i < this.lines.length; i++) {
          const [a, b, c] = this.lines[i];
          if (squares[b] === "O" && squares[c] === "O" && squares[a] === null) {
            return a;
          }
          if (squares[a] === "O" && squares[c] === "O" && squares[b] === null) {
            return b;
          }
          if (squares[a] === "O" && squares[b] === "O" && squares[c] === null) {
            return c;
          }
        }
        return null;
      }

      public calculatePlayerCanWin(squares: string[]) {
    
        for (let i = 0; i < this.lines.length; i++) {
          const [a, b, c] = this.lines[i];
          if (squares[b] === "X" && squares[c] === "X" && squares[a] === null) {
            return a;
          }
          if (squares[a] === "X" && squares[c] === "X" && squares[b] === null) {
            return b;
          }
          if (squares[a] === "X" && squares[b] === "X" && squares[c] === null) {
            return c;
          }
        }
        return null;
      }
}

export default Board;
