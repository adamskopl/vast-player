export { play };

const { VASTParser } = VAST;
const vastParser = new VASTParser();

async function play(vastURL) {
  let VASTError = null;
  vastParser.on('VAST-error', ({ ERRORCODE }) => {
    VASTError = ERRORCODE;
  });
  const parsed = await vastParser.getAndParseVAST(vastURL);
  const firstMediaFile =
    parsed.ads?.[0]?.creatives?.[0]?.mediaFiles?.[0]?.fileURL;
  if (VASTError || !firstMediaFile) {
    throw new Error(VASTError ? `VAST-error ${VASTError}` : 'VAST no fileURL');
  }
  return firstMediaFile;
}
