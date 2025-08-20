import { json } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { join } from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { group } = params;
    
    if (!group) {
      return json({ error: 'Group parameter is required' }, { status: 400 });
    }

    // Path to the layer directory
    const layerPath = join(process.cwd(), 'static', 'layers', group);
    
    // Read the directory
    const files = await readdir(layerPath);
    
    // Filter for PNG files only
    const pngFiles = files.filter(file => file.endsWith('.png'));
    
    console.log(`Found ${pngFiles.length} PNG files in ${group}:`, pngFiles);
    
    return json(pngFiles);
  } catch (error) {
    console.error(`Error reading layer directory for ${params.group}:`, error);
    return json({ error: 'Failed to read layer directory' }, { status: 500 });
  }
};
