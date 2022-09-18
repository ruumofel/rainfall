const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

global.expect = chai.expect;
global.sinon = sinon;

const mockResponseBody = require('./fixtures/mockResponse.json');
  const { getStation, getRainfall, getNameloc, getRainfallStatus, getReadingunit, getTimestamp, request } = require(".");


describe('index', () => {
    let sandbox;
    let err;
    let response;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        process.env.URL = "https://api.data.gov.sg/v1/environment/rainfall/";
        process.env.LOCNAME = "Marina Gardens Drive";
    });

    afterEach(() => {
        sandbox.restore();
        opts = null;
    });

    it('should return expected result from getStation', async () => {
        let locName = process.env.LOCNAME;
        const result = await getStation(err, response, JSON.stringify(mockResponseBody), locName);

        const expectedResult = "S108";

        expect(result).to.deep.equal(expectedResult);
    });

    it('should return expected result from getNameloc', async () => {
        let locName = process.env.LOCNAME;
        JSON.parse
        const result = await getNameloc(err, response, JSON.stringify(mockResponseBody), locName);

        const expectedResult = "Marina Gardens Drive";

        expect(result).to.deep.equal(expectedResult);
    });

    it('should return expected result from getRainfall', async () => {
        let station = 'S108';
        JSON.parse
        const result = await getRainfall(err, response, JSON.stringify(mockResponseBody), station);

        const expectedResult = 0;

        expect(result).to.deep.equal(expectedResult);
    });

    it('should return expected result from getrainfallStatus', async () => {
        let value = 0;
        const result = await getRainfallStatus(value);
        const expectedResult = 'Not Rainning';

        expect(result).to.deep.equal(expectedResult);
    });

    it('should return expected result from getReadingunit', async () => {
        JSON.parse
        const result = await getReadingunit(err,response,JSON.stringify(mockResponseBody));
        const expectedResult = 'mm';

        expect(result).to.deep.equal(expectedResult);
    });

    it('should return expected result from getTimestamp', async () => {
        JSON.parse
        const result = await getTimestamp(err,response,JSON.stringify(mockResponseBody));
        const expectedResult = '2022-09-18T16:40:00+08:00';

        expect(result).to.deep.equal(expectedResult);
    });


});