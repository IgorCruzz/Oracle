import mime from 'mime';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { InspectionDocumentRepository } from '../../database/repositories';

export class DownloadInspectionDocumentService {
  async execute({ nm_file, req, res }) {

    const file = `${__dirname}/../../../../tmp/inspection_documents/${nm_file}`;

    // Parsing the URL
    const request = url.parse(req.url, true);

    // Extracting the path of file
    const action = request.pathname;
    fs.exists(file, function(exists) {
      if (!exists) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('404 Not Found');
        return;
      }

      // Extracting file extension
      const ext = path.extname(action);

      // Setting default Content-Type
      let contentType = 'text/plain';

      // Checking if the extension of
      // image is '.png'
      if (ext === '.jpg') {
        contentType = 'image/jpeg';
      }
      const SUPPORTED_FORMATS = {
        '.jpg' : 'image/jpg',
        '.jpeg' : 'image/jpeg',
        '.gif' : 'image/gif',
        '.png' : 'image/png',
        '.avi' : 'video/x-msvideo',
        '.mpeg' : 'video/mpeg',
        '.ogg' : 'video/ogg',
        '.webm' : 'video/webm',
        '.mp4' : 'video/mp4'      
      };      
      // Setting the headers
      res.writeHead(200, {
        'Content-Type': SUPPORTED_FORMATS[ext],
      });

      // Reading the file
      fs.readFile(file, function(err, content) {
        // Serving the image
        res.end(content);
      });
    });
    return;
  }
}
