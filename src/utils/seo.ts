import { ListArticleResponseItem } from "./queryCms"

export const companyLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "K7-Konzept Karlsruhe GmbH",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Roonstraße 23a",
    addressLocality: "Karlsruhe",
    postalCode: "76137",
    addressCountry: "DE"
  },
  logo: {
    "@type": "ImageObject",
    url: "https://cms.k-7.eu/uploads/g8_00693065cc.svg"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    email: "info@k-7.eu",
    contactType: "customer service",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "08:00",
      closes: "18:00"
    },
  },
  duns: "344448617",
  foundingDate: "2022-12-01",
  legalName: "K7-Konzept Karlsruhe GmbH",
  url: "https://k-7.eu",
  knowsLanguage: "de,en",
  slogan: "K7 - Weil wir Technik lieben"
}

export const createBreadcrumbLd = (type: string, title: string, id: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: type,
        item: `https://k-7.eu/${type}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `https://k-7.eu/${type}/${id}`
      }
    ]
  }
}

export const createArticleLd = (type: string, id: string, entry: ListArticleResponseItem) => {
  const cover = import.meta.env.VITE_CMS + (entry?.cover?.data?.attributes?.formats?.small.url ?? entry?.cover?.data.attributes?.url)
  const thumbnail = import.meta.env.VITE_CMS + (entry?.cover?.data?.attributes?.formats?.thumbnail.url ?? entry?.cover?.data.attributes?.url)
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://k-7.eu/${type}/${id}`
    },
    headline: entry.title,
    image: cover,
    dateCreated: entry.createdAt,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt,
    author: {
      "@type": "Person",
      name: entry.author?.data.attributes.name
    },
    publisher: companyLd,
    description: entry.description,
    copyRightHolder: companyLd,
    keywords: entry.tags,
    thumnailUrl: thumbnail,
    inLanguage: entry.locale
  }
}