package com.example.form;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class User {
	private String userId;
	@NotBlank
	@Pattern(regexp = "^[a-zA-Z0-9]+$")
	@Length(min=5,max=8)
	private String password;
	/* 名前 */
	@NotBlank
	private String name;
	/* 結果リスト */
	private List<Result> resultList;
	/**
	 * コンストラクタ
	 */
	 public User() {
	}

	/**
	 * コンストラクタ
	 * @param userId   ユーザーID
	 * @param password パスワード
	 * @param name     名前
	 */
	 public User(String userId, String password, String name) {
		this.userId = userId;
		this.password = password;
		this.name = name;
	}

	/**
	 * コンストラクタ
	 * @param userId     ユーザーID
	 * @param password   パスワード
	 * @param name       名前
	 * @param resultList 結果リスト
	 */
	User(String userId, String password, String name, List<Result> resultList) {
		this.userId = userId;
		this.password = password;
		this.name = name;
		this.resultList = resultList;
	}

}
