"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Locale = "en" | "ko";

interface I18nContextProps {
  locale: Locale;
  messages: Record<string, string>;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadMessages() {
      const response = await fetch(`/locales/${locale}/common.json`);
      const data = await response.json();
      setMessages(data);
    }
    loadMessages();
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}