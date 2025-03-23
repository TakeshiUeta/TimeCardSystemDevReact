import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	//useCallbackを使って関数を一元管理する
	const fetchLoginData = useCallback(() => {
		axios.get('http://localhost:8080/api/session', { withCredentials: true })
			.then(response => {
				if (response.status === 200) {
					navigate('/timecard'); // ログイン済みなら遷移
				}
			})
			.catch(() => {
				// 未ログインの場合は何もしない
			});
	}, [navigate]);

	// 🔹 ページを開いたときにセッション確認
	useEffect(() => {
		//useEffect で fetchLoginData を呼び出す	
		fetchLoginData();
	}, [fetchLoginData]);

	// 🔹 ログイン処理
	//async　非同期処理　「処理が終わったら（成功 or 失敗）結果を教えてくれるよ」 という約束（= Promise）を返す
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post('http://localhost:8080/api/login', { userId, password }, { withCredentials: true });

			// ログイン成功後に再度セッション確認
			const sessionResponse = await axios.get('http://localhost:8080/api/session', { withCredentials: true });
			//明日セッションステータスの一覧を確認する	
			if (sessionResponse.status === 200) {
				navigate('/timecard'); // セッションがあれば遷移
			}
		} catch (error) {
			alert('ログイン失敗');
		}
	};

	return (
		<div>
			<h1>ログインページ</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>ユーザーID</label>
					<input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
				</div>
				<div>
					<label>パスワード</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">ログイン</button>
			</form>
		</div>
	);
};

export default LoginPage;
