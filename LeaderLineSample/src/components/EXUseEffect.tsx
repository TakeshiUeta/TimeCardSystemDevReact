import { useEffect } from "react";

const EXUseEffect= () => {
	useEffect(() =>{
			console.log("useEfectを使ってコンソールに表示");
		}, []);
		//useEffect(() => {...}, []) と書くと 初回の描画時にのみ実行される
		//依存リスト（[] の部分）に変数を入れると、その値が変わるたびに実行される
		return(
			 <div>useEfectテスト</div>
		);
}

export default EXUseEffect;  