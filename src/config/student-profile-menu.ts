export type StudentProfileMenuItem = { title: string; href: "/profile" | "/settings" | "/support"; icon: "profile" | "settings" | "support"; };
export const studentProfileMenu: StudentProfileMenuItem[] = [
  { title: "الملف الشخصي", href: "/profile", icon: "profile" },
  { title: "الإعدادات", href: "/settings", icon: "settings" },
  { title: "الدعم والمساعدة", href: "/support", icon: "support" },
];
