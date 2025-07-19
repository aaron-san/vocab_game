"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { MIN_PASSWORD_LENGTH } from "@/utils/constants";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = [];

    if (!username.trim()) validationErrors.push("ユーザー名は必須です。");
    if (!password.trim()) validationErrors.push("パスワードは必須です。");
    if (password && password.length < MIN_PASSWORD_LENGTH)
      validationErrors.push(
        `パスワードは${MIN_PASSWORD_LENGTH}文字以上である必要があります。`
      );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setErrors([
        "ログインに失敗しました。ユーザー名またはパスワードを確認してください。",
      ]);
    } else if (res?.ok) {
      window.location.href = "/dashboard"; // Redirect to homepage or custom dashboard
      // window.location.href = res.url ?? "/"; // Redirect to homepage or custom dashboard
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-stone-100 shadow mx-auto mt-12 p-8 border-stone-600 rounded w-[300px] font-sans"
    >
      <h1 className="font-heading text-2xl text-center">🔐 ログイン</h1>

      {errors.length > 0 && (
        <ul className="bg-red-100 p-4 border border-red-400 rounded text-red-700 text-sm">
          {errors.map((err, i) => (
            <li key={i}>• {err}</li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border border-stone-700 focus:border-brandGreen rounded focus:outline-none focus:ring"
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-stone-700 focus:border-brandGreen rounded focus:outline-none focus:ring"
      />

      <button
        type="submit"
        className="bg-green-500 px-4 py-2 rounded text-white active:scale-[.98] transition cursor-pointer"
      >
        サインイン
      </button>
      <div className="flex gap-2">
        <div>初めて？➞</div>
        <Link
          href="/auth/register"
          className="text-blue-400 underline cursor-pointer"
        >
          新規登録
        </Link>
      </div>
    </form>
  );
}
