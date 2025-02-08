import API_KEY from './config.js';

const quoteText = document.getElementById('quote-text');
const generateBtn = document.getElementById('generate-btn');
const quoteType = document.getElementById('quote-type');
const quoteDisplay = document.querySelector('.quote-display');

async function generateQuote() {
    try {
        generateBtn.disabled = true;
        quoteText.textContent = 'Generating your quote...';

        const prompt = `Generate a short ${quoteType.value} quote (max 2 sentences). Make it engaging and meaningful.`;

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 1,
                    topP: 0.8,
                    maxOutputTokens: 50,
                }
            })
        });

        const data = await response.json();
        const generatedQuote = data.candidates[0].content.parts[0].text;
        quoteText.textContent = generatedQuote.replace(/^["']|["']$/g, '');
    } catch (error) {
        quoteText.textContent = 'Failed to generate quote. Please try again.';
        console.error('Error:', error);
    } finally {
        generateBtn.disabled = false;
    }
}

generateBtn.addEventListener('click', generateQuote);
