import { useRef, useEffect } from "react";
import LeaderLine from "leader-line-new";

const LeaderLineExample = () => {
  const aRef = useRef<HTMLDivElement | null>(null);
  const bRef = useRef<HTMLDivElement | null>(null);
  const cRef = useRef<HTMLDivElement | null>(null);
  const dRef = useRef<HTMLDivElement | null>(null);
  
  const lineRefs = useRef<LeaderLine[]>([]); // ← 配列を定義

  
  useEffect(() => {
    if (aRef.current && bRef.current) {
		const line1 = new LeaderLine(aRef.current, bRef.current, {
			startPlug: 'disc',//接続部分のタイプ。この部分は□
			endPlug: 'disc',//接続部分のタイプ。この部分は〇
			startSocket: 'bottom',//接続が要素のどこで行われるかこの場合は下
			endSocket: 'top',//接続が要素のどこで行われるかこの場合は上
			color: 'black',//罫線の色
			gradient: true,
	      	});
      	}
      	
    if (aRef.current && bRef.current) {
      const line2 = new LeaderLine(aRef.current, bRef.current, {
        startPlug: "disc",
        endPlug: "disc",
        startSocket: "bottom",
        endSocket: "top",
        color: "black",
        gradient: true,
      });
      lineRefs.current.push(line2); // 配列に追加
    }

    if (cRef.current && dRef.current) {
      const line2 = new LeaderLine(cRef.current, dRef.current, {
        startPlug: "disc",
        endPlug: "disc",
        startSocket: "bottom",
        endSocket: "top",
        color: "black",
        gradient: true,
      });
      lineRefs.current.push(line2); // 配列に追加
    }    
    return () => {
      // クリーンアップ時にすべての線を削除
      lineRefs.current.forEach((line) => line.remove());
      lineRefs.current = [];
    };
      }, []);

  return (
	<div>
	    <div ref={aRef}
	    	style={{
				marginBottom:'100px'		
			}} 
	    >
	      <div>a</div>
	    </div>
	    <div>
	    	<div></div>
	    </div>
	    <div ref={bRef}>
	      <div>b</div>
	    </div>
	    <div ref={cRef}
	    	style={{
				marginBottom:'100px'		
			}} 
	    >
	      <div>c</div>
	    </div>
	    <div>
	    	<div></div>
	    </div>
	    <div ref={dRef}>
	      <div>d</div>
	    </div>
	</div>
	
	
	    
  );
};

export default LeaderLineExample;
