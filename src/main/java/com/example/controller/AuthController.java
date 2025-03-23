package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.form.Result;
import com.example.form.User;
import com.example.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Reactのフロントエンドと通信
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;

    // ログイン処理
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            System.out.println("Received userId: " + user.getUserId());
            System.out.println("Received password: " + user.getPassword());
            // 入力されたIDとパスワードを取得
            String inputUserId = user.getUserId();
            String inputPassword = user.getPassword();

            // DBからユーザー情報を取得
            User dbUser = userService.getUserOne(inputUserId);
            if (dbUser == null || !dbUser.getPassword().equals(inputPassword)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ユーザーIDまたはパスワードが違います。");
            }

            // セッションにユーザー情報を保存
            session.setAttribute("user", dbUser);
            return ResponseEntity.ok().body("ログイン成功");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ログイン処理中にエラーが発生しました。");
        }
    }

    // セッションユーザー取得
    @GetMapping("/session")
    public ResponseEntity<?> getSessionUser() {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("未ログイン");
        }
        return ResponseEntity.ok(user);
    }

    // タイムカードページへの遷移を確認
    @GetMapping("/timecard")
    public ResponseEntity<?> goToTimecardPage() {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("未ログイン");
        }

        // タイムカードのデータを取得（必要に応じて処理を追加）
        return ResponseEntity.ok("タイムカードページへ遷移します");
    }
    /** 出勤処理 */
    @PostMapping(value = "/result/goTime")
    public ResponseEntity<?> goTimeResult() {
        // セッションからユーザーをゲットする
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("未ログイン");
        }

        String userId = user.getUserId();

        // 結果IDのMAX値を求める
        Result result = userService.getMaxResultId();
        String beginMaxResultId = result.getResultId();
        int idLength = beginMaxResultId.length();
        String rIdvalue = beginMaxResultId.substring(idLength - 4, idLength);
        int resultInt = Integer.parseInt(rIdvalue);
        int maxValueInt = resultInt + 1;
        String incValue = (maxValueInt < 10) ? "RE000" : (maxValueInt < 100) ? "RE00" : (maxValueInt < 1000) ? "RE0" : "RE";
        String maxResultId = incValue + maxValueInt;

        // 出勤処理
        userService.goTimeIn(userId, maxResultId);

        // 結果画面に表示する結果リストを取得
        List<Result> resultList = userService.getresultFindAllByUserId(userId);

        return ResponseEntity.ok(resultList);  // 勤怠履歴を返す
    }

    /** 退勤処理 */
    @PostMapping(value = "/result/outTime")
    public ResponseEntity<?> outTimeResult() {
        // セッションからユーザーをゲットする
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("未ログイン");
        }

        String userId = user.getUserId();

        // ユーザーIDと紐付いた一番最後に入力した結果を求める
        Result result = userService.getFainalResult(userId);
        String resultId = result.getResultId();
        String outTime = result.getOutTime();

        // 退勤時間がnullでない場合（すでに退勤処理済みの場合）はエラー
        if (outTime != null) {
            return ResponseEntity.status(400).body("すでに退勤処理が完了しています");
        }

        // 退勤時間を登録
        userService.outTimeIn(resultId);

        // 結果画面に表示する結果リストを取得
        List<Result> resultList = userService.getresultFindAllByUserId(userId);

        return ResponseEntity.ok(resultList);  // 勤怠履歴を返す
    }
}
