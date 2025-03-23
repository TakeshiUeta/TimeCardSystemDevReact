import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TimeCardPage = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	//useCallbackを使って関数を一元管理する
	const fetchUserData = useCallback(() =>{
		  // セッションからユーザー情報を取得
		  axios.get('http://localhost:8080/api/session', { withCredentials: true })
		    .then(response => {
		      setUser(response.data);
		    })
		    .catch(() => {
		      alert('ログインしてください');
		      navigate('/'); // 未ログインならログインページへリダイレクト
		    });
		}, [user,navigate]);
	//useEffect で fetchUserData を呼び出す	
	useEffect(() => {
		fetchUserData();	
	},[fetchUserData]);
	
	// 出勤処理
	const handleGoTime = () => {
	  axios.post('http://localhost:8080/result/goTime', {}, { withCredentials: true })
	    .then(() => {
	      // 出勤処理後に結果画面へ遷移
	      navigate('/result');
	    })
	    .catch(error => {
	      console.error('出勤処理に失敗しました:', error.response?.data);
	    });
	};
	
	// 退勤処理
	const handleOutTime = () => {
	  axios.post('http://localhost:8080/result/outTime', {}, { withCredentials: true })
	    .then(() => {
	      // 退勤処理後に結果画面へ遷移
	      navigate('/result');
	    })
	    .catch(error => {
	      console.error('退勤処理に失敗しました:', error.response?.data);
	    });
	};
	
	if (!user) return <div>Loading...</div>;
	
	return (
	  <div>
	    <h1>TimeCard</h1>
	    <p>ID: {user.userId}</p>
	    <p>Name: {user.name}</p>
	
	    <h2>現在時刻</h2>
	    <h3>{new Date().toLocaleString()}</h3>
	
	    <button onClick={handleGoTime}>出勤</button>
	    <button onClick={handleOutTime}>退勤</button>
	    <button onClick={() => navigate('/')}>ログアウト</button>
	  </div>
	  );
};

export default TimeCardPage;