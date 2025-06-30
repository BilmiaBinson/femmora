/**
 * @file successStoriesData.ts
 * @description This file defines the data structure for success stories and exports
 * a placeholder array. In a real application, this file would be populated with
 * actual success story data, or it would be replaced by an API call to fetch this data.
 */
import { Language } from '../types'; // Assuming Language might be used later

// Define the structure for a single success story.
export interface SuccessStory {
  id: string;
  title: { [lang in Language]: string };
  description: { [lang in Language]: string };
  imageUrl?: string;
  videoUrl?: string; // e.g., A YouTube link
  tags?: string[];
}

// This is a placeholder for actual success story data.
// It is currently empty but structured to be populated later.
export const successStories: SuccessStory[] = [];

export default successStories;