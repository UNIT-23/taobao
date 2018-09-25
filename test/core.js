const lib = '../' + (process.env.CODE_COV ? 'lib-cov' : 'lib')

const core = require(lib + '/core')

const chai = require('chai')

const expect = chai.expect

const appKey = '23333843'

const appSecret = 'c4bba86a87a44e7a35517467488c7303'

chai.should()

describe('core.js', function () {
  describe('config()', function () {
    it('should change core\'s config successfully', function (done) {
      core.config({
        'app_key'   : appKey,
        'app_secret': appSecret
      })

      const cfg = core.getConfig()

      expect(cfg).to.be.an('object')
      expect(cfg.app_key).to.equal(appKey)
      expect(cfg.app_secret).to.equal(appSecret)

      done()
    })
  })

  describe('call()', function () {
    it('should get areas successfully with default http config',
      function (done) {
        this.timeout(100000)

        core.call({
          method: 'taobao.areas.get',
          fields: 'id,type,name,parent_id,zip'
        }, function (data) {
          expect(data).to.be.an('object')
          expect(data.areas_get_response).to.be.an('object')
          expect(data.areas_get_response.areas).to.be.an('object')
          expect(data.areas_get_response.areas.area).to.be.an('array')
          expect(data.areas_get_response.areas.area).to.have.length.above(0)
          expect(data.areas_get_response.areas.area[0])
            .to.contain.keys('id', 'name', 'parent_id', 'type')
          done()
        })
      })

    it('should get areas successfully with https', function (done) {
      this.timeout(100000)

      core.call({
        protocol: 'https'
      }, {
        method: 'taobao.areas.get',
        fields: 'id,type,name,parent_id,zip'
      }, function (data) {
        expect(data).to.be.an('object')
        expect(data.areas_get_response).to.be.an('object')
        expect(data.areas_get_response.areas).to.be.an('object')
        expect(data.areas_get_response.areas.area).to.be.an('array')
        expect(data.areas_get_response.areas.area).to.have.length.above(0)
        expect(data.areas_get_response.areas.area[0])
          .to.contain.keys('id', 'name', 'parent_id', 'type')
        done()
      })
    })

    it('should fail when get areas using http POST method', function (done) {
      this.timeout(100000)

      core.call({
        method: 'post'
      }, {
        method: 'taobao.areas.get',
        fields: 'id,type,name,parent_id,zip'
      }, function (data) {
        expect(data).to.be.an('object')
        expect(data.error_response).to.be.an('object')
        expect(data.error_response.statusCode).to.equal(411)

        done()
      })
    })
  })

  describe('generateApi()', function () {
    let api

    it('should generate api as expected', function (done) {
      api = core.generateApi([
        'areas.get'
      ])

      expect(api).to.be.an('object')
      expect(api).to.contain.keys('areasGet')
      expect(api.areasGet).to.be.an('function')

      done()
    })

    it('should success when call with generatedApi', function (done) {
      this.timeout(100000)
      api.areasGet({
        fields: 'id,type,name,parent_id,zip'
      }, function (data) {
        expect(data).to.be.an('object')
        expect(data.areas_get_response).to.be.an('object')
        expect(data.areas_get_response.areas).to.be.an('object')
        expect(data.areas_get_response.areas.area).to.be.an('array')
        expect(data.areas_get_response.areas.area).to.have.length.above(0)
        expect(data.areas_get_response.areas.area[0])
          .to.contain.keys('id', 'name', 'parent_id', 'type')

        done()
      })
    })
  })
})
