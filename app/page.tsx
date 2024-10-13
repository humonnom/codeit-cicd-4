"use client";

import React, { useState, useEffect } from "react";

type Locale = "en" | "ko";

type Translations = {
  [key: string]: {
    [K in Locale]: string;
  };
};

const translations: Translations = {
  "App Router": {
    en: "App Router",
    ko: "앱 라우터",
  },
};

interface TranslateProps {
  children: string;
}

const Translate: React.FC<TranslateProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") as Locale | null;
    setLocale(storedLocale || "en");
  }, []);

  const translate = (text: string): string => {
    if (translations[text] && translations[text][locale]) {
      return translations[text][locale];
    }
    // preview를 확인하는 QA에게 더 많은 정보를 제공해주세요.
    if (process.env.ENVIRONMENT === "production") {
      return text;
    }
    return `${text}(경고: 이 문구는 번역되지 않았습니다.)`;
  };

  return <p>{translate(children)}</p>;
};

const Page: React.FC = () => {
  return (
    <div>
      <Translate>App Router</Translate>
      <Translate>Hello world!</Translate>
    </div>
  );
};

export default Page;
