import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const AttendanceHistory = () => {
	const [user, setUser] = useState({ userId: '', name: '' });
	const [resultList, setResultList] = useState([]);
	//useCallbackを使って関数を一元管理する
	const fetchResultData = useCallback(() =>{
	  // 例えば、ユーザー情報と勤怠履歴をAPIから取得する
		axios.get('/api/user/info', { withCredentials: true })
		  .then(response => {
		    setUser(response.data.user);  // セッションユーザー情報
		    setResultList(response.data.resultList);  // 勤怠履歴リスト
		  })
		  .catch(error => console.error("Error fetching data: ", error));
		  	// ログアウト処理
		}, []);
		
		const handleLogout = () => {
			axios.get('/timecard/logout', { withCredentials: true })
				.then(() => {
				  // ログアウト後の処理 (リダイレクトなど)
				  window.location.href = '/login';  // ログイン画面にリダイレクト
				})
				.catch(error => console.error("Logout error:", error));
		};
	// 初回レンダリング時にデータ取得
	useEffect(() => {
		//定義したfetchResultDataを呼ぶ
		fetchResultData();
	},[fetchResultData]);
	
	return (
	  <div>
	    {/* ユーザー情報 */}
	    <div>
	      <div>ID: {user.userId}</div>
	      <div>Name: {user.name}</div>
	    </div>
	
	    <div className="text-center">
	      <h1>勤怠履歴</h1>
	    </div>
	
	    {/* ログアウトボタン */}
	    <form onSubmit={e => { e.preventDefault(); handleLogout(); }}>
	      <button className="btn btn-primary" type="submit">ログアウト</button>
	    </form>
	
	    {/* 勤怠履歴 */}
	    <div>
	      <h3>{user.userId} {user.name} さん</h3>
	    </div>
	    <table className="table table-striped table-bordered table-hover">
	      <thead className="thead-light">
	        <tr>
	          <th>勤怠ID</th>
	          <th>出勤時間</th>
	          <th>退勤時間</th>
	        </tr>
	      </thead>
	      <tbody>
	        {resultList.map(item => (
	          <tr key={item.resultId}>
	            <td>{item.resultId}</td>
	            <td>{item.goTime}</td>
	            <td>{item.outTime}</td>
	          </tr>
	        ))}
	      </tbody>
	    </table>
	  </div>
	);
};

export default AttendanceHistory;
