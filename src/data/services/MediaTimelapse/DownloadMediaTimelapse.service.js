import mime from 'mime';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { MediaTimelapseRepository } from '../../database/repositories';

export class DownloadMediaTimelapseService {
  async execute({ id_media_timelapse, res, req }) {
    const repository = new MediaTimelapseRepository();

    const findMediaTimelapse = await repository.findMediaTimelapseById({
      id_media_timelapse,
      populate: true,
    });
    if (!findMediaTimelapse)
      return {
        error: `Não há nenhuma media registrada com este ID -> ${id_media_timelapse}.`,
      };

    const file = `${__dirname}/../../../../tmp/media_timelapses/${findMediaTimelapse.nm_file}`;

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

      // Setting the headers
      res.writeHead(200, {
        'Content-Type': 'image/jpg',
      });

      // Reading the file
      fs.readFile(file, function(err, content) {
        // Serving the image
        res.end(content);
      });
    });
    return;
    const filename = path.basename(file); // 'IMG0001.JPG';
    const mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', mimetype);

    const filestream = fs.createReadStream(file);
    filestream.pipe(res);
  }
}
