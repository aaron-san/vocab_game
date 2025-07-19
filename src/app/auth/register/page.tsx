"use client";

import { MIN_PASSWORD_LENGTH } from "@/utils/constants";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    const validationErrors = [];

    if (!username.trim()) validationErrors.push("ユーザー名は必須です。");
    if (!password.trim()) validationErrors.push("パスワードは必須です。");
    if (password.length < MIN_PASSWORD_LENGTH)
      validationErrors.push(
        `パスワードは${MIN_PASSWORD_LENGTH}文字以上である必要があります。`
      );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setSuccess(true);

      // Auto-login the user
      const loginRes = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (loginRes?.error) {
        setErrors(["登録は成功しましたが、ログインに失敗しました。"]);
      } else {
        toast.success("ようこそ！ログインに成功しました 🎉");
        window.location.href = "/dashboard"; // Redirect to dashboard
        console.log("Login response:", loginRes);
      }

      // Clear form
      setUsername("");
      setPassword("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-4 bg-stone-100 shadow mx-auto mt-12 p-8 border-stone-600 rounded w-[300px] font-sans"
      // className="flex flex-col gap-4 bg-stone-100 shadow mx-auto mt-12 p-8 border-stone-600 rounded w-[300px] font-sans"
    >
      <h1 className="font-heading text-2xl text-center">📝 新規登録</h1>

      {errors.length > 0 && (
        <ul className="bg-red-100 p-4 border border-red-400 rounded text-red-700 text-sm">
          {errors.map((err, i) => (
            <li key={i}>• {err}</li>
          ))}
        </ul>
      )}

      {success && (
        <p className="bg-green-100 p-2 border border-green-400 rounded text-green-600 text-sm text-center">
          登録が完了しました！
        </p>
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
        className="bg-blue-500 px-4 py-2 rounded text-white active:scale-[.98] transition cursor-pointer"
      >
        登録
      </button>
    </motion.form>
  );
}
