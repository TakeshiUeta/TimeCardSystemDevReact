import React, { useEffect, useRef } from "react";
import LeaderLine from "leader-line-new";

const LeaderLIneTest = () => {
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	  useEffect(() => {
	    if (div1Ref.current && div2Ref.current) {
		        new LeaderLine(
		            div1Ref.current,
		            div2Ref.current
		        )
		 }       
	  }, [div1Ref, div2Ref]);
	
	 return (
		<div>
		    <div ref={div1Ref}>
		       div1
		    </div>
		    <div ref={div2Ref}>
		       div2
		    </div>
	    </div>
	  );
};

export default LeaderLIneTest;
