import { useState } from 'react';
/*
function square({ value, onSquareClick}) {
	return(
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board ({ xIsNext,squres,onplay }){
	function handleClick(i){
		if(calculateWinner(squres) || squres(i)){
			return;
		}
		const nextSqures = squares.slice();
		if(xIsNext){
			nextSquares[i] = "x";
		}else{
			nextSquares[i] = "o";
		}
		onPlay(nextSquares);
	}
}t

const winner = calculateWinner(squres);
let status :String;
if(winner){
	status="winner:" + winner;
} else{
	status="Next player" + (xIsNext ? "x" : "o");
}

export {};*/