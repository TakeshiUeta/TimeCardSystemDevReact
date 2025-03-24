# TimeCardSystem
## 習作でタイムカードのアプリを作成しました。
まだ未完成です。  
実装予定  
・ユーザー新規作成<br>
・ユーザー更新<br>
・勤怠履歴の削除<br>
・レイアウト整理<br>
・レイアウトHTML・CSS

React フロントエンドと Spring Boot バックエンドを一元化してビルドする方法について説明します。React と Spring Boot を同じプロジェクト内で一元化する際に、React アプリケーションをビルドして Spring Boot アプリケーションの静的リソースとして統合する方法を説明します。

ステップ 1: React アプリケーションのビルド
まず、React アプリケーションをビルドします。

React アプリケーションをビルドする:

ターミナルで、React プロジェクトのディレクトリに移動します。

以下のコマンドを実行して、React アプリケーションをビルドします。

bash
コピーする
編集する
npm run build
これにより、build/ フォルダが作成され、最適化された静的ファイル（HTML、CSS、JavaScript）がその中に格納されます。

ステップ 2: Spring Boot アプリケーションに統合
次に、Spring Boot アプリケーションに React のビルド成果物を統合します。

React ビルド成果物を Spring Boot にコピー:

React のビルド成果物を、Spring Boot アプリケーションの src/main/resources/static フォルダにコピーします。

build/ フォルダの中身（index.html、static/、asset/ など）を、Spring Boot プロジェクトの src/main/resources/static フォルダにコピーします。

bash
コピーする
編集する
cp -r build/* ../springboot-project/src/main/resources/static/
Spring Boot の設定を確認:

Spring Boot の設定ファイル（application.properties または application.yml）に静的リソースの配置が正しく設定されていることを確認します。通常、Spring Boot は src/main/resources/static フォルダ内の静的リソースを自動的に提供します。

Spring Boot アプリケーションをビルド:

Spring Boot プロジェクトのルートディレクトリで、以下のコマンドを実行してビルドします。

bash
コピーする
編集する
mvn clean install
ビルド後の Spring Boot アプリケーションを実行:

ビルドが完了したら、以下のコマンドで Spring Boot アプリケーションを実行します。

bash
コピーする
編集する
mvn spring-boot:run
この時、React アプリケーションは Spring Boot アプリケーションの静的リソースとして配信され、http://localhost:8080 でアクセスできるようになります。

ステップ 3: 最終確認
http://localhost:8080 にアクセスして、React アプリケーションが正しく表示されるか確認します。

React アプリケーションが正しく表示される場合、Spring Boot と React が一元化された形で動作していることが確認できます。

まとめ
React アプリケーションをビルド（npm run build）。

ビルド成果物を Spring Boot の static フォルダにコピー。

Spring Boot アプリケーションをビルド（mvn clean install）。

Spring Boot アプリケーションを実行（mvn spring-boot:run）。

http://localhost:8080 で確認。

これで、Spring Boot アプリケーションに React アプリケーションを統合して、フルスタックアプリケーションとしてビルドおよび実行することができます。

npm run build で React をビルド

build/ の内容を src/main/resources/static/ にコピー

必要なら WebConfig で index.html へのリダイレクトを設定 (react-router-dom 使用時)

mvn package で JAR を作成

java -jar target/TimeCardSystem-0.0.1-SNAPSHOT.jar でアプリを起動

http://localhost:8080/ にアクセスすれば React + Spring Boot が動作


同じポートで動かす場合（例：http://localhost:8080）

@CrossOrigin 設定は不要

すでにバックエンドとフロントエンドが同じポート上にあるため、リクエストはクロスオリジンではなくなります。

axiosの設定

axios.get('http://localhost:8080/api/session', { withCredentials: true })

この場合、localhost:8080 にアクセスできるので、基本的に withCredentials: true は保持しても問題ないですが、CORS設定が不要な限り、withCredentials の設定も必須ではありません。

別々のポートで動かす場合（例：バックエンドが 8080、フロントエンドが 3000）

この場合は @CrossOrigin 設定は必要 です。

例えば、フロントエンドの React アプリが localhost:3000 で動いていて、バックエンドが localhost:8080 で動いている場合、クロスオリジンリクエストが発生します。

axiosの設定

同様に、フロントエンドからバックエンドにリクエストを送る際、CORS設定が必要になるため、@CrossOrigin 設定を保持しておく必要があります。

まとめ
同じポートで動作する場合: CORS設定は不要ですが、withCredentials: true は残しても問題ありません。

異なるポートで動作する場合: @CrossOrigin と axios の設定はそのままでOK。

ポート番号が同じなら、設定を簡素化できますよ！

あなた:
同じポートで動かす場合はaxios設定って消さないといけないのでしょうか？
ChatGPT:
同じポートで動かす場合でも、 axios の設定 は 消さなくても問題ありません。ただし、不要 であれば、消すこともできます。

詳細
withCredentials: true の設定について：

同じポートでバックエンドとフロントエンドが動いている場合、クロスオリジンの問題は発生しません。そのため、CORSの設定は不要ですが、withCredentials: true を使っていると、クッキーなどの認証情報を送信する際に役立ちます。

この設定は、クロスオリジンリクエストではなくてもセッション管理などに使われることが多いため、必ずしも消す必要はありません。

axios の設定を残しておくべきかどうか：

axios.get('http://localhost:8080/api/session', { withCredentials: true }) というリクエストで、認証が必要な場合（例えばセッションIDを持ったクッキーを送信する場合）には、withCredentials: true は残しておく のが良いです。

もし、認証情報を送る必要がない場合や、設定が不要であれば消しても問題ありません。

結論
同じポートで動かす場合、axios の設定を消しても動作はしますが、認証情報を送信する必要がある場合（例えばセッション管理が必要な場合）は、withCredentials: true を残しておくと良いです。

念のためwWbConfigの記述をコピー
package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}").setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:\\w+}").setViewName("forward:/index.html");
    }
}

