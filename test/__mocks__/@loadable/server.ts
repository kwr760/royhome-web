export class ChunkExtractor {
  collectChunks = () => { return '<div>Chunks</div>'; };
  getScriptTags = () => { return '<div>Scripts</div>'; };
  getLinkTags = () => { return '<div>Links</div>'; };
  getStyleTags = () => { return '<div>Styles</div>'; };
  requireEntrypoint = () => ({ default: () => {}});
}
