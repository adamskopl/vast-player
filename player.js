export { play };
const { VASTClient, VASTParser } = VAST;

const vastClient = new VASTClient();
const vastParser = new VASTParser();

const testLink =
  'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%204.2%20Samples/Category-test.xml';

async function play() {
  const vastXML = await vastClient.get(testLink);
  const parsed = await vastParser.getAndParseVAST(testLink);
  console.warn(parsed);
  // const media = parsed.ads ? [0];

  const firstMediaFile = console.warn(
    parsed.ads?.[0]?.creatives?.[0]?.mediaFiles?.[0]
  );
  console.warn(firstMediaFile?.fileURL);
  // console.warn(parsed);
  // .then((vastXML) => {})
  // .catch((err) => {
  //     // TODO handle error
  // });
}

play().catch((e) => {
  console.error(e);
});
