export async function simulateAuthSubmission(mode: "login" | "register") {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    ok: true,
    message:
      mode === "login"
        ? "تمت محاكاة تسجيل الدخول بنجاح. لم يتم إنشاء جلسة حقيقية."
        : "تمت محاكاة إنشاء الحساب بنجاح. لم يتم إرسال البيانات لأي خادم.",
  };
}
