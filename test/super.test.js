var config = require('../config');
var request = require('request');
var expect = require('expect.js');

describe('Super', function() {

  var id;

  describe('POST /supers', function() {
    it('should create a super', function(done) {
      request({
        url: config.node.address + "/supers",
        method: 'POST',
        json: true,
        body: {
          name: 'testSuper',
          address: 'testAddress',
          phone: 'testPhone',
          fax: 'testFax'
        }
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.have.property('message');
        expect(body.message).to.be('Super created!');
        expect(body).to.have.property('id');
        expect(body.id).to.be.a('string');

        id = body.id;

        done();
      });
    });

    it('should return error if exists', function(done) {
      request({
        url: config.node.address + "/supers",
        method: 'POST',
        json: true,
        body: {
          name: 'testSuper',
          address: 'testAddress',
          phone: 'testPhone',
          fax: 'testFax'
        }
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.have.property('message');
        expect(body.message).to.be('This super already exists');

        done();
      });
    });
  });

  describe('GET /supers', function(){
    it('should return a list of supers', function(done) {
      request({
        url: config.node.address + "/supers",
        method: 'GET',
        json: true
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.be.an('array');
        expect(body.length).to.be.above(0);

        done();
      });
    });
  });

  describe('GET /supers/:super_id', function(){
    it('should return a super', function(done) {

      expect(id).not.to.be(null);

      request({
        url: config.node.address + "/supers/" + id,
        method: 'GET',
        json: true
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.have.property('name');
        expect(body).to.have.property('address');
        expect(body).to.have.property('phone');
        expect(body).to.have.property('fax');
        expect(body.name).to.be('testSuper');
        expect(body.address).to.be('testAddress');
        expect(body.phone).to.be('testPhone');
        expect(body.fax).to.be('testFax');

        done();
      });
    });
  });

  describe('PUT /supers/:super_id', function(){
    it('should update a super', function(done) {

      expect(id).not.to.be(null);

      request({
        url: config.node.address + "/supers/" + id,
        method: 'PUT',
        json: true,
        body: {
          name: 'updatedSuper',
          address: 'updatedAddress',
          phone: 'updatedPhone',
          fax: 'updatedFax'
        }
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.have.property('message');
        expect(body.message).to.be('Super updated!');

        done();
      });
    });

    it('shouldnt update name nor address', function(done) {

      expect(id).not.to.be(null);

      request({
        url: config.node.address + "/supers/" + id,
        method: 'GET',
        json: true
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.have.property('name');
        expect(body).to.have.property('address');
        expect(body).to.have.property('phone');
        expect(body).to.have.property('fax');
        expect(body.name).to.be('testSuper');
        expect(body.address).to.be('testAddress');
        expect(body.phone).to.be('updatedPhone');
        expect(body.fax).to.be('updatedFax');

        done();
      });
    });
  });

  describe('DELETE /supers/:super_id', function(){
    it('should delete a super', function(done) {

      expect(id).not.to.be(null);

      request({
        url: config.node.address + "/supers/" + id,
        method: 'DELETE',
        json: true
      }, function(err, res, body) {
        expect(err).to.be(null);
        expect(res.statusCode).to.be(200);
        expect(body).to.have.property('message');
        expect(body.message).to.be('Successfully deleted');

        id = null;

        done();
      });
    });
  });
});
