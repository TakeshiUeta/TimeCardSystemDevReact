import { useRef } from "react";

const ChangeText = () => {
  const myRef = useRef<HTMLDivElement | null>(null);

  const update = () => {
    if (myRef.current) {
      myRef.current.innerText = "更新"; // innerTextを正しく設定
    }
  };

  return (
    <div>
      {/* refプロパティで何のイベントも入っていないDOMを代入してるので何も変わらない */}
      <div ref={myRef}>テスト</div>
      
      {/* ボタンを押したらイベントが起こる。ここでは"更新"が表示される */}
      <button onClick={update}>更新します</button>
    </div>
  );
};

export default ChangeText;
