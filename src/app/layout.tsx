import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../scss/global.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import StoreProvider from "./StoreProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Anyboost',
    template: '%s | Anyboost'
  },
  description: "Буст в КС 2 с Anyboost позволяет получить Всемирную Элиту в матчмейкинге, до 3500 elo на Faceit, Золотой ранг в Premier и огромный игровой опыт в играх с нашей командой!",
  other: {
    enot: "821a8e52",
    "lava-verify": "3d64b9f0daa43f61",
    "selfwork.ru": "DxOvbTQQZtW3cuP8wXpxEu0qYby4q153y8nIKn8r4eZsmwaDEC"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){ var widget_id = 'KqQ6wSJmIX';var d=document;var w=window;function l(){
              var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
              s.src = '//code.jivosite.com/script/widget/'+widget_id
              +'/jivosite.js'; var ss = document.getElementsByTagName('script')[0];
              ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{
              if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
            `,
          }}
        />
      </head>
      <body className={montserrat.className}>
        <div className="wrapper">
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
