"use client"

/*
    Next.js는 next.config.js 파일을 통해 i18n 설정을 할 수 있다.

    // next.config.js
    module.exports = {
        i18n: {
            locales: ['en', 'ko', 'fr'],  // 지원할 언어 목록
            defaultLocale: 'en',  // 기본 언어
        },
    }
    next-i18next 설치
    ```
    npm install next-i18next
    npm install i18next react-i18next next-i18next
    ```

    리소스 파일 생성
    ```
    /public
        /locales
            /en
                common.json
            /ko
                common.json
            /fr
                common.json
    ```

    common.json 예시:
    ```
    {
     "greeting": "Hello",
     "welcome_message": "Welcome to our website"
    }
    ```

*/


import { useI18n } from "../../providers/i18nProvider";

export default function page() {
    const { locale, messages, setLocale } = useI18n();

  return (
    <div>

      <h1>{messages["greeting"]}</h1>
      <p>{messages["welcome_message"]}</p>
    </div>
  )
}