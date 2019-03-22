const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Complexity', () => {

  describe('post', () => {
    it('should return the lexical density of sentence in json', (done) => {
      let sentence = { sentences: "Kat likes going to the cinema" }

      chai.request(server)
        .post('/complexity')
        .send(sentence)
        .end((err, res) => {
          should.exist(res.body)
          res.should.have.status(200)
          res.body.should.have.property('data').eql({'overall_density': 0.67})
          done()
        })
    })

    it('should return the lexical density of multiple sentences in json', (done) => {
      let sentence = { sentences: "Kat likes going to the cinema. Jimmy enjoys listening to music." }

      chai.request(server)
        .post('/complexity')
        .send(sentence)
        .end((err, res) => {
          should.exist(res.body)
          res.should.have.status(200)
          res.body.should.have.property('data').eql({'overall_density': 0.73})
          done()
        })
    })

    it('should return the overall lexical density and individual sentence density in json', (done) => {
      let sentence = { sentences: "Kat likes going to the cinema. Jimmy enjoys listening to music." }

      chai.request(server)
        .post('/complexity?mode=verbose')
        .send(sentence)
        .end((err, res) => {
          should.exist(res.body)
          res.should.have.status(200)
          res.body.should.have.property('data').eql({"sentence_density": [0.67,0.8],
                                                     "overall_density": 0.73})
          done()
        })
    })

    it('should return accurate overall results when there is multiple whitespace and punctuation', (done) => {
      let sentence = { sentences: "   .... Kat likes going to the cinema....Jimmy enjoys listening to music.    " }

      chai.request(server)
        .post('/complexity')
        .send(sentence)
        .end((err, res) => {
          should.exist(res.body)
          res.should.have.status(200)
          res.body.should.have.property('data').eql({'overall_density': 0.73})
          done()
        })
    })

    it('should return accurate overall results in verbose mode, multiple whitespace and punctuation', (done) => {
      let sentence = { sentences: "   .... Kat likes going to the cinema....Jimmy enjoys listening to music.    " }

      chai.request(server)
        .post('/complexity?mode=verbose')
        .send(sentence)
        .end((err, res) => {
          should.exist(res.body)
          res.should.have.status(200)
          res.body.should.have.property('data').eql({"sentence_density": [0.67,0.8],
                                                     "overall_density": 0.73})
          done()
        })
    })
  })
})
