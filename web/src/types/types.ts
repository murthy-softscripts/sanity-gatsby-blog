declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

import { FixedObject } from 'gatsby-image';

declare interface IPerson {
  firstName: string;
  lastName: string;
  title: string;
  featured: boolean;
  gallery: boolean;
  image: {
    asset: {
      url: string;
      localImage: {
        childImageSharp: {
          fixed: FixedObject;
        };
      };
    };
  };
}
declare interface ISite {
  title: string;
  description: string;
  enlisteeCount: number;
  keywords: string[];
}

declare interface IMagazinePost {
  id: string;
  publishedAt: Date;
  featured: boolean;
  mainImage: {
    crop: {
      _key: string;
      _type: string;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot: {
      _key: string;
      _type: string;
      x: number;
      y: number;
      height: number;
      width: number;
    };
    asset: {
      _id: string;
    };
    alt: string;
  };
  title: string;
  authors: {
    author: IAuthor;
  }[];
  categories: ICategory[];
  _rawExcerpt: string;
  _rawBody: object;
  slug: {
    current: string;
  };
}

declare interface IAuthor {
  name: string;
  title: string;
  featured: boolean;
  gallery: boolean;
  image: {
    asset: {
      url: string;
      localImage: {
        childImageSharp: {
          fixed: {
            src: string;
          };
        };
      };
    };
  };
}

declare interface ISocial {
  nodes: {
    enabled: true;
    shareable: true;
    icon: {
      asset: {
        localImage: {
          url: string;
        };
      };
    };
    name: string;
    url: string;
    shareUrl: string;
  }[];
}

declare interface IPrevNextPosts {
  edges: {
    previous: {
      slug: {
        current: string;
      };
      id: string;
      publishedAt: string;
    };
    next: {
      slug: {
        current: string;
      };
      id: string;
      publishedAt: string;
    };
    node: {
      slug: {
        current: string;
      };
      id: string;
      publishedAt: string;
    };
  };
}

declare interface ICategory {
  _id: string;
  id: string;
  title: string;
  slug: {
    current: string;
  };
}
declare interface IStream {
  id: string;
  url: string;
  title: string;
  startTime: string;
  endTime: string;
  disabled: boolean;
}

export declare interface ISplashData {
  title: string;
  url: string;
  _rawBody: any;
  enabled: boolean;
  enableVideo: boolean;
  enableBody: boolean;
  _rawSnippet: any;
}
