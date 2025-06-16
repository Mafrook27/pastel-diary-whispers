
export const analyzeEntry = async (entryText) => {
  try {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Analyze entry text for keywords to provide more relevant responses
    const lowerText = entryText.toLowerCase();
    
    let mood = 'neutral';
    let summary = '';
    let support = '';
    
    // Determine mood based on keywords
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited') || lowerText.includes('great')) {
      mood = 'happy';
      summary = 'Your words radiate positivity and happiness! It sounds like you\'re experiencing wonderful moments.';
      support = 'Your joy is beautiful to witness. Keep embracing these positive feelings and remember to celebrate the good moments in life! ✨🌟';
    } else if (lowerText.includes('sad') || lowerText.includes('cry') || lowerText.includes('upset') || lowerText.includes('down')) {
      mood = 'sad';
      summary = 'I can sense you\'re going through a difficult time. Your feelings are completely valid.';
      support = 'It\'s okay to feel sad sometimes. These emotions are part of being human. Remember that you\'re stronger than you know, and this feeling will pass. You\'re not alone. 💙🤗';
    } else if (lowerText.includes('anxious') || lowerText.includes('worry') || lowerText.includes('nervous') || lowerText.includes('stress')) {
      mood = 'anxious';
      summary = 'I notice some worry and tension in your words. Anxiety can feel overwhelming sometimes.';
      support = 'Take a deep breath and remember that anxiety is temporary. You have the inner strength to navigate through this. Consider some calming activities like deep breathing or a gentle walk. 🌸💚';
    } else if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated') || lowerText.includes('annoyed')) {
      mood = 'angry';
      summary = 'I can feel the frustration in your words. It sounds like something has really bothered you today.';
      support = 'Your anger is valid, and it\'s important to acknowledge these feelings. Try to channel this energy into something positive when you\'re ready. You\'ve got this! 🔥💪';
    } else if (lowerText.includes('love') || lowerText.includes('grateful') || lowerText.includes('thankful') || lowerText.includes('blessed')) {
      mood = 'grateful';
      summary = 'Your heart seems full of gratitude and love. What a beautiful way to see the world!';
      support = 'Your gratitude is inspiring! Focusing on what we\'re thankful for brings so much light into our lives. Keep nurturing that grateful heart! 🙏💖';
    } else if (lowerText.includes('excited') || lowerText.includes('amazing') || lowerText.includes('fantastic') || lowerText.includes('awesome')) {
      mood = 'excited';
      summary = 'Your excitement is contagious! I can feel your enthusiasm radiating through your words.';
      support = 'Your energy is absolutely wonderful! It\'s beautiful to see you so passionate and excited about life. Keep that spark alive! 🎉⭐';
    } else if (lowerText.includes('peaceful') || lowerText.includes('calm') || lowerText.includes('serene') || lowerText.includes('tranquil')) {
      mood = 'peaceful';
      summary = 'There\'s a sense of calm and peace in your words. You seem to be in a centered place right now.';
      support = 'Your inner peace is beautiful. Hold onto this tranquil feeling and let it guide you through your day. 🕊️🌿';
    } else {
      // Default neutral response
      summary = 'Thank you for sharing your thoughts with me. Every entry is a step in your personal journey.';
      support = 'Your thoughts and feelings matter. I\'m here to listen and support you no matter what you\'re going through. 💖✨';
    }
    
    return {
      mood,
      summary,
      support
    };
  } catch (error) {
    console.error('AI analysis failed:', error);
    return {
      mood: 'neutral',
      summary: 'Unable to analyze your entry right now, but your thoughts are important.',
      support: 'Your feelings are valid and meaningful, regardless of analysis. Keep expressing yourself! 💖'
    };
  }
};
