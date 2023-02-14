import { NextApiRequest, NextApiResponse } from 'next';
import { LineGraphData } from '../../../types/types';

export default async (req: NextApiRequest, res: NextApiResponse<LineGraphData>) => {
    const { query: { pair } } = req;
  
    const raw = await fetch(`https://www.bitstamp.net/api/v2/ticker/${pair}`);
    const data = await raw.json();
    const obj = {
      timestamp: data.timestamp,
      last: data.last,
    };
    console.log(obj);
  
    res.setHeader('Content-Type', 'application/json'); 
    res.statusCode = 200; 
    res.end(JSON.stringify(obj)); 
  };
  