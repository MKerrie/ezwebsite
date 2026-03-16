import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  tags: string[];
  longDescription: string;
  highlights: string[];
  url?: string;
  images?: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}