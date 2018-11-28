const taobao = require('../index')

const chai = require('chai')

const expect = chai.expect

const APP_KEY = '23333843'

const APP_SECRET = 'c4bba86a87a44e7a35517467488c7303'

chai.should()

describe('taobao.js', function () {
  describe('config()', function () {
    it('should change core\'s config successfully', function (done) {
      taobao.config({
        'app_key'   : APP_KEY,
        'app_secret': APP_SECRET
      })

      const cfg = taobao.core.getConfig()

      expect(cfg).to.be.an('object')
      expect(cfg.app_key).to.equal(APP_KEY)
      expect(cfg.app_secret).to.equal(APP_SECRET)

      done()
    })
  })

  describe('call()', function () {
    it('should get areas successfully with default http config',
      function (done) {
        this.timeout(100000)

        taobao.core.call({
          method: 'taobao.areas.get',
          fields: 'id,type,name,parent_id,zip'
        })
          .then(data => {
            expect(data).to.be.an('object')
            expect(data.areas_get_response).to.be.an('object')
            expect(data.areas_get_response.areas).to.be.an('object')
            expect(data.areas_get_response.areas.area).to.be.an('array')
            expect(data.areas_get_response.areas.area).to.have.length.above(0)
            expect(data.areas_get_response.areas.area[0])
              .to.contain.keys('id', 'name', 'parent_id', 'type')

            done()
          })
          .catch(done)
      })

    it('should get areas successfully with https', function (done) {
      this.timeout(100000)

      taobao.core.call({
        protocol: 'https'
      }, {
        method: 'taobao.areas.get',
        fields: 'id,type,name,parent_id,zip'
      })
        .then(data => {
          expect(data).to.be.an('object')
          expect(data.areas_get_response).to.be.an('object')
          expect(data.areas_get_response.areas).to.be.an('object')
          expect(data.areas_get_response.areas.area).to.be.an('array')
          expect(data.areas_get_response.areas.area)
            .to.have.length.above(0)
          expect(data.areas_get_response.areas.area[0])
            .to.contain.keys('id', 'name', 'parent_id', 'type')
          done()
        })
        .catch(done)
    })

    it('should get areas successfully using http POST method', function (done) {
      this.timeout(100000)
      taobao.config({
        'app_key'   : APP_KEY,
        'app_secret': APP_SECRET
      })
      taobao.core.call({
        method: 'post'
      }, {
        method: 'taobao.areas.get',
        fields: 'id,type,name,parent_id,zip'
      })
        .then(data => {
          expect(data).to.be.an('object')
          expect(data.areas_get_response).to.be.an('object')
          expect(data.areas_get_response.areas).to.be.an('object')
          expect(data.areas_get_response.areas.area).to.be.an('array')
          expect(data.areas_get_response.areas.area)
            .to.have.length.above(0)
          expect(data.areas_get_response.areas.area[0])
            .to.contain.keys('id', 'name', 'parent_id', 'type')

          done()
        })
        .catch(done)
    })
  })

  describe('generateApi()', function () {
    let api

    it('should generate api as expected', function (done) {
      api = taobao.core.generateApi([
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
      })
        .then(data => {
          expect(data).to.be.an('object')
          expect(data.areas_get_response).to.be.an('object')
          expect(data.areas_get_response.areas).to.be.an('object')
          expect(data.areas_get_response.areas.area).to.be.an('array')
          expect(data.areas_get_response.areas.area).to.have.length.above(0)
          expect(data.areas_get_response.areas.area[0])
            .to.contain.keys('id', 'name', 'parent_id', 'type')

          done()
        })
        .catch(done)
    })
  })
})
