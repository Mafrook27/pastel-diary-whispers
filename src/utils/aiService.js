
export const analyzeEntry = async (entryText) => {
  try {
    // Mock AI service - replace with actual API call
    // const response = await fetch('/api/ai/analyze', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text: entryText })
    // });
    
    // Mock response for demonstration
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    const mockResponses = [
      {
        mood: 'happy',
        summary: 'You seem to be having a wonderful day filled with positivity!',
        support: 'It\'s beautiful to see you embracing joy. Keep nurturing these positive moments! 🌟'
      },
      {
        mood: 'sad',
        summary: 'It sounds like you\'re going through a challenging time.',
        support: 'Remember that it\'s okay to feel sad sometimes. You\'re stronger than you know, and this feeling will pass. 💙'
      },
      {
        mood: 'excited',
        summary: 'Your excitement and enthusiasm really shine through!',
        support: 'Your energy is contagious! It\'s wonderful to see you so passionate about life. ✨'
      },
      {
        mood: 'anxious',
        summary: 'I can sense some worry and tension in your words.',
        support: 'Take a deep breath. Anxiety is temporary, and you have the strength to work through this. 🌸'
      }
    ];
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  } catch (error) {
    console.error('AI analysis failed:', error);
    return {
      mood: 'neutral',
      summary: 'Unable to analyze your entry right now.',
      support: 'Your thoughts are valid and important, regardless of analysis. 💖'
    };
  }
};
