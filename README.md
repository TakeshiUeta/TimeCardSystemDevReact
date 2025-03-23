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
