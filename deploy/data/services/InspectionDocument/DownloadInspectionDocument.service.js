"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mime = require('mime'); var _mime2 = _interopRequireDefault(_mime);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _url = require('url'); var _url2 = _interopRequireDefault(_url);
var _repositories = require('../../database/repositories');

 class DownloadInspectionDocumentService {
  async execute({ nm_file, req, res }) {

    const file = `${__dirname}/../../../../tmp/inspection_documents/${nm_file}`;

    // Parsing the URL
    const request = _url2.default.parse(req.url, true);

    // Extracting the path of file
    const action = request.pathname;
    _fs2.default.exists(file, function(exists) {
      if (!exists) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('404 Not Found');
        return;
      }

      // Extracting file extension
      const ext = _path2.default.extname(action);

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
      _fs2.default.readFile(file, function(err, content) {
        // Serving the image
        res.end(content);
      });
    });
    return;
  }
} exports.DownloadInspectionDocumentService = DownloadInspectionDocumentService;
