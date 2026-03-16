import React, { useEffect } from 'react';
import { useInView } from 'framer-motion';

export const useSEO = (ref: React.RefObject<HTMLElement | null>, title: string, description: string) => {
  const isInView = useInView(ref, { amount: 0.3 }); // Trigger when 30% of the section is visible

  useEffect(() => {
    if (isInView) {
      document.title = title;

      // Update or create meta description
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }
  }, [isInView, title, description]);
};