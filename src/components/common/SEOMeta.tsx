import React, { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  schemaJson?: object | object[];
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
  publishedTime,
  modifiedTime,
  authorName = 'Business Opportunity Hub Editorial Team',
  schemaJson,
}) => {
  useEffect(() => {
    // Set document title
    document.title = title.includes('Business Opportunity Hub') ? title : `${title} | Business Opportunity Hub`;

    // Helper to set meta
    const setMeta = (nameAttr: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Business Opportunity Hub');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    if (publishedTime) setMeta('property', 'article:published_time', publishedTime);
    if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
    if (authorName) setMeta('property', 'article:author', authorName);

    // Dynamic JSON-LD script tag
    const schemaId = 'seo-schema-script';
    let scriptElem = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schemaJson) {
      if (!scriptElem) {
        scriptElem = document.createElement('script');
        scriptElem.id = schemaId;
        scriptElem.type = 'application/ld+json';
        document.head.appendChild(scriptElem);
      }
      scriptElem.textContent = JSON.stringify(schemaJson);
    } else if (scriptElem) {
      scriptElem.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, publishedTime, modifiedTime, authorName, schemaJson]);

  return null;
};
