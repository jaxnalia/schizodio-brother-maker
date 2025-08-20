import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    console.log('Tweet API called - starting...');
    
    const { imageData, text } = await request.json();
    
    console.log('Request data received:', { 
      hasImageData: !!imageData, 
      imageDataLength: imageData?.length,
      text 
    });

    // Simple success response
    return json({
      success: true,
      message: 'API working! (Minimal test)',
      data: {
        receivedText: text,
        imageDataLength: imageData?.length,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error in tweet API:', error);
    return json({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
};
