/**
 * @file AwarenessPointCard.tsx
 * @description A component that displays a single awareness point in a card format.
 * It shows an emoji, the awareness text, and a textual suggestion for a related image.
 */

import React from 'react';
import { AwarenessPoint } from '../../types';
import Card from '../common/Card';
import { useLanguage } from '../../contexts/LanguageContext';

// Define the props for the AwarenessPointCard component.
interface AwarenessPointCardProps {
  point: AwarenessPoint;
}

const AwarenessPointCard: React.FC<AwarenessPointCardProps> = ({ point }) => {
  const { translate } = useLanguage();
  // The placeholder image URL using an external service has been removed to avoid broken images.
  // const placeholderImageUrl = `https://picsum.photos/seed/${encodeURIComponent(point.imageSuggestion.slice(0,20) + point.id)}/300/200`;

  return (
    <Card className="flex flex-col h-full shadow-lg border border-gray-100 bg-white" hoverEffect>
      <div className="p-5 text-center">
        {/* The emoji provides a quick visual cue for the awareness point. */}
        <div className="text-5xl mb-3" aria-hidden="true">{point.emoji}</div>
        
        {/* The main awareness text. */}
        <p className="text-gray-700 text-base mb-4 leading-relaxed">{point.awarenessText}</p>
        
        {/* The section for the AI's image suggestion. */}
        <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-semibold text-teal-600 mb-2">{translate('imageSuggestion')}:</h4>
            {/* The actual image is not rendered; only the textual description is shown. */}
            <p className="text-xs text-gray-500 italic p-2 bg-gray-50 rounded">{point.imageSuggestion}</p>
        </div>

        {/* Optional section for debugging, showing the raw AI response for this point. */}
        {point.rawResponse && (
            <details className="mt-4 text-xs text-gray-400 text-left">
                <summary className="cursor-pointer">View Raw AI Data (Debug)</summary>
                <pre className="whitespace-pre-wrap bg-gray-50 p-1 rounded max-h-32 overflow-y-auto">{point.rawResponse}</pre>
            </details>
        )}
      </div>
    </Card>
  );
};

export default AwarenessPointCard;