export type Locale = "ru" | "en" | "fr" | "es";

export const translations: Record<Locale, Record<string, string>> = {
  ru: {
    // Navigation
    "nav.courses": "Курсы",
    "nav.problems": "Задачи",
    "nav.ege": "ЕГЭ",
    "nav.daily": "Задача дня",
    "nav.leaderboard": "Лидеры",
    "nav.career": "Карьера",
    "nav.projects": "Проекты",
    "nav.pricing": "Тарифы",
    "nav.profile": "Профиль",
    "nav.login": "Войти",
    "nav.register": "Начать бесплатно",
    "nav.logout": "Выйти",

    // Landing
    "hero.title1": "Учись",
    "hero.title2": "программировать",
    "hero.title3": "и сдавай",
    "hero.title4": "ЕГЭ на 100",
    "hero.subtitle": "Интерактивная платформа с ИИ-репетитором. Python с нуля до трудоустройства.",
    "hero.cta": "Начать бесплатно \u2192",
    "hero.cta2": "ЕГЭ Математика 2026",

    // Common
    "common.loading": "Загрузка...",
    "common.run": "\u25B6 Run",
    "common.check": "\u2713 Check",
    "common.hint": "Подсказка",
    "common.reset": "Сбросить",
    "common.next": "Следующий \u2192",
    "common.prev": "\u2190 Предыдущий",
    "common.submit": "Submit",
    "common.correct": "Верно!",
    "common.incorrect": "Неверно",
    "common.passed": "Пройден",

    // Auth
    "auth.login": "Вход",
    "auth.register": "Регистрация",
    "auth.email": "Email",
    "auth.password": "Пароль",
    "auth.name": "Имя",
    "auth.forgot": "Забыли пароль?",
    "auth.no_account": "Нет аккаунта?",
    "auth.has_account": "Уже есть аккаунт?",
    "auth.create": "Создать аккаунт",
    "auth.sending": "Отправка...",
    "auth.logging_in": "Вход...",
    "auth.registering": "Регистрация...",
    "auth.register_link": "Зарегистрироваться",
    "auth.login_link": "Войти",
    "auth.enter_email_reset": "Введите email для восстановления пароля",
    "auth.reset_sent_title": "Письмо отправлено",
    "auth.reset_sent_desc": "Ссылка для сброса пароля отправлена на",
    "auth.reset_sent_hint": "Проверьте почту и перейдите по ссылке. Если письма нет — проверьте папку «Спам».",
    "auth.back_to_login": "Вернуться ко входу",
    "auth.confirm_title": "Проверьте почту!",
    "auth.confirm_desc": "Мы отправили ссылку для подтверждения на",
    "auth.confirm_hint": "Нажмите на ссылку в письме, чтобы активировать аккаунт. После этого вы сможете войти.",
    "auth.go_to_login": "Перейти ко входу",
    "auth.name_placeholder": "Как вас зовут",
    "auth.password_placeholder": "Минимум 6 символов",

    // Lesson player
    "lesson.theory": "Урок",
    "lesson.reference": "Справка",
    "lesson.completed": "Урок пройден!",
    "lesson.next_lesson": "Переход к следующему уроку...",
    "lesson.all_done": "Поздравляем! Вы прошли все уроки!",

    // Problems
    "problems.title": "Задачи",
    "problems.solved": "Решено",
    "problems.easy": "Лёгкая",
    "problems.medium": "Средняя",
    "problems.hard": "Сложная",
    "problems.acceptance": "Принято",
    "problems.show_solution": "Показать решение",
    "problems.show_hint": "Показать подсказку",

    // Pricing
    "pricing.free": "Бесплатно",
    "pricing.pro": "Pro",
    "pricing.lifetime": "Навсегда",
    "pricing.month": "мес",
    "pricing.subscribe": "Оформить подписку",
    "pricing.start_free": "Начать бесплатно",

    // Profile
    "profile.title": "Профиль",
    "profile.progress": "Прогресс",
    "profile.achievements": "Достижения",
    "profile.certificate": "Сертификат",

    // Footer
    "footer.rights": "Все права защищены",
    "footer.courses_label": "Курсы",
    "footer.platform_label": "Платформа",
    "footer.help_label": "Помощь",
  },
  en: {
    "nav.courses": "Courses",
    "nav.problems": "Problems",
    "nav.ege": "EGE",
    "nav.daily": "Daily Challenge",
    "nav.leaderboard": "Leaderboard",
    "nav.career": "Career",
    "nav.projects": "Projects",
    "nav.pricing": "Pricing",
    "nav.profile": "Profile",
    "nav.login": "Sign In",
    "nav.register": "Start Free",
    "nav.logout": "Sign Out",

    "hero.title1": "Learn to",
    "hero.title2": "code",
    "hero.title3": "and ace your",
    "hero.title4": "exams",
    "hero.subtitle": "Interactive platform with AI tutor. Python from zero to job-ready.",
    "hero.cta": "Start Free \u2192",
    "hero.cta2": "Math Exam Prep",

    "common.loading": "Loading...",
    "common.run": "\u25B6 Run",
    "common.check": "\u2713 Check",
    "common.hint": "Hint",
    "common.reset": "Reset",
    "common.next": "Next \u2192",
    "common.prev": "\u2190 Previous",
    "common.submit": "Submit",
    "common.correct": "Correct!",
    "common.incorrect": "Incorrect",
    "common.passed": "Completed",

    "auth.login": "Sign In",
    "auth.register": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Name",
    "auth.forgot": "Forgot password?",
    "auth.no_account": "No account?",
    "auth.has_account": "Already have an account?",
    "auth.create": "Create Account",
    "auth.sending": "Sending...",
    "auth.logging_in": "Signing in...",
    "auth.registering": "Signing up...",
    "auth.register_link": "Sign Up",
    "auth.login_link": "Sign In",
    "auth.enter_email_reset": "Enter your email to reset password",
    "auth.reset_sent_title": "Email sent",
    "auth.reset_sent_desc": "Password reset link sent to",
    "auth.reset_sent_hint": "Check your inbox and follow the link. If you don't see it, check your spam folder.",
    "auth.back_to_login": "Back to login",
    "auth.confirm_title": "Check your email!",
    "auth.confirm_desc": "We sent a confirmation link to",
    "auth.confirm_hint": "Click the link in the email to activate your account. Then you can sign in.",
    "auth.go_to_login": "Go to login",
    "auth.name_placeholder": "Your name",
    "auth.password_placeholder": "At least 6 characters",

    "lesson.theory": "Lesson",
    "lesson.reference": "Reference",
    "lesson.completed": "Lesson completed!",
    "lesson.next_lesson": "Moving to next lesson...",
    "lesson.all_done": "Congratulations! You've completed all lessons!",

    "problems.title": "Problems",
    "problems.solved": "Solved",
    "problems.easy": "Easy",
    "problems.medium": "Medium",
    "problems.hard": "Hard",
    "problems.acceptance": "Acceptance",
    "problems.show_solution": "Show Solution",
    "problems.show_hint": "Show Hint",

    "pricing.free": "Free",
    "pricing.pro": "Pro",
    "pricing.lifetime": "Lifetime",
    "pricing.month": "mo",
    "pricing.subscribe": "Subscribe",
    "pricing.start_free": "Start Free",

    "profile.title": "Profile",
    "profile.progress": "Progress",
    "profile.achievements": "Achievements",
    "profile.certificate": "Certificate",

    "footer.rights": "All rights reserved",
    "footer.courses_label": "Courses",
    "footer.platform_label": "Platform",
    "footer.help_label": "Help",
  },
  fr: {
    "nav.courses": "Cours",
    "nav.problems": "Probl\u00e8mes",
    "nav.ege": "EGE",
    "nav.daily": "D\u00e9fi du jour",
    "nav.leaderboard": "Classement",
    "nav.career": "Carri\u00e8re",
    "nav.projects": "Projets",
    "nav.pricing": "Tarifs",
    "nav.profile": "Profil",
    "nav.login": "Connexion",
    "nav.register": "Commencer gratuitement",
    "nav.logout": "D\u00e9connexion",

    "hero.title1": "Apprenez \u00e0",
    "hero.title2": "programmer",
    "hero.title3": "et r\u00e9ussissez vos",
    "hero.title4": "examens",
    "hero.subtitle": "Plateforme interactive avec tuteur IA. Python de z\u00e9ro \u00e0 l'emploi.",
    "hero.cta": "Commencer gratuitement \u2192",
    "hero.cta2": "Pr\u00e9pa Examens Maths",

    "common.loading": "Chargement...",
    "common.run": "\u25B6 Ex\u00e9cuter",
    "common.check": "\u2713 V\u00e9rifier",
    "common.hint": "Indice",
    "common.reset": "R\u00e9initialiser",
    "common.next": "Suivant \u2192",
    "common.prev": "\u2190 Pr\u00e9c\u00e9dent",
    "common.submit": "Soumettre",
    "common.correct": "Correct !",
    "common.incorrect": "Incorrect",
    "common.passed": "Termin\u00e9",

    "auth.login": "Connexion",
    "auth.register": "Inscription",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.name": "Nom",
    "auth.forgot": "Mot de passe oubli\u00e9 ?",
    "auth.no_account": "Pas de compte ?",
    "auth.has_account": "D\u00e9j\u00e0 un compte ?",
    "auth.create": "Cr\u00e9er un compte",
    "auth.sending": "Envoi...",
    "auth.logging_in": "Connexion...",
    "auth.registering": "Inscription...",
    "auth.register_link": "S'inscrire",
    "auth.login_link": "Se connecter",
    "auth.enter_email_reset": "Entrez votre email pour r\u00e9initialiser le mot de passe",
    "auth.reset_sent_title": "Email envoy\u00e9",
    "auth.reset_sent_desc": "Le lien de r\u00e9initialisation a \u00e9t\u00e9 envoy\u00e9 \u00e0",
    "auth.reset_sent_hint": "V\u00e9rifiez votre bo\u00eete de r\u00e9ception. Si vous ne trouvez pas l'email, v\u00e9rifiez les spams.",
    "auth.back_to_login": "Retour \u00e0 la connexion",
    "auth.confirm_title": "V\u00e9rifiez votre email !",
    "auth.confirm_desc": "Nous avons envoy\u00e9 un lien de confirmation \u00e0",
    "auth.confirm_hint": "Cliquez sur le lien dans l'email pour activer votre compte.",
    "auth.go_to_login": "Aller \u00e0 la connexion",
    "auth.name_placeholder": "Votre nom",
    "auth.password_placeholder": "Minimum 6 caract\u00e8res",

    "lesson.theory": "Le\u00e7on",
    "lesson.reference": "R\u00e9f\u00e9rence",
    "lesson.completed": "Le\u00e7on termin\u00e9e !",
    "lesson.next_lesson": "Passage \u00e0 la le\u00e7on suivante...",
    "lesson.all_done": "F\u00e9licitations ! Vous avez termin\u00e9 toutes les le\u00e7ons !",

    "problems.title": "Probl\u00e8mes",
    "problems.solved": "R\u00e9solus",
    "problems.easy": "Facile",
    "problems.medium": "Moyen",
    "problems.hard": "Difficile",
    "problems.acceptance": "Acceptation",
    "problems.show_solution": "Voir la solution",
    "problems.show_hint": "Voir l'indice",

    "pricing.free": "Gratuit",
    "pricing.pro": "Pro",
    "pricing.lifetime": "\u00c0 vie",
    "pricing.month": "mois",
    "pricing.subscribe": "S'abonner",
    "pricing.start_free": "Commencer gratuitement",

    "profile.title": "Profil",
    "profile.progress": "Progression",
    "profile.achievements": "Succ\u00e8s",
    "profile.certificate": "Certificat",

    "footer.rights": "Tous droits r\u00e9serv\u00e9s",
    "footer.courses_label": "Cours",
    "footer.platform_label": "Plateforme",
    "footer.help_label": "Aide",
  },
  es: {
    "nav.courses": "Cursos",
    "nav.problems": "Problemas",
    "nav.ege": "EGE",
    "nav.daily": "Desaf\u00edo diario",
    "nav.leaderboard": "Clasificaci\u00f3n",
    "nav.career": "Carrera",
    "nav.projects": "Proyectos",
    "nav.pricing": "Precios",
    "nav.profile": "Perfil",
    "nav.login": "Iniciar sesi\u00f3n",
    "nav.register": "Empezar gratis",
    "nav.logout": "Cerrar sesi\u00f3n",

    "hero.title1": "Aprende a",
    "hero.title2": "programar",
    "hero.title3": "y aprueba tus",
    "hero.title4": "ex\u00e1menes",
    "hero.subtitle": "Plataforma interactiva con tutor IA. Python desde cero hasta conseguir empleo.",
    "hero.cta": "Empezar gratis \u2192",
    "hero.cta2": "Preparaci\u00f3n Ex\u00e1menes",

    "common.loading": "Cargando...",
    "common.run": "\u25B6 Ejecutar",
    "common.check": "\u2713 Verificar",
    "common.hint": "Pista",
    "common.reset": "Reiniciar",
    "common.next": "Siguiente \u2192",
    "common.prev": "\u2190 Anterior",
    "common.submit": "Enviar",
    "common.correct": "\u00a1Correcto!",
    "common.incorrect": "Incorrecto",
    "common.passed": "Completado",

    "auth.login": "Iniciar sesi\u00f3n",
    "auth.register": "Registrarse",
    "auth.email": "Email",
    "auth.password": "Contrase\u00f1a",
    "auth.name": "Nombre",
    "auth.forgot": "\u00bfOlvidaste tu contrase\u00f1a?",
    "auth.no_account": "\u00bfNo tienes cuenta?",
    "auth.has_account": "\u00bfYa tienes cuenta?",
    "auth.create": "Crear cuenta",
    "auth.sending": "Enviando...",
    "auth.logging_in": "Iniciando sesi\u00f3n...",
    "auth.registering": "Registrando...",
    "auth.register_link": "Registrarse",
    "auth.login_link": "Iniciar sesi\u00f3n",
    "auth.enter_email_reset": "Ingresa tu email para restablecer la contrase\u00f1a",
    "auth.reset_sent_title": "Email enviado",
    "auth.reset_sent_desc": "El enlace para restablecer la contrase\u00f1a fue enviado a",
    "auth.reset_sent_hint": "Revisa tu bandeja de entrada. Si no lo encuentras, revisa la carpeta de spam.",
    "auth.back_to_login": "Volver al inicio de sesi\u00f3n",
    "auth.confirm_title": "\u00a1Revisa tu email!",
    "auth.confirm_desc": "Enviamos un enlace de confirmaci\u00f3n a",
    "auth.confirm_hint": "Haz clic en el enlace del email para activar tu cuenta.",
    "auth.go_to_login": "Ir al inicio de sesi\u00f3n",
    "auth.name_placeholder": "Tu nombre",
    "auth.password_placeholder": "M\u00ednimo 6 caracteres",

    "lesson.theory": "Lecci\u00f3n",
    "lesson.reference": "Referencia",
    "lesson.completed": "\u00a1Lecci\u00f3n completada!",
    "lesson.next_lesson": "Pasando a la siguiente lecci\u00f3n...",
    "lesson.all_done": "\u00a1Felicidades! \u00a1Has completado todas las lecciones!",

    "problems.title": "Problemas",
    "problems.solved": "Resueltos",
    "problems.easy": "F\u00e1cil",
    "problems.medium": "Media",
    "problems.hard": "Dif\u00edcil",
    "problems.acceptance": "Aceptaci\u00f3n",
    "problems.show_solution": "Mostrar soluci\u00f3n",
    "problems.show_hint": "Mostrar pista",

    "pricing.free": "Gratis",
    "pricing.pro": "Pro",
    "pricing.lifetime": "De por vida",
    "pricing.month": "mes",
    "pricing.subscribe": "Suscribirse",
    "pricing.start_free": "Empezar gratis",

    "profile.title": "Perfil",
    "profile.progress": "Progreso",
    "profile.achievements": "Logros",
    "profile.certificate": "Certificado",

    "footer.rights": "Todos los derechos reservados",
    "footer.courses_label": "Cursos",
    "footer.platform_label": "Plataforma",
    "footer.help_label": "Ayuda",
  },
};

export const localeNames: Record<Locale, string> = {
  ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  en: "English",
  fr: "Fran\u00e7ais",
  es: "Espa\u00f1ol",
};

export const localeFlags: Record<Locale, string> = {
  ru: "\ud83c\uddf7\ud83c\uddfa",
  en: "\ud83c\uddec\ud83c\udde7",
  fr: "\ud83c\uddeb\ud83c\uddf7",
  es: "\ud83c\uddea\ud83c\uddf8",
};

export function t(key: string, locale: Locale): string {
  return translations[locale]?.[key] ?? translations["ru"]?.[key] ?? key;
}

export function detectLocaleFromTimezone(): Locale {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("Europe/Moscow") || tz.startsWith("Europe/Minsk") || tz.startsWith("Asia/Yekaterinburg")) return "ru";
    if (tz.startsWith("Europe/Paris") || tz.startsWith("Europe/Brussels") || tz.startsWith("Africa/")) return "fr";
    if (tz.startsWith("Europe/Madrid") || tz.startsWith("America/Mexico") || tz.startsWith("America/Buenos") || tz.startsWith("America/Bogota") || tz.startsWith("America/Lima")) return "es";
    if (tz.startsWith("America/") || tz.startsWith("Europe/London") || tz.startsWith("Australia/") || tz.startsWith("Asia/Singapore")) return "en";
  } catch {
    // ignore
  }

  // Fallback: check browser language
  try {
    const lang = navigator.language?.slice(0, 2);
    if (lang === "ru" || lang === "uk" || lang === "be") return "ru";
    if (lang === "fr") return "fr";
    if (lang === "es") return "es";
    if (lang === "en") return "en";
  } catch {
    // ignore
  }

  return "ru";
}
