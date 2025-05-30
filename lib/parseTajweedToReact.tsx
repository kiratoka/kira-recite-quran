"use client";

import { TajweedWord } from "@/components/SurahPage/TajweedWord";
import parse from "html-react-parser";

export function parseTajweedToReact(html: string) {
  return parse(html, {
    replace: (domNode: any) => {
      if (
        domNode.name === "tajweed" &&
        domNode.attribs?.["data-type"] &&
        domNode.attribs?.["data-description"]
      ) {
        const type = domNode.attribs["data-type"];
        const desc = domNode.attribs["data-description"];
        const text = domNode.children?.[0]?.data || "";
        const className = domNode.attribs?.["class"] || "";

        return (
          <TajweedWord type={type} description={desc} className={className}>
            {text}
          </TajweedWord>
        );
      }
    },
  });
}